import { default as ipfs, IPFSAPI } from 'ipfs-api'

import { IPFS_API_PORT, IPFS_HOST } from './constants'

export const getIPFSClient = (): IPFSAPI => {
  return ipfs(IPFS_HOST, IPFS_API_PORT, { protocol: 'http' })
}
