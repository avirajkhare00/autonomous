import { ColonyClient, default as ColonyNetworkClient } from '@colony/colony-js-client'
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

  colonyListeners = new Map<string, {
    client: ColonyClient
    handler: any
  }>()

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
          await this.addColonyListener(event.object)
        }
        if (event.type === 'DELETED') {
          await this.deleteColonyLister(event.object)
        }
      },
      e => console.log('Error in colony listener stream', e))
  }

  private async addColonyListener (resource: ColonyListenerResource) {
    console.log('[COLONY] Adding listener', resource.colonyAddress)

    if (this.colonyListeners.has(resource.colonyAddress)) {
      console.log('[COLONY] Already listening to', resource.colonyAddress)
    } else {
      const client = await this.colonyNetworkClient.getColonyClientByAddress(resource.colonyAddress)
      console.log('[COLONY] Got client for', resource.colonyAddress)

      let handler = ({ id }: { id: number }) => this.processTask(client, id, resource.colonyAddress)

      client.events.TaskFinalized.addListener(handler)
      this.colonyListeners.set(resource.colonyAddress, {
        client: client,
        handler: handler
      })
    }
  }

  private deleteColonyLister (resource: ColonyListenerResource) {
    console.log('[COLONY] Deleting listener', resource.colonyAddress)

    if (this.colonyListeners.has(resource.colonyAddress)) {
      let handler = this.colonyListeners.get(resource.colonyAddress)

      handler!.client.events.TaskFinalized.removeListener(handler!.handler)

      this.colonyListeners.delete(resource.colonyAddress)
    } else {
      console.log('[COLONY] Not listening to', resource.colonyAddress)
    }
  }

  private async processTask (colonyClient: ColonyClient, taskId: number, colonyAddress: string) {
    let task = await colonyClient.getTask.call({ taskId: taskId })

    console.log('[COLONY] Task Finalized', taskId, task.deliverableHash)

    // TODO Switch to DAG API
    let spec$ = Observable.fromPromise(this.ipfsClient.files.get(task.deliverableHash!.toString()))
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
          colonyAddress: colonyAddress,
          deploymentPayload: payload
        })
      },
      err => console.log('[COLONY] Error getting spec', err)
    )
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
