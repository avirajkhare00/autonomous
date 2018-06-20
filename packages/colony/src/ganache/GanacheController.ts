import ganache, { GanacheOptions, GanacheServer } from 'ganache-core'
import * as util from 'util'

const DEFAULT_PORT = 7545
const DEFAULT_HOSTNAME = '127.0.0.1'

export interface GanacheControllerOptions extends GanacheOptions {
  hostname: string
}

export class GanacheController {
  ganache: GanacheServer
  ready: Promise<void>

  constructor (private options: Partial<GanacheControllerOptions>) {
    this.ganache = ganache.server(options)
  }

  start () {
    return util.promisify(this.ganache.listen)(
      this.options.port || DEFAULT_PORT,
      this.options.hostname || DEFAULT_HOSTNAME
    )
  }

  stop () {
    return util.promisify(this.ganache.close)()
  }
}
