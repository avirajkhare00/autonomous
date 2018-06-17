import { Epic } from 'redux-observable'
import { push } from 'react-router-redux'
import { Observable } from 'rxjs/Observable'

import {
  ColonyActionTypes,
  createSelectFailAction,
  createSelectSuccessAction,
  Deselect,
  Select,
  SelectFail,
  SelectSuccess
} from './actions'
import { RootActions, RootState } from '../store'
import { ROOT_ROUTES } from '../../scenes/routes'

const selectEpic: Epic<RootActions, RootState> =
  (action$, store$) => action$.ofType<Select>(ColonyActionTypes.Select)
    .mergeMap(action => {
      // Try to get the current networkClient from the store
      // (Requires app to have been initialized first)
      let networkClient = store$.getState().core.networkClient

      if (networkClient) {
        // Build a colony client first
        let client$ = Observable.fromPromise(networkClient.getColonyClientByAddress(action.address))

        // Use the client to return the token address associated with the colony
        let token$ = client$
          .flatMap(client => client.getToken.call())
          .map(token => token.address)

        // Return an action encapsulating the colony
        return Observable.combineLatest(
          client$,
          token$
        )
          .map(([client, tokenAddress]) => createSelectSuccessAction(
            {
              address: action.address,
              token: tokenAddress
            },
            client
          ))
          .catch(e => Observable.of(createSelectFailAction(e)))
      } else {
        return Observable.of(createSelectFailAction(new Error('Network not ready')))
      }
    })

const selectSuccessEpic: Epic<RootActions, RootState> =
  action$ => action$.ofType<SelectSuccess>(ColonyActionTypes.SelectSuccess)
    .map(_ => push(ROOT_ROUTES.Colony))

const selectFailOrDeselectEpic: Epic<RootActions, RootState> =
  action$ => action$.ofType<SelectFail | Deselect>(
    ColonyActionTypes.SelectFail, ColonyActionTypes.Deselect
  )
    .map(_ => push(ROOT_ROUTES.Landing))

export const ColonyEpics = [
  selectEpic,
  selectSuccessEpic,
  selectFailOrDeselectEpic
]
