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

const appInitEpic: Epic<any, RootState> =
  action$ => action$.ofType<AppReady>(CoreActionTypes.Ready)
    .mergeMap(_ => {
      // Use MetaMask: Check global web3 object is injected
      if (typeof web3 !== 'undefined') {
        console.log('Loading colony from injected Web3...')

        // Build an Ethers provider using the injected web3
        const provider = new providers.Web3Provider(web3.currentProvider)

        // Use our locally hosted ContractServer to load ABI files
        // Otherwise the JSON files would need to be bundled with the DApp
        const loader = new ContractServerLoader()

        // Get the accounts injected by the provider
        const accounts$ = Observable.fromPromise(provider.listAccounts())

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

        // Get the current network Id from Web3
        const networkId$: Observable<number> = Observable.bindNodeCallback(web3.version.getNetwork)()
          .map(network => Number(network))

        // Combine all the above operations to emit the initialized action
        return Observable.combineLatest(
          client$,
          networkId$,
          accounts$
        )
          .map(([networkClient, networkId, accounts]) => createAppInitializedAction(
            networkClient,
            networkId,
            accounts
          ))
          // Emit the initialization as well as a redirection to the landing page
          .flatMap(action => [
            action,
            push(ROOT_ROUTES.Landing)
          ])
          .catch(e => {
            console.log('Error connecting to web3 & Colony', e)

            return Observable.of(createLoadFailedAction(e))
          })
      } else {
        return Observable.of(createLoadFailedAction(new Error('No web3 found')))
      }
    })

export const CoreEpics = [
  appInitEpic
]
