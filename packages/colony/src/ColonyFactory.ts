import { providers, Wallet } from 'ethers'
import EthersAdapter from '@colony/colony-js-adapter-ethers'
import ColonyNetworkClient, { ColonyClient } from '@colony/colony-js-client'

import { ContractServerLoader } from './contract-server/ContractServerLoader'

export class ColonyFactory {
  async create () {
    // const loader = new TruffleLoader({ contractDir: 'build/contracts' })
    const loader = new ContractServerLoader()

    let provider = new providers.JsonRpcProvider('http://localhost:8545/')

    let testMnemonic = process.env.TEST_MNEMONIC!

    // Create a wallet with the private key (so we have a balance we can use)
    const wallet = Wallet.fromMnemonic(testMnemonic)
    wallet.provider = provider

    const adapter = new EthersAdapter({
      loader,
      provider,
      wallet
    })

    const networkClient = new ColonyNetworkClient({ adapter })
    await networkClient.init()

    // Let's deploy a new ERC20 token for our Colony.
    // You could also skip this step and use a pre-existing/deployed contract.
    const tokenAddress = await networkClient.createToken({
      name: 'Cool Colony Token',
      symbol: 'COLNY'
    })
    console.log('Token address: ' + tokenAddress)

    // Create a cool Colony!
    const {
      eventData: { colonyId, colonyAddress }
    } = await networkClient.createColony.send({ tokenAddress })

    // Congrats, you've created a Colony!
    console.log('Colony ID: ' + colonyId)
    console.log('Colony address: ' + colonyAddress)

    // For a colony that exists already, you just need its ID:
    const colonyClient: ColonyClient = await networkClient.getColonyClient(colonyId)

    // Or alternatively, just its address:
    // const colonyClient = await networkClient.getColonyClientByAddress(colonyAddress)

    // You can also get the Meta Colony:
    const metaColonyClient = await networkClient.getMetaColonyClient()
    console.log('Meta Colony address: ' + metaColonyClient.contract.address)

    return colonyClient
  }
}
