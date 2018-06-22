import { Deployment } from './Deployment'
import { buildDeploymentNotifier } from '../crds/deployment-notifier'
import { CustomResourceClient } from '../CustomResourceService'

export interface DeploymentService {
  deploy (deployment: Deployment): Promise<void>
}

export class KubernetesDeploymentService implements DeploymentService {
  notifierClient: CustomResourceClient<DeploymentNotifierResource>

  constructor (private k8sClient: any) {
    this.notifierClient = new CustomResourceClient(k8sClient, 'deploymentnotifiers')
  }

  async deploy (deploymentDefinition: Deployment): Promise<void> {
    this.validatePayload(deploymentDefinition.deploymentPayload)

    await this.getDeployments(deploymentDefinition.deploymentPayload)
      .map(async deployment => {

        let deploymentName = this.getNameFromPayload(deployment)

        let notifierResource = buildDeploymentNotifier(deploymentDefinition.colonyAddress, deploymentName)

        try {
          await this.notifierClient.add(notifierResource)
          console.log('[DEPLOY] Registered listener for', deploymentName)
        } catch (err) {
          if (err.statusCode !== 409) throw err
        }

        await this.deployDeployment(deploymentDefinition.colonyAddress, deployment)
        console.log('[DEPLOY] Deployed deployment', deploymentName)
      })

    await this.getServices(deploymentDefinition.deploymentPayload)
      .map(async service => {

        let serviceName = this.getNameFromPayload(service)

        await this.deployService(deploymentDefinition.colonyAddress, service)

        console.log('[DEPLOY] Deployed service', serviceName)
      })

    console.log('[DEPLOY] Complete', deploymentDefinition.colonyAddress)
  }

  private async deployDeployment (namespace: string, deployment: any) {
    await this.k8sClient.apis.apps.v1
      .namespaces(namespace)
      .deployments
      .post({ body: deployment })
      .catch((err: any) => {
        if (err.statusCode !== 409) {
          throw err
        } else {
          console.log('[DEPLOY] Deployment', deployment.metadata.name, 'already exists, REPLACING')
          return this.k8sClient.apis.apps.v1
            .namespaces(namespace)
            .deployments(deployment.metadata.name)
            .patch({ body: deployment })
        }
      })
  }

  private async deployService (namespace: string, service: any) {
    await this.k8sClient.apis.v1
      .namespaces(namespace)
      .services
      .post({ body: service })
      .catch((err: any) => {
        if (err.statusCode !== 409) {
          throw err
        } else {
          console.log('[DEPLOY] Service', service.metadata.name, 'already exists, REPLACING')
          return this.k8sClient.apis.v1
            .namespaces(namespace)
            .services(service.metadata.name)
            .patch({ body: service })
        }
      })
  }

  private getDeployments (payload: any): any[] {
    if (payload.kind === 'Deployment') {
      return [payload]
    } else if (payload.kind === 'List') {
      return payload.items.filter((i: any) => i.kind === 'Deployment')
    } else {
      return []
    }
  }

  private getServices (payload: any): any[] {
    if (payload.kind === 'Service') {
      return [payload]
    } else if (payload.kind === 'List') {
      return payload.items.filter((i: any) => i.kind === 'Service')
    } else {
      return []
    }
  }

  private validatePayload (payload: any) {
    if (payload === null && typeof payload === 'object') throw new Error('Deployment is null')

    if (payload.kind === 'Deployment') {
      if (!payload.metadata || !payload.metadata.name) throw new Error('Deployment has no name')
    } else if (payload.kind === 'List') {
      this.getDeployments(payload)
        .map(deployment => {
          if (!deployment.metadata || !deployment.metadata.name) throw new Error('Deployment has no name')
        })
    } else {
      throw new Error('Not a valid deployment, must be List or Deployment')
    }
  }

  private getNameFromPayload (name: any) {
    return name.metadata.name
  }
}
