import { AUTONOMOUS_NAMESPACE } from '../constants'

export const COLONY_LISTENER_CRD = {
  kind: 'CustomResourceDefinition',
  spec: {
    scope: 'Namespaced',
    version: 'v1',
    group: AUTONOMOUS_NAMESPACE,
    names: {
      shortNames: [
        'cl'
      ],
      kind: 'ColonyRegistration',
      plural: 'colonylisteners',
      singular: 'colonylistener'
    }
  },
  apiVersion: 'apiextensions.k8s.io/v1beta1',
  metadata: {
    name: `colonylisteners.${AUTONOMOUS_NAMESPACE}`
  }
}

export const buildColonyListener = (colonyAddress: string, namespace: string): ColonyListenerResource => ({
  kind: 'ColonyRegistration',
  apiVersion: `${AUTONOMOUS_NAMESPACE}/v1`,
  colonyAddress: colonyAddress,
  metadata: {
    name: colonyAddress
  },
  namespace: namespace
})
