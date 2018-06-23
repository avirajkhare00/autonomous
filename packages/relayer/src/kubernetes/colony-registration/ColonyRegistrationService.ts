import { ColonyRegistration } from './ColonyRegistration'
import { buildColonyListener } from '../crds/colony-listener'
import { CustomResourceClient } from '../CustomResourceService'

export interface ColonyRegistrationService {
  hasColony (colonyAddress: string): Promise<boolean>
  register (listener: ColonyRegistration): Promise<void>
  deleteFor (colonyAddress: string): Promise<void>
}

export class KubernetesColonyRegistrationService implements ColonyRegistrationService {
  colonyListenerClient: CustomResourceClient<ColonyListenerResource>

  constructor (private k8sClient: any) {
    this.colonyListenerClient = new CustomResourceClient(k8sClient, 'colonylisteners')
  }

  async hasColony (colonyAddress: string): Promise<boolean> {
    let colonies = await this.colonyListenerClient.get()

    return colonies
      .filter(c => c.colonyAddress === colonyAddress)
      .length > 0
  }

  async register (registration: ColonyRegistration): Promise<void> {
    let namespaceResource = {
      apiVersion: 'v1',
      kind: 'Namespace',
      metadata: {
        name: registration.namespace
      }
    }
    try {
      await await this.k8sClient.api.v1.namespaces.post({ body: namespaceResource })
      console.log('[NAMESPACE] Created', registration.namespace)
    } catch (err) {
      if (err.statusCode !== 409) throw err
    }

    let listenerResource = buildColonyListener(
      registration.colonyAddress,
      registration.namespace
    )

    await this.colonyListenerClient.add(listenerResource)
  }

  async deleteFor (colonyAddress: string): Promise<void> {
    let colonies = await this.colonyListenerClient.get()

    await Promise.all(
      colonies
        .filter(c => c.colonyAddress === colonyAddress)
        .map(c => this.colonyListenerClient.remove(c.metadata.name)
          .then(_ => console.log('[COLONY LISTENER] Deleted', c.metadata.name))
        )
    )
  }
}
