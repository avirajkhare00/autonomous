import commander from 'commander'
import dotenv from 'dotenv-safe'

import { getColonyClient } from './colony/getColonyClient'
import { addColony } from './colony/addColony'
import { migrateColony } from './environment/migrateColony'
import { getTestContractServerConfig, getTestWeb3Config } from './config'

(async () => {
  dotenv.config()

  commander
    .command('add')
    .action(async () => {
      let web3Config = getTestWeb3Config()
      let contractServer = getTestContractServerConfig()

      let { networkClient } = await getColonyClient(web3Config, contractServer)

      await addColony(networkClient)
    })

  // commander
  //   .command('serve')
  //   .action(async () => {
  //     // let web3Config = getTestWeb3Config()
  //     // let ipfsConfig = getTestIPFSConfig()
  //
  //     await serveTestEnvironment()
  //   })

  commander
    .command('migrate')
    .action(async () => {
      // let networkClient = await getColonyClient(web3Options)
      try {
        await migrateColony()
      } catch (e) {
        console.log('Error', e)
      }
    })

  commander.parse(process.argv)
})()
