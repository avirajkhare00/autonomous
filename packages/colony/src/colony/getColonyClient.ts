import { providers, Wallet } from 'ethers'
import Web3 from 'web3'
import EthersAdapter from '@colony/colony-js-adapter-ethers'
import ColonyNetworkClient from '@colony/colony-js-client'

import { ContractServerLoader } from '../contract-server/ContractServerLoader'
import { ContractServerConfig, Web3Config } from '../types'

export async function getColonyClient (web3Config: Web3Config, contractServerConfig: ContractServerConfig) {

  const loader = new ContractServerLoader(contractServerConfig)

  let provider = new providers.JsonRpcProvider(`http://${web3Config.hostname}:${web3Config.port}`)

  let web3 = new Web3(new Web3.providers.HttpProvider(`http://${web3Config.hostname}:${web3Config.port}`))

  const wallet = Wallet.fromMnemonic(web3Config.mnemonic)
  wallet.provider = provider

  const adapter = new EthersAdapter({
    loader,
    provider,
    wallet
  })

  const networkClient = new ColonyNetworkClient({ adapter })
  await networkClient.init()

  return { web3, networkClient }
}
