import { ContractServer } from './ContractServer'

(async () => {
  let server = new ContractServer('build/contracts')

  await server.start()
})()
