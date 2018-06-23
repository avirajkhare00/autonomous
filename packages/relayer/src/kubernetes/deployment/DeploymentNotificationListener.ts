import { CustomResourceClient } from '../CustomResourceService'
import { resilientFromStream } from '../../utils/rxjs/fromStream'
import { Subscription } from 'rxjs'

type Store = {
  [address: string]: {
    [deployment: string]: StreamEvent<DeploymentEvent>[]
  }
}

export class DeploymentNotificationListener {

  notifierClient: CustomResourceClient<DeploymentNotifierResource>
  deploymentListners = new Map<string, Subscription>()

  private eventStore: Store = {}

  constructor (private k8sClient: any) {
    this.notifierClient = new CustomResourceClient(k8sClient, 'deploymentnotifiers')
  }

  async initialize () {
    this.notifierClient.eventStream$().subscribe(
      event => {
        console.log('[DEPLOYMENT NOTIFIER] Notifier', event.type, event.object.colonyAddress, event.object.deploymentName)

        if (event.type === 'ADDED') {
          this.addDeploymentNotificationListener(event.object)
        }
        if (event.type === 'DELETED') {
          this.deleteDeploymentNotificationListener(event.object)
        }
      },
      e => console.log('Error in deployment notifier stream', e))
  }

  getEventsFor (colonyAddress: string) {
    return this.eventStore[colonyAddress]
  }

  private getKey (resource: DeploymentNotifierResource) {
    return `${resource.colonyAddress}-${resource.deploymentName}`
  }

  private addDeploymentNotificationListener (resource: DeploymentNotifierResource) {
    let key = this.getKey(resource)

    console.log('[DEPLOYMENT] Adding deployment notifier', key)

    if (this.deploymentListners.has(key)) {
      console.log('[DEPLOYMENT] Already listening to', key)
    } else {
      let subscription = this.getDeploymentEventStream$(resource)

      this.deploymentListners.set(key, subscription)
    }
  }

  private deleteDeploymentNotificationListener (resource: DeploymentNotifierResource) {
    let key = this.getKey(resource)

    console.log('[DEPLOYMENT] Deleting deployment notifier', key)

    if (this.deploymentListners.has(resource.colonyAddress)) {
      let subscription = this.deploymentListners.get(key)

      subscription!.unsubscribe()

      this.deploymentListners.delete(key)
    } else {
      console.log('[DEPLOYMENT] Not listening to', key)
    }
  }

  private getDeploymentEventStream$ (resource: DeploymentNotifierResource) {
    let deploymentEvent$ = resilientFromStream(
      () => this.k8sClient.apis.apps.v1
        .watch.ns(resource.colonyAddress)
        .deploy(resource.deploymentName)
        .getStream())
      .map(buffer => JSON.parse(buffer.toString()) as StreamEvent<DeploymentEvent>)

    return deploymentEvent$.subscribe(event => {
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
