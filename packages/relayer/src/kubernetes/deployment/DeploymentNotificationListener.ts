import { CustomResourceClient } from '../CustomResourceService'
import { fromStream } from '../../utils/rxjs/fromStream'

type Store = {
  [address: string]: {
    [deployment: string]: StreamEvent<DeploymentEvent>[]
  }
}

export class DeploymentNotificationListener {

  notifierClient: CustomResourceClient<DeploymentNotifierResource>

  private eventStore: Store = {}

  constructor (private k8sClient: any) {
    this.notifierClient = new CustomResourceClient(k8sClient, 'deploymentnotifiers')
  }

  async initialize () {
    this.notifierClient.eventStream$().subscribe(event => {
      console.log('[DEPLOYMENT NOTIFIER] Notifier added!', event.object.colonyAddress, event.object.deploymentName)

      if (event.type === 'ADDED') {
        this.initializeDeploymentEventStream$(event.object)
      }
    })
  }

  getEventsFor (colonyAddress: string) {
    return this.eventStore[colonyAddress]
  }

  private initializeDeploymentEventStream$ (resource: DeploymentNotifierResource) {
    let deploymentEvent$ = fromStream(
      this.k8sClient.apis.apps.v1
        .watch.ns(resource.colonyAddress)
        .deploy(resource.deploymentName)
        .getStream()
    )
      .map(buffer => JSON.parse(buffer.toString()) as StreamEvent<DeploymentEvent>)

    deploymentEvent$.subscribe(event => {
      console.log('[DEPLOYMENT] Event received', resource.colonyAddress, resource.deploymentName)

      if (!this.eventStore[resource.colonyAddress]) {
        this.eventStore[resource.colonyAddress] = {}
      }

      let colony = this.eventStore[resource.colonyAddress]

      if (!colony[resource.deploymentName]) {
        colony[resource.deploymentName] = []
      }

      let events = colony[resource.deploymentName]
      colony[resource.deploymentName] = [...events, event]
    })
  }
}
