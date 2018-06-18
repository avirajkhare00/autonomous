import { COLONY_LISTENER_CRD } from './crds/colony-listener'
import { getCustomResource } from './constants'
import { DEPLOYMENT_NOTIFIER_CRD } from './crds/deployment-notifier'

export class ResourceManager {
  resourceClient: any

  constructor (private k8sClient: any) {
    this.resourceClient = getCustomResource(k8sClient)
  }

  async initialiseResources (): Promise<void> {
    console.log('Initialising resources...')

    try {
      await this.resourceClient.post({ body: COLONY_LISTENER_CRD })
      await this.resourceClient.post({ body: DEPLOYMENT_NOTIFIER_CRD })
    } catch (err) {
      // API returns a 409 Conflict if CRD already exists.
      if (err.statusCode !== 409) throw err
    }

    // Mutate the client with additional resource definitions
    this.k8sClient.addCustomResourceDefinition(COLONY_LISTENER_CRD)
    this.k8sClient.addCustomResourceDefinition(DEPLOYMENT_NOTIFIER_CRD)

    return this.k8sClient
  }

  async deleteResources () {
    await this.resourceClient(COLONY_LISTENER_CRD.metadata.name).delete()
    await this.resourceClient(DEPLOYMENT_NOTIFIER_CRD.metadata.name).delete()
  }
}
