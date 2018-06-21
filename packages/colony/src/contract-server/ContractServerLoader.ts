import 'isomorphic-fetch'
import { truffleTransform } from '@colony/colony-js-contract-loader'
import { HttpLoader } from '@colony/colony-js-contract-loader-http'
import { ContractServerConfig } from '../types'

const buildDefaultEndpoint = (hostname: string, port: number) =>
  `http://${hostname}:${port}/contracts?name=%%NAME%%&address=%%ADDRESS%%&version=%%VERSION%%`

export class ContractServerLoader extends HttpLoader {
  _host: string

  constructor (config: ContractServerConfig) {
    let endpoint = buildDefaultEndpoint(config.hostname, config.port)

    super({ transform: truffleTransform, endpoint })
    const [host] = this._endpoint.split('/contracts')
    this._host = host
  }
}
