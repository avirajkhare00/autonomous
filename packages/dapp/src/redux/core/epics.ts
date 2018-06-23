import { Epic } from 'redux-observable'
import { push } from 'react-router-redux'
import { providers } from 'ethers'
import { Observable } from 'rxjs/Observable'
import ColonyNetworkClient from '@colony/colony-js-client'
import EthersAdapter from '@colony/colony-js-adapter-ethers'

import { RootState } from '../store'
import { ROOT_ROUTES } from '../../scenes/routes'
import { AppReady, CoreActionTypes, createAppInitializedAction, createLoadFailedAction } from './actions'
import { ContractServerLoader } from '../../lib/ContractServerLoader'
import { getIPFSClient } from '../../lib/ipfs/getIPFSClient'
import { env } from '../../config/ApplicationConfig'

const appInitEpic: Epic<any, RootState> =
  action$ => action$.ofType<AppReady>(CoreActionTypes.Ready)
    .mergeMap(_ => {
      console.log('Environment', env)

      // Use MetaMask: Check global web3 object is injected
      if (typeof web3 !== 'undefined') {
        console.log('Loading colony from injected Web3...')

        // Build an Ethers provider using the injected web3
        const provider = new providers.Web3Provider(web3.currentProvider)

        // Use our locally hosted ContractServer to load ABI files
        // Otherwise the JSON files would need to be bundled with the DApp
        const loader = new ContractServerLoader({
          endpoint: `http://${env.CONTRACT_SERVER_HOST}:${env.CONTRACT_SERVER_PORT}/contracts?name=%%NAME%%&address=%%ADDRESS%%&version=%%VERSION%%`
        })

        // Get the accounts injected by the provider
        const accounts$ = Observable.fromPromise(provider.listAccounts())
          .flatMap(accounts => accounts.length === 0
            ? Observable.throw(new Error('No accounts, ensure **MetaMask** is unlocked'))
            : Observable.of(accounts))
          .timeout(8000)
          .catch(e => Observable.throw(
            new Error('Failed to get web3 accounts, ensure **MetaMask** is unlocked and connected to the local **ganache**: ' + e.message))
          )

        // Build a ColonyNetworkClient
        // Note: Signer requires an address to be provided
        const client$ = accounts$
          .map(accounts => new EthersAdapter({
              loader,
              provider,
              wallet: provider.getSigner(accounts[0])
            })
          )
          .map(adapter => new ColonyNetworkClient({ adapter }))
          // Initialise the client as part of the client creation
          .mergeMap(client => client.init().then(_ => client))
          .catch(e => Observable.throw(new Error('Failed to initialize ColonyNetworkClient, ensure **ganache** and **Contract Server** is running: ' + e.message)))

        // Get the current network Id from Web3
        const networkId$: Observable<number> = Observable.bindNodeCallback(web3.version.getNetwork)()
          .map(network => Number(network))
          .catch(e => Observable.throw(new Error('Failed to get web3 network ID: ' + e.message)))

        // Combine all the above operations to emit the initialized action
        let ipfsClient = getIPFSClient(env.IPFS_HOST, env.IPFS_API_PORT)

        // Test we have an IPFS connection so we can fail early
        // Hello world!
        let ipfsTest$ = Observable.fromPromise(ipfsClient.files.cat('Qmc5gCcjYypU7y28oCALwfSvxCBskLuPKWpK4qpterKC7z'))
          .catch(e => Observable.throw(new Error('Failed to get test file from **IPFS**: ' + e.message)))

        return Observable.combineLatest(
          client$,
          networkId$,
          accounts$,
          ipfsTest$
        )
          .map(([networkClient, networkId, accounts]) => createAppInitializedAction(
            networkClient,
            ipfsClient,
            networkId,
            accounts
          ))
          // Emit the initialization as well as a redirection to the landing page
          .flatMap(action => [
            action,
            push(ROOT_ROUTES.Landing)
          ])
          .catch(e => {
            console.log('Error initializing app', e)

            return Observable.of(createLoadFailedAction(e))
          })
      } else {
        return Observable.of(createLoadFailedAction(new Error('No web3 found')))
      }
    })

export const CoreEpics = [
  appInitEpic
]
