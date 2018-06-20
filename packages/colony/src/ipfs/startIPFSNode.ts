import { IPFSController } from './IPFSController'
import { IPFS_API_PORT, IPFS_GATEWAY_PORT, IPFS_HOST } from './constants'

(async () => {
  let ipfsConfig = {
    config: {
      Addresses: {
        API: `/ip4/${IPFS_HOST}/tcp/${IPFS_API_PORT}`,
        Gateway: `/ip4/${IPFS_HOST}/tcp/${IPFS_GATEWAY_PORT}`,
        Swarm: [
          '/ip4/0.0.0.0/tcp/4002',
          '/ip4/127.0.0.1/tcp/4003/ws'
        ]
      }
    }
  }

  let controller = new IPFSController(ipfsConfig)

  let daemon = await controller.start()

  console.log('=================================')
  console.log('Repo path: ', daemon.repoPath)
  console.log('API Address: ', daemon.apiAddr)
  console.log('Gateway Address: ', daemon.gatewayAddr)
  console.log('Started: ', daemon.started)
  console.log('=================================')
  let nodeInfo = await daemon.api.id()
  console.log('Node ID: ', JSON.stringify(nodeInfo, null, 2))
  console.log('=================================')
  console.log('IPFS node started.')
  console.log('=================================')
})()
