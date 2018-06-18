import { RelayerServer } from './RelayerServer'
import { Client, config } from 'kubernetes-client'

(async () => {
  const client = new Client({ config: config.fromKubeconfig() })
  await client.loadSpec()

  let relayer = new RelayerServer(client)

  await relayer.start()
})()
