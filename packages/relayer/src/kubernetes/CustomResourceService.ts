import { Observable } from 'rxjs'

import { AUTONOMOUS_NAMESPACE, getAutonomousResource } from './constants'
import { fromStream } from '../utils/rxjs/fromStream'

export class CustomResourceClient<T> {
  client: any

  constructor (private k8sClient: any, resourceName: string) {
    this.client = getAutonomousResource(k8sClient, resourceName)
  }

  async add (resourceObject: T) {
    await this.client
      .post({ body: resourceObject })
  }

  async get (): Promise<T[]> {
    return this.client.get()
      .then((c: any) => c.body.items)
  }

  eventStream$ (): Observable<StreamEvent<DeploymentNotifierEvent>> {
    return fromStream(this.k8sClient.apis[AUTONOMOUS_NAMESPACE].v1.watch.deploymentnotifiers.getStream())
      .map(buffer => JSON.parse(buffer.toString()))
  }
}
