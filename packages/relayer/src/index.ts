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

import { RelayerServer } from './RelayerServer'
import { getColonyClient } from './getColonyClient'
import { getIPFSClient } from './getIPFSClient'

(async () => {
  const k8sClient = new Client({ config: config.fromKubeconfig() })
  await k8sClient.loadSpec()

  let networkClient = await getColonyClient()
  let ipfsClient = await getIPFSClient()

  let relayer = new RelayerServer(k8sClient, networkClient, ipfsClient)

  await relayer.start()
})()
