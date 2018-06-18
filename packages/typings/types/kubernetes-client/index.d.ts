import { ApiGroup, ClientConfiguration } from 'kubernetes-client'

declare module 'kubernetes-client' {
  export const ApiExtensions: ApiGroupStatic
  export const Extensions: ApiGroupStatic
  export const Core: ApiGroupStatic
  export const Rbac: ApiGroupStatic
  export const Batch: ApiGroupStatic
  export const Apps: ApiGroupStatic
  export const config: Configuration

  export class Client {
    apis: any

    constructor ({ config }: { config?: ClientConfiguration })

    loadSpec(): void
    addCustomResourceDefinition(crd: any): void

  }

  export interface AuthorizationConfiguration {
    bearer?: string
    user?: {
      username: string
      password: string
    }
  }

  export interface ClientConfiguration {
    url: string
    ca?: string
    key?: string
    auth?: AuthorizationConfiguration
    namespace?: string
    insecureSkipTlsVerify: boolean
  }

  export interface ClusterConfiguration {
    url: string
    ca: string
    key?: string
    auth: AuthorizationConfiguration
    namespace?: string
    insecureSkipTlsVerify?: boolean
  }

  export interface ApiGroupOptions {
    version?: string
    promises?: boolean
    url?: string
    ca?: string
    key?: string
    auth?: AuthorizationConfiguration
    namespace?: string
    insecureSkipTlsVerify?: boolean
  }

  export interface ApiGroupStatic {
    new (config?: ApiGroupOptions): ApiGroup
  }

  export interface ApiConstructorOptions extends ApiGroupOptions {
    core?: ApiGroup
    apps?: ApiGroupOptions | ApiGroup
    batch?: ApiGroupOptions | ApiGroup
    rbac?: ApiGroupOptions | ApiGroup
    extensions?: ApiGroupOptions | ApiGroup
    apiExtensions?: ApiGroupOptions | ApiGroup
  }

  export interface Configuration {
    fromKubeconfig (kubeconfig?: any, currentContext?: string): ClientConfiguration
    loadKubeconfig (cfgPath?: string): any
    getInCluster (): ClusterConfiguration
  }

  export interface ResourceConstructor {
    name: string
    Constructor: Function
  }

  export interface ApiRequestOptions {
    [key: string]: any
    body?: any
    headers?: any
    path?: string
    qs?: any
  }

  export interface MatchExpression {
    key: string
    operator: string
    values: Array<string>
  }

  export interface Resource extends ApiGroup {
    (resourceName: string): Resource
  }

  export interface NamespacesResource extends Resource {
    kind (k: { kind: string } | string): ApiGroup
  }

  export interface ApiGroup {
    // Resources
    clusterroles?: Resource
    clusterrolebindings?: Resource
    componentstatuses?: Resource
    configmaps?: Resource
    cronjobs?: Resource
    customresourcedefinitions?: Resource
    daemonsets?: Resource
    deployments?: Resource
    events?: Resource
    endpoints?: Resource
    horizontalpodautoscalers?: Resource
    ingresses?: Resource
    jobs?: Resource
    limitranges?: Resource
    log?: Resource
    namespaces?: NamespacesResource
    nodes?: Resource
    persistentvolumes?: Resource
    persistentvolumeclaims?: Resource
    petsets?: Resource
    pods?: Resource
    replicationcontrollers?: Resource
    replicasets?: Resource
    resourcequotas?: Resource
    roles?: Resource
    rolebindings?: Resource
    scheduledjobs?: Resource
    secrets?: Resource
    serviceaccounts?: Resource
    services?: Resource
    statefulsets?: Resource
    thirdpartyresources?: Resource

    // Resource aliases
    cs?: Resource
    crd?: Resource
    cm?: Resource
    ds?: Resource
    deploy?: Resource
    ev?: Resource
    ep?: Resource
    hpa?: Resource
    ing?: Resource
    limits?: Resource
    ns?: NamespacesResource
    no?: Resource
    pv?: Resource
    pvc?: Resource
    po?: Resource
    rc?: Resource
    rs?: Resource
    quota?: Resource
    svc?: Resource

    v1beta1: ApiGroup
    v1: ApiGroup

    addResource (options: string | ResourceConstructor): any
    get (callback: (error: any, value: any) => void): void
    get (options: ApiRequestOptions, callback: (error: any, value: any) => void): void
    get (options?: ApiRequestOptions): Promise<any>
    delete (callback: (error: any, value: any) => void): void
    delete (options: ApiRequestOptions, callback: (error: any, value: any) => void): void
    delete (options?: ApiRequestOptions): Promise<any>
    patch (callback: (error: any, value: any) => void): void
    patch (options: ApiRequestOptions, callback: (error: any, value: any) => void): void
    patch (options?: ApiRequestOptions): Promise<any>
    post (callback: (error: any, value: any) => void): void
    post (options: ApiRequestOptions, callback: (error: any, value: any) => void): void
    post (options?: ApiRequestOptions): Promise<any>
    put (callback: (error: any, value: any) => void): void
    put (options: ApiRequestOptions, callback: (error: any, value: any) => void): void
    put (options?: ApiRequestOptions): Promise<any>
    match (expressions: Array<MatchExpression>): Resource
    matchLabels (labels: any): Resource
    getStream (options?: ApiRequestOptions | string): NodeJS.ReadableStream

  }
}
