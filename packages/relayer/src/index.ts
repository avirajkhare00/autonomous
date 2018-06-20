import 'rxjs/add/observable/combineLatest'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/fromPromise'
import 'rxjs/add/observable/bindNodeCallback'
import 'rxjs/add/observable/merge'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/timeout'
import 'rxjs/add/operator/delay'

import { Client, config } from 'kubernetes-client'
import dotenv from 'dotenv-safe'

import { getColonyClient, getIPFSClient, Web3Config } from '@autonomous/colony'

import { RelayerServer } from './RelayerServer'

(async () => {
  dotenv.config()

  const k8sClient = new Client({ config: config.fromKubeconfig() })
  await k8sClient.loadSpec()

  let web3Config: Web3Config = {
    mnemonic: process.env.TEST_MNEMONIC!,
    hostname: 'localhost',
    port: 8545
  }

  let ipfsHost = process.env.IPFS_HOST!
  let ipfsPort = Number(process.env.IPFS_API_PORT!)

  let networkClient = await getColonyClient(web3Config)
  let ipfsClient = await getIPFSClient(ipfsHost, ipfsPort)

  let relayer = new RelayerServer(k8sClient, networkClient, ipfsClient)

  await relayer.start()
})()
