import { default as ColonyNetworkClient } from '@colony/colony-js-client'
import { IPFSAPI } from 'ipfs-api'
import { Observable } from 'rxjs'

import { CustomResourceClient } from '../CustomResourceService'
import { TaskSubmission } from '../../../../dapp/src/models/Task'
import { DeploymentService } from '../deployment/DeploymentService'

export const deserializeSubmission = (data: Buffer): TaskSubmission => {
  return JSON.parse(data.toString())
}

export class ColonyRegistrationListener {
  notifierClient: CustomResourceClient<ColonyListenerResource>

  constructor (
    k8sClient: any,
    private colonyNetworkClient: ColonyNetworkClient,
    private ipfsClient: IPFSAPI,
    private deploymentService: DeploymentService
  ) {
    this.notifierClient = new CustomResourceClient(k8sClient, 'colonylisteners')
  }

  async initialize () {
    this.notifierClient.eventStream$().subscribe(async event => {
      if (event.type === 'ADDED') {
        await this.initializeColonyListenerHandler$(event.object)
      }
    })
  }

  private async initializeColonyListenerHandler$ (resource: ColonyListenerResource) {
    console.log('[COLONY] Listening to ', resource.colonyAddress)

    try {
      const colonyClient = await this.colonyNetworkClient.getColonyClientByAddress(resource.colonyAddress)

      colonyClient.events.TaskFinalized.addListener(async ({ id }) => {
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
            await this.deploymentService.deploy({
              colonyAddress: resource.colonyAddress,
              deploymentPayload: payload
            })
          },
          err => console.log('[COLONY] Error getting spec!', err)
        )
      })
    } catch (e) {
      console.log('[COLONY] Error listening to colony', e)
    }
  }
}
