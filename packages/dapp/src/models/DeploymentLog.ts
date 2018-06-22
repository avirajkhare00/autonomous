export interface K8sBaseObject {
  apiVersion: string,
  kind: string,
  metadata: {
    name: string
  }
}

export interface K8sEventObject extends K8sBaseObject {
  metadata: {
    creationTimestamp: string,
    generation: number,
    name: string,
    namespace: string,
    resourceVersion: string,
    selfLink: string,
    uid: string
    [prop: string]: any
  }
}

export interface DeploymentEvent extends K8sEventObject {
  spec: any
  status: any
}

export type StreamEventType = 'ADDED' | 'MODIFIED' | 'DELETED'

export interface StreamEvent<T> {
  type: StreamEventType,
  object: T
}

export type DeploymentLog = {
  [deployment: string]: StreamEvent<DeploymentEvent>[]
}
