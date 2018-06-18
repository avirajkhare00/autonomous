import Koa from 'koa'
import cors from '@koa/cors'
import Router from 'koa-router'
import { Server } from 'http'
import {
  ColonyRegistrationService,
  KubernetesColonyRegistrationService
} from './kubernetes/colony-registration/ColonyRegistrationService'
import { DeploymentService, KubernetesDeploymentService } from './kubernetes/deployment/DeploymentService'
import { DeploymentNotificationListener } from './kubernetes/deployment/DeploymentNotificationListener'
import { ResourceManager } from './kubernetes/ResourceManager'

const DEFAULT_PORT = 4030

export class RelayerServer {
  server: Server
  deploymentListener: DeploymentNotificationListener
  colonyRegistrationService: ColonyRegistrationService
  deploymentRegistrationService: DeploymentService
  resourceManager: ResourceManager

  constructor (
    k8sClient: any,
    private port: number = DEFAULT_PORT
  ) {
    this.resourceManager = new ResourceManager(k8sClient)
  }

  async start (): Promise<void> {
    console.log('Starting...')

    let resourceClient = await this.resourceManager.initialiseResources()

    this.colonyRegistrationService = new KubernetesColonyRegistrationService(resourceClient)
    this.deploymentRegistrationService = new KubernetesDeploymentService(resourceClient)
    this.deploymentListener = new DeploymentNotificationListener(resourceClient)

    await this.deploymentListener.initialize()

    let app = this.createApp()

    this.server = app.listen(this.port)

    console.log(`Relayer listening on port ${this.port}`)
  }

  close () {
    if (this.server) {
      this.server.close()
    }
  }

  private configureRoutes (router: Router) {
    router.post('/test-deploy/:colonyAddress', async ctx => {
      let colony = ctx.params.colonyAddress

      if (this.colonyRegistrationService.hasColony(colony)) {

        await this.deploymentRegistrationService.deploy({
          colonyAddress: colony,
          deploymentPayload: require('./nginx-ref/deployment.json')
        })

        ctx.status = 201
        ctx.body = { message: 'Deployed.' }
      } else {
        ctx.status = 400
        ctx.body = { error: 'Colony not registered' }
      }
    })

    router.post('/register/:colonyAddress', async ctx => {
      let colony = ctx.params.colonyAddress

      let hasColony = await this.colonyRegistrationService.hasColony(colony)

      if (!hasColony) {
        await this.colonyRegistrationService.register({
          colonyAddress: colony,
          namespace: colony
        })

        ctx.status = 201
        ctx.body = { message: 'Registered.' }
      } else {
        ctx.status = 400
        ctx.body = { error: 'Colony already registered' }
      }
    })

    router.get('/logs/:colonyAddress', ctx => {

      let colony = ctx.params.colonyAddress

      if (this.colonyRegistrationService.hasColony(colony)) {
        let result = this.deploymentListener.getEventsFor(colony)

        ctx.status = 200
        ctx.body = result
      } else {
        ctx.status = 400
        ctx.body = { error: 'Colony already registered' }
      }
    })
  }

  private createApp () {
    let router = new Router()
    let app = new Koa()

    this.configureRoutes(router)


    app
      .use(cors())
      .use(router.routes())
      .use(router.allowedMethods())

    return app
  }
}
