import { providers, Wallet } from 'ethers'
import EthersAdapter from '@colony/colony-js-adapter-ethers'
import ColonyNetworkClient from '@colony/colony-js-client'

import { ContractServerLoader } from '../contract-server/ContractServerLoader'
import { Web3Config } from '../types'

export async function getColonyClient (config: Web3Config) {

  const loader = new ContractServerLoader()
  let provider = new providers.JsonRpcProvider(`${config.hostname}:${config.port}`)

  const wallet = Wallet.fromMnemonic(config.mnemonic)
  wallet.provider = provider

  const adapter = new EthersAdapter({
    loader,
    provider,
    wallet
  })

  const networkClient = new ColonyNetworkClient({ adapter })
  await networkClient.init()

  return networkClient
}
