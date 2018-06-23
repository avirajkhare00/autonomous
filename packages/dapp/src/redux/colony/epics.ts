import { Epic } from 'redux-observable'
import { push } from 'react-router-redux'
import { Observable } from 'rxjs/Observable'

import {
  Clean, CleanAll,
  ColonyActionTypes, createCleanAllFailAction, createCleanAllSuccessAction,
  createCleanFailAction,
  createCleanSuccessAction,
  createRegisterFailAction,
  createRegisterSuccessAction,
  createSelectAction,
  createSelectFailAction,
  createSelectSuccessAction,
  Deselect,
  Register,
  RegisterSuccess,
  Select,
  SelectFail,
  SelectSuccess
} from './actions'
import { RootActions, RootState } from '../store'
import { ROOT_ROUTES } from '../../scenes/routes'
import { createGetAllTasksAction } from '../tasks/actions'
import { env } from '../../config/ApplicationConfig'

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
          .flatMap(([client, tokenAddress]) => [
            createSelectSuccessAction(
              {
                address: action.address,
                token: tokenAddress
              },
              client
            ),
            createGetAllTasksAction()
          ])
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

const registerEpic: Epic<RootActions, RootState> =
  (action$) => action$.ofType<Register>(ColonyActionTypes.Register)
    .mergeMap(action => {
      return Observable.fromPromise(fetch(`http://${env.RELAYER_HOST}:${env.RELAYER_PORT}/register/${action.address}`, {
        method: 'POST'
      }))
        .flatMap(resp => resp.ok
          ? Observable.of(resp)
          : Observable.throw(resp.statusText))
        .map(_resp => createRegisterSuccessAction(action.address))
        .catch(err => Observable.of(createRegisterFailAction(err)))
    })

const registerSuccessEpic: Epic<RootActions, RootState> =
  action$ => action$.ofType<RegisterSuccess>(ColonyActionTypes.RegisterSuccess)
    .map(action => createSelectAction(action.address))

const cleanEpic: Epic<RootActions, RootState> =
  (action$) => action$.ofType<Clean>(ColonyActionTypes.Clean)
    .mergeMap(action => {
      return Observable.fromPromise(fetch(`http://${env.RELAYER_HOST}:${env.RELAYER_PORT}/clean/${action.address}`, {
        method: 'POST'
      }))
        .flatMap(resp => resp.ok
          ? Observable.of(resp)
          : Observable.throw(resp.statusText))
        .map(_resp => createCleanSuccessAction(action.address))
        .catch(err => Observable.of(createCleanFailAction(err)))
    })

const cleanAllEpic: Epic<RootActions, RootState> =
  (action$) => action$.ofType<CleanAll>(ColonyActionTypes.CleanAll)
    .mergeMap(_ => {
      return Observable.fromPromise(fetch(`http://${env.RELAYER_HOST}:${env.RELAYER_PORT}/clean`, {
        method: 'POST'
      }))
        .flatMap(resp => resp.ok
          ? Observable.of(resp)
          : Observable.throw(resp.statusText))
        .map(_resp => createCleanAllSuccessAction())
        .catch(err => Observable.of(createCleanAllFailAction(err)))
    })

export const ColonyEpics = [
  selectEpic,
  selectSuccessEpic,
  selectFailOrDeselectEpic,
  registerEpic,
  registerSuccessEpic,
  cleanEpic,
  cleanAllEpic
]
