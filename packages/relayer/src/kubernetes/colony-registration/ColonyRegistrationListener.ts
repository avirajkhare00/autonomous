// import { CustomResourceClient } from '../CustomResourceService'
// import { fromStream } from '../../utils/rxjs/fromStream'

// export class DeploymentNotificationListener {
//   notifierClient: CustomResourceClient<DeploymentNotifierResource>
//
//   constructor (private k8sClient: any) {
//     this.notifierClient = new CustomResourceClient(k8sClient, 'colonylisteners')
//   }
//
//   async initialize () {
//     let notifiers = await this.notifierClient.get()
//
//     notifiers.map(n => this.initializeColonyListenerStream$(n))
//   }
//
//   getEventsFor (colonyAddress: string) {
//     return this.eventStore.get(colonyAddress)
//   }
//
//   private initializeColonyListenerStream$ (resource: DeploymentNotifierResource) {
//     let deploymentEvent$ = fromStream(
//       this.k8sClient.apis.apps.v1
//         .watch.ns(resource.colonyAddress)
//         .deploy(resource.deploymentName)
//         .getStream()
//     )
//       .map(buffer => JSON.parse(buffer.toString()) as StreamEvent<DeploymentEvent>)
//
//     deploymentEvent$.subscribe(event => {
//       if (!this.eventStore.has(resource.colonyAddress)) {
//         this.eventStore.set(resource.colonyAddress, new Map())
//       }
//
//       let colony = this.eventStore.get(resource.colonyAddress)!
//
//       if (!colony.has(resource.deploymentName)) {
//         colony.set(resource.deploymentName, [])
//       }
//
//       let events = colony.get(resource.deploymentName)!
//       colony.set(resource.deploymentName, [...events, event])
//     })
//   }
// }
