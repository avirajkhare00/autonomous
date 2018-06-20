import commander from 'commander'
import { getColonyClient } from './colony/getColonyClient'
import { addColony } from './colony/addColony'
import { migrateColony } from './environment/migrateColony'
import { getTestWeb3Config } from './config'

(async () => {

  commander
    .command('add')
    .action(async () => {
      let web3Config = getTestWeb3Config()
      let networkClient = await getColonyClient(web3Config)

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
