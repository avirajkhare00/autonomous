declare module 'ethers' {
  import { default as Web3 } from 'web3'
  import { Provider } from 'ethers'

  export type Provider = any
  export type Networks = 'homestead' | 'ropsten' | 'rinkeby' | 'kovan'

  export class Wallet {
    provider: Provider

    constructor (privateKey: string, provider?: Provider)

    static fromMnemonic (mnemonic: string, path?: string): Wallet
  }

  export namespace providers {
    class InfuraProvider implements Provider {
      constructor (network?: Networks, apiToken?: string)
    }

    class Web3Provider implements Provider {
      constructor (web3Provider: Web3, network?: Networks)

      listAccounts (): Promise<string[]>

      getSigner (address?: string): any
    }

    class JsonRpcProvider implements Provider {
      constructor (url: string, network?: Networks)
    }
  }
}
