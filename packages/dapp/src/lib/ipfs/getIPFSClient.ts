import { default as ipfs, IPFSAPI } from 'ipfs-api'

export const getIPFSClient = (hostname: string, apiPort: number): IPFSAPI => {
  return ipfs(hostname, apiPort, { protocol: 'http' })
}
