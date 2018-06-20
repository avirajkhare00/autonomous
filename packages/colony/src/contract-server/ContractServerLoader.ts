import 'isomorphic-fetch'
import { truffleTransform } from '@colony/colony-js-contract-loader'
import { HttpLoader } from '@colony/colony-js-contract-loader-http'

const DEFAULT_HOST = 'http://127.0.0.1:3030'
const DEFAULT_ENDPOINT = `${DEFAULT_HOST}/contracts?name=%%NAME%%&address=%%ADDRESS%%&version=%%VERSION%%` // eslint-disable-line max-len

export class ContractServerLoader extends HttpLoader {
  _host: string

  constructor ({ endpoint }: { endpoint: string } = { endpoint: DEFAULT_ENDPOINT }) {
    super({ transform: truffleTransform, endpoint })
    const [host] = this._endpoint.split('/contracts')
    this._host = host
  }
}
