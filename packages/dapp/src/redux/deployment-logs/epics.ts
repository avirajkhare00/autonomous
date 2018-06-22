import { Epic } from 'redux-observable'
import { Observable } from 'rxjs/Observable'

import { RootActions, RootState } from '../store'
import { env } from '../../config/ApplicationConfig'
import {
  createLoadDeploymentsFailAction,
  createLoadDeploymentsSuccessAction,
  DeploymentLogActionTypes,
  LoadDeployments
} from './actions'
import { DeploymentLog } from '../../models/DeploymentLog'

const loadLogs: Epic<RootActions, RootState> =
  (action$) => action$.ofType<LoadDeployments>(DeploymentLogActionTypes.LoadDeployments)
    .mergeMap(action => {
      return Observable.fromPromise(fetch(`http://${env.RELAYER_HOST}:${env.RELAYER_PORT}/logs/${action.address}`))
        .flatMap(resp => resp.ok
          ? Observable.of(resp)
          : Observable.throw(resp.statusText))
        .flatMap(resp => resp.json())
        .map((result: DeploymentLog) => createLoadDeploymentsSuccessAction(result))
        .catch(err => Observable.of(createLoadDeploymentsFailAction(err)))
    })

export const DeploymentLogEpics = [
  loadLogs
]
