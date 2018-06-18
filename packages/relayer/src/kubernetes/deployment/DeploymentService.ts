import { Deployment } from './Deployment'
import { parseDeploymentOrThrow } from './parseDeployment'
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
    let deployConfig = parseDeploymentOrThrow(deploymentDefinition.deploymentPayload)

    let deploymentName = deployConfig.metadata.name
    let notifierResource = buildDeploymentNotifier(deploymentDefinition.colonyAddress, deploymentName)

    try {
      await this.notifierClient.add(notifierResource)
    } catch (err) {
      if (err.statusCode !== 409) throw err
    }

    await this.k8sClient.apis.apps.v1
      .namespaces(deploymentDefinition.colonyAddress)
      .deployments
      .post({ body: deployConfig })
      .catch((err: any) => {
        if (err.statusCode !== 409) {
          throw err
        } else {
          return this.k8sClient.apis.apps.v1
            .namespaces(deploymentDefinition.colonyAddress)
            .deployments(deploymentName)
            .put({ body: deployConfig })
        }
      })

    console.log('Deployment complete', deploymentDefinition.colonyAddress, deploymentName)
  }
}
