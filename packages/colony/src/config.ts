import { IPFSConfig, Web3Config } from './types'

export function getTestWeb3Config (): Web3Config {
  return {
    mnemonic: process.env.TEST_MNEMONIC!,
    hostname: 'localhost',
    port: 8545
  }
}

export function getTestIPFSConfig (): IPFSConfig {
  return {
    apiPort: 43123,
    gatewayPort: 43124,
    host: '127.0.0.1'
  }
}
