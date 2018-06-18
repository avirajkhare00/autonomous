import Koa from 'koa'
import cors from '@koa/cors'
import Router from 'koa-router'
import { promisify } from 'util'
import fs from 'fs'
import path from 'path'

const CONTRACTS_ENDPOINT = '/contracts'
const DEFAULT_PORT = 3030

// TrufflePig uses pty.js which has bad windows support
// For such a simple tool, we make our own contract server
export class ContractServer {
  app: Koa
  server: any

  constructor (
    private contractDir: string,
    private port: number = DEFAULT_PORT
  ) {}

  async findContract (name: string): Promise<Object> {
    let contractFilePath = path.resolve(this.contractDir, `${name}.json`)

    let result = await promisify(fs.readFile)(contractFilePath)

    return JSON.parse(result.toString())
  }

  async getContractNames (): Promise<string[]> {
    return promisify(fs.readdir)(this.contractDir)
  }

  createServer () {
    this.app = new Koa()
    let router = new Router()

    router.get(CONTRACTS_ENDPOINT, async (ctx) => {
      if (Object.keys(ctx.query).length > 0) {
        const contract = await this.findContract(ctx.query.name)

        if (!contract) {
          console.log(new Error(`Unable to find contract matching query ${JSON.stringify(ctx.query)}`))
        }

        ctx.body = contract || {}
        ctx.status = 200
      } else {
        ctx.body = await this.getContractNames()
        ctx.status = 200
      }
    })

    this.app
      .use(cors())
      .use(router.routes())
      .use(router.allowedMethods())
  }

  async start (): Promise<void> {
    console.log(`Starting contract server listening on port ${this.port}`)
    console.log(`Serving directory ${this.contractDir}`)
    console.log('-----------------------')
    console.log('Files served:')
    console.log((await this.getContractNames()).map(f => `- ${f}`).join('\r\n'))
    console.log('-----------------------')

    await this.createServer()

    this.server = this.app.listen(this.port)
  }

  close () {
    if (this.server) {
      this.server.close()
    }
  }
}
