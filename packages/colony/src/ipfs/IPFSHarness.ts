import { IPFSController } from './IPFSController'
import { IPFSConfig } from '../types'
import { IPFSAPI } from 'ipfs-api'
import { ServiceHarness } from '../serviceHarness'

export class IPFSHarness implements ServiceHarness<IPFSAPI> {
  ipfsController: IPFSController

  constructor (config: IPFSConfig) {
    let ipfsConfig = {
      config: {
        Addresses: {
          API: `/ip4/${config.host}/tcp/${config.apiPort}`,
          Gateway: `/ip4/${config.host}/tcp/${config.gatewayPort}`,
          Swarm: [
            '/ip4/0.0.0.0/tcp/4002',
            '/ip4/127.0.0.1/tcp/4003/ws'
          ]
        }
      }
    }

    this.ipfsController = new IPFSController(ipfsConfig)
  }

  async setup (): Promise<IPFSAPI> {
    let daemon = await this.ipfsController.start()

    console.log('=================================')
    console.log('Repo path: ', daemon.repoPath)
    console.log('API Address: ', daemon.apiAddr)
    console.log('Gateway Address: ', daemon.gatewayAddr)
    console.log('=================================')
    let nodeInfo = await daemon.api.id()
    console.log('Node ID: ', JSON.stringify(nodeInfo, null, 2))
    console.log('=================================')
    console.log('IPFS node started.')
    console.log('=================================')

    return daemon.api
  }

  destroy (): Promise<void> {
    return this.ipfsController.stop()
  }
}
