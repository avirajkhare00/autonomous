import { Observable } from 'rxjs'

import { AUTONOMOUS_NAMESPACE, getAutonomousResource } from './constants'
import { fromStream } from '../utils/rxjs/fromStream'

export class CustomResourceClient<T> {
  resource: any

  constructor (private k8sClient: any, private resourceName: string) {
    this.resource = getAutonomousResource(k8sClient, resourceName)
  }

  async add (resourceObject: T) {
    await this.resource
      .post({ body: resourceObject })
  }

  async get (): Promise<T[]> {
    return this.resource.get()
      .then((c: any) => c.body.items)
  }

  async remove (name: string): Promise<void> {
    return this.resource(name).delete()
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
