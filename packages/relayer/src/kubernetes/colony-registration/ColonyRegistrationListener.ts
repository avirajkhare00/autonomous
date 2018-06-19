import { default as ColonyNetworkClient } from '@colony/colony-js-client'
import { IPFSAPI } from 'ipfs-api'
import { Observable } from 'rxjs'

import { CustomResourceClient } from '../CustomResourceService'

export class ColonyRegistrationListener {
  notifierClient: CustomResourceClient<ColonyListenerResource>

  constructor (
    k8sClient: any,
    private colonyNetworkClient: ColonyNetworkClient,
    private ipfsClient: IPFSAPI
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

      colonyClient.events.TaskAdded.addListener(async ({ id }) => {
        let client = await colonyClient.getTask.call({ taskId: id })

        console.log('Task Addded!', id, client.specificationHash)

        // TODO Switch to DAG API
        let spec$ = Observable.fromPromise(this.ipfsClient.files.get(client.specificationHash.toString()))
          .map(files => files[0])
          .map(result => ({ description: result.content!.toString() }))

        spec$.subscribe(contents => {
          console.log('Resolved spec: ', contents)
        })
      })
    } catch (e) {
      console.log('[COLONY] Error listening to colony', e)
    }
  }
}
