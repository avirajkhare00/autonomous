import { Observable } from 'rxjs'

import { AUTONOMOUS_NAMESPACE, getAutonomousResource } from './constants'
import { fromStream } from '../utils/rxjs/fromStream'

export class CustomResourceClient<T> {
  client: any

  constructor (private k8sClient: any, private resourceName: string) {
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

  eventStream$ (): Observable<StreamEvent<T & K8sEventObject>> {
    return fromStream(this.k8sClient.apis[AUTONOMOUS_NAMESPACE].v1.watch[this.resourceName].getStream())
      .flatMap(buffer => buffer.toString().split('\n'))
      .filter(event => event.length > 0)
      .map(event => {
        try {
          return JSON.parse(event)
        } catch (e) {
          console.log('Error parsing event', event, e)
        }
      })
  }
}
