import { exec } from 'child_process'
// import ColonyNetworkClient from '@colony/colony-js-client'

export async function migrateColony () {
  console.log('Migrating Colony contracts...')

  let output = await new Promise((res, rej) => {
    exec('truffle migrate', (err, stdout, _stderr) => {
      if (err) rej(err)
      else res(stdout)
    })
  })
  console.log(output)

  console.log('Migration complete!')

  // let result = await networkClient.getMetaColonyAddress.call()

  // console.log('Meta colony deployed at address: ', result.address)
}
