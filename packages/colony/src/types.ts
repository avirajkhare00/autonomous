export interface Web3Config {
  hostname: string,
  port: number
  mnemonic: string
}

export interface ContractServerConfig {
  hostname: string,
  port: number
}

export interface IPFSConfig {
  host: string
  apiPort: number
  gatewayPort: number
}
