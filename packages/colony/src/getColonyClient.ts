import { providers, Wallet } from 'ethers'
import EthersAdapter from '@colony/colony-js-adapter-ethers'
import ColonyNetworkClient from '@colony/colony-js-client'
import dotenv from 'dotenv-safe'

import { ContractServerLoader } from './contract-server/ContractServerLoader'

export async function getColonyClient () {
  dotenv.config()

  const loader = new ContractServerLoader()
  let provider = new providers.JsonRpcProvider('http://localhost:8545/')

  let testMnemonic = process.env.TEST_MNEMONIC!

  const wallet = Wallet.fromMnemonic(testMnemonic)
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
