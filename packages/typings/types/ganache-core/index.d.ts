// tslint:disable variable-name

declare module 'ganache-core' {
  // https://github.com/trufflesuite/ganache-core/blob/develop/index.js
  import { Provider } from '@0xproject/types'

  export function server(options?: Partial<GanacheOptions>): GanacheServer
  export function provider(options?: Partial<GanacheOptions>): Provider

  // https://github.com/trufflesuite/ganache-core/blob/develop/lib/server.js
  export interface GanacheServer {
    create: (options?: GanacheOptions) => GanacheServer
    listen: (port: number, hostname: string, callback: (err: Error | null, state: any) => void) => void
    close: (callback: (err: Error | null) => void) => void
    provider: () => Provider
  }

  // https://github.com/trufflesuite/ganache-core
  export interface GanacheOptions {
    accounts: string[]
    debug: boolean
    logger: Object
    mnemonic: string
    port: number
    seed: string
    total_accounts: number
    fork: string
    network_id: number
    time: Date
    locked: boolean
    unlocked_accounts: string[]
    db_path: string
    account_keys_path: string
    vmErrorsOnRPCResponse: boolean
    gasLimit: number
  }
}
