import { default as ColonyNetworkClient } from '@colony/colony-js-client'
import { IPFSAPI } from 'ipfs-api'
import { Observable } from 'rxjs'
import Web3 from 'web3'

import { CustomResourceClient } from '../CustomResourceService'
import { DeploymentService } from '../deployment/DeploymentService'

export interface TaskSubmission {
  deploymentString: string
}

export const deserializeSubmission = (data: Buffer): TaskSubmission => {
  return JSON.parse(data.toString())
}

export class ColonyRegistrationListener {
  notifierClient: CustomResourceClient<ColonyListenerResource>

  constructor (
    k8sClient: any,
    private web3: Web3,
    private colonyNetworkClient: ColonyNetworkClient,
    private ipfsClient: IPFSAPI,
    private deploymentService: DeploymentService
  ) {
    this.notifierClient = new CustomResourceClient(k8sClient, 'colonylisteners')
  }

  async initialize () {
    this.notifierClient.eventStream$().subscribe(
      async event => {
        console.log('[COLONY LISTENER] Listener', event.type, event.object.colonyAddress)

        if (event.type === 'ADDED') {
          await this.initializeColonyListenerHandler$(event.object)
        }
      },
      e => console.log('Error in colony listener stream', e))
  }

  private async initializeColonyListenerHandler$ (resource: ColonyListenerResource) {
    console.log('[COLONY] Listening to', resource.colonyAddress)

    try {
      const colonyClient = await this.colonyNetworkClient.getColonyClientByAddress(resource.colonyAddress)
      console.log('[COLONY] Got client for', resource.colonyAddress)

      colonyClient.events.TaskFinalized.addListener(async ({ id }) => {
        console.log('[COLONY] [EVENT] TaskFinalized', id)

        let client = await colonyClient.getTask.call({ taskId: id })

        console.log('[COLONY] Task Finalized', id, client.deliverableHash)

        // TODO Switch to DAG API
        let spec$ = Observable.fromPromise(this.ipfsClient.files.get(client.deliverableHash!.toString()))
          .timeout(5000)
          .map(files => files[0])
          .map(result => deserializeSubmission(result.content! as Buffer))
          .map(submission => JSON.parse(submission.deploymentString))

        spec$.subscribe(
          async payload => {
            console.log('[COLONY] Received spec', JSON.stringify(payload))

            // Advance the ganache block by one, otherwise resubscribing to the event log
            // will replay the previous event (i.e. a boot loop in bootstrapping)
            await this.mineBlock()
            console.log('[COLONY] Mined block to avoid re-deployment')

            await this.deploymentService.deploy({
              colonyAddress: resource.colonyAddress,
              deploymentPayload: payload
            })
          },
          err => console.log('[COLONY] Error getting spec', err)
        )
      })
    } catch (e) {
      console.log('[COLONY] Error listening to colony', e)
    }
  }

  private mineBlock (): Promise<void> {
    return new Promise((res, rej) =>
      this.web3.currentProvider.sendAsync(
        {
          method: 'evm_mine',
          jsonrpc: '2.0',
          id: new Date().getTime(),
          params: []
        },
        (e) => (e ? rej(e) : res())
      )
    )
  }
}
