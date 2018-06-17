import 'isomorphic-fetch'
import { truffleTransform } from '@colony/colony-js-contract-loader'
import { HttpLoader } from '@colony/colony-js-contract-loader-http'

const DEFAULT_HOST = 'http://127.0.0.1:3030'

const DEFAULT_ENDPOINT = `${DEFAULT_HOST}/contracts?name=%%NAME%%&address=%%ADDRESS%%&version=%%VERSION%%` // eslint-disable-line max-len

// Create-React-TypeScript-App doesn't support monorepos
// Because of silly webpack configurations or something...
// I hackily copy and paste the loader in here
export class ContractServerLoader extends HttpLoader {
  _host: string

  constructor ({ endpoint }: { endpoint: string } = { endpoint: DEFAULT_ENDPOINT }) {
    super({ transform: truffleTransform, endpoint })
    const [host] = this._endpoint.split('/contracts')
    this._host = host
  }
}
