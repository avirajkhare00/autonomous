import Koa from 'koa'
import cors from '@koa/cors'
import Router from 'koa-router'
import { Server } from 'http'
import { IPFSAPI } from 'ipfs-api'
import bodyParser from 'koa-bodyparser'

import { default as ColonyNetworkClient } from '@colony/colony-js-client'

import {
  ColonyRegistrationService,
  KubernetesColonyRegistrationService
} from './kubernetes/colony-registration/ColonyRegistrationService'
import { DeploymentService, KubernetesDeploymentService } from './kubernetes/deployment/DeploymentService'
import { DeploymentNotificationListener } from './kubernetes/deployment/DeploymentNotificationListener'
import { ResourceManager } from './kubernetes/ResourceManager'
import { ColonyRegistrationListener } from './kubernetes/colony-registration/ColonyRegistrationListener'

const DEFAULT_PORT = 4030

export class RelayerServer {
  server: Server
  resourceManager: ResourceManager

  deploymentListener: DeploymentNotificationListener
  colonyListener: ColonyRegistrationListener

  colonyRegistrationService: ColonyRegistrationService
  deploymentRegistrationService: DeploymentService

  constructor (
    k8sClient: any,
    private colonyNetworkClient: ColonyNetworkClient,
    private ipfsClient: IPFSAPI,
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
    this.colonyListener = new ColonyRegistrationListener(resourceClient, this.colonyNetworkClient, this.ipfsClient)

    await this.deploymentListener.initialize()
    await this.colonyListener.initialize()

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
    router.post('/deploy/:colonyAddress', async ctx => {
      let colony = ctx.params.colonyAddress.toLowerCase()

      let deployment = ctx.request.body

      if (!deployment) {
        ctx.status = 400
        ctx.body = { error: 'No deployment supplied' }
        return
      }

      if (this.colonyRegistrationService.hasColony(colony)) {

        await this.deploymentRegistrationService.deploy({
          colonyAddress: colony,
          deploymentPayload: deployment
        })

        ctx.status = 201
        ctx.body = { message: 'Deployed.' }
      } else {
        ctx.status = 400
        ctx.body = { error: 'Colony not registered' }
      }
    })

    router.post('/register/:colonyAddress', async ctx => {
      let colony = ctx.params.colonyAddress.toLowerCase()

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

      let colony = ctx.params.colonyAddress.toLowerCase()

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
      .use(bodyParser())
      .use(router.routes())
      .use(router.allowedMethods())

    return app
  }
}
