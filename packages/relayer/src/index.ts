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

import { Client, ClientConfiguration, config } from 'kubernetes-client'
import dotenv from 'dotenv-safe'

import { getColonyClient, getIPFSClient, Web3Config } from '@autonomous/colony'

import { RelayerServer } from './RelayerServer'
import { ContractServerConfig } from '../../colony/src/types'

(async () => {
  let isBootstrapped = Boolean(process.env.BOOTSTRAPPED)

  console.log('Is bootstrapped: ', isBootstrapped)

  let kubeConfig = isBootstrapped
    ? config.getInCluster()
    : config.fromKubeconfig()

  if (!isBootstrapped) {
    dotenv.config()
  }

  const k8sClient = new Client({ config: kubeConfig as ClientConfiguration })
  await k8sClient.loadSpec()

  let web3Config: Web3Config = {
    mnemonic: process.env.MNEMONIC!,
    hostname: process.env.ETHEREUM_RPC_HOST!,
    port: Number(process.env.ETHEREUM_RPC_PORT!)
  }

  let contractServerConfig: ContractServerConfig = {
    hostname: process.env.CONTRACT_SERVER_HOST!,
    port: Number(process.env.CONTRACT_SERVER_PORT!)
  }

  let ipfsHost = process.env.IPFS_HOST!
  let ipfsPort = Number(process.env.IPFS_API_PORT!)

  console.log('========================')
  console.log('IPFS', ipfsHost, ipfsPort)
  console.log('Web3', web3Config)
  console.log('Contract Server', contractServerConfig)
  console.log('========================')

  let networkClient = await getColonyClient(web3Config, contractServerConfig)
  let ipfsClient = await getIPFSClient(ipfsHost, ipfsPort)

  let relayer = new RelayerServer(k8sClient, networkClient, ipfsClient)

  await relayer.start()
})()
