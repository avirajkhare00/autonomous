export const AUTONOMOUS_NAMESPACE = 'autonomous-labs.io'

export const getCustomResource = (client: any) =>
  client.apis['apiextensions.k8s.io'].v1beta1.customresourcedefinitions

export const getAutonomousResource = (client: any, selector: string) =>
  client.apis[AUTONOMOUS_NAMESPACE].v1.namespaces('default')[selector]
