interface K8sBaseObject {
  apiVersion: string,
  kind: string,
  metadata: {
    name: string
  }
}

interface K8sEventObject extends K8sBaseObject {
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

type StreamEventType = 'ADDED' | 'MODIFIED' | 'DELETED'

interface StreamEvent<T> {
  type: StreamEventType,
  object: T
}

interface DeploymentNotifierResource extends K8sBaseObject {
  colonyAddress: string,
  deploymentName: string,
}

interface ColonyListenerResource extends K8sBaseObject {
  colonyAddress: string
  namespace: string
}

interface DeploymentEvent extends K8sEventObject {
  spec: any
  status: any
}

type DeploymentNotifierEvent = DeploymentNotifierResource & K8sEventObject
