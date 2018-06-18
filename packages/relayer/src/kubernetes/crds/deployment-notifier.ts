import { AUTONOMOUS_NAMESPACE } from '../constants'

export const DEPLOYMENT_NOTIFIER_CRD = {
  kind: 'CustomResourceDefinition',
  spec: {
    scope: 'Namespaced',
    version: 'v1',
    group: AUTONOMOUS_NAMESPACE,
    names: {
      shortNames: [
        'dn'
      ],
      kind: 'DeploymentNotifier',
      plural: 'deploymentnotifiers',
      singular: 'deploymentnotifier'
    }
  },
  apiVersion: 'apiextensions.k8s.io/v1beta1',
  metadata: {
    name: `deploymentnotifiers.${AUTONOMOUS_NAMESPACE}`
  }
}

export const buildDeploymentNotifierName = (colonyAddress: string, name: string) => `${colonyAddress}-${name}`

export const buildDeploymentNotifier = (colonyAddress: string, name: string): DeploymentNotifierResource => ({
  kind: 'DeploymentNotifier',
  apiVersion: `${AUTONOMOUS_NAMESPACE}/v1`,
  metadata: {
    name: buildDeploymentNotifierName(colonyAddress, name)
  },
  colonyAddress: colonyAddress,
  deploymentName: name
})
