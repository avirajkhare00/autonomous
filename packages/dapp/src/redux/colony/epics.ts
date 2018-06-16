import { Epic } from 'redux-observable'
import { push } from 'react-router-redux'

import { ColonyActionTypes, createSelectSuccessAction, Deselect, Select, SelectFail, SelectSuccess } from './actions'
import { RootActions, RootState } from '../store'
import { ROOT_ROUTES } from '../../scenes/routes'
import { Colony } from '../../models/Colony'
import { AppReady } from '../core/actions'

const appInitEpic: Epic<any, RootState> =
  action$ => action$.ofType<AppReady>('@@READY')
    .map(_ => push(ROOT_ROUTES.Landing))

const selectEpic: Epic<RootActions, RootState> =
  action$ => action$.ofType<Select>(ColonyActionTypes.Select)
    .map(action => createSelectSuccessAction({
      address: action.address
    } as Colony))

const selectSuccessEpic: Epic<RootActions, RootState> =
  action$ => action$.ofType<SelectSuccess>(ColonyActionTypes.SelectSuccess)
    .map(_ => push(ROOT_ROUTES.Colony))

const selectFailOrDeselectEpic: Epic<RootActions, RootState> =
  action$ => action$.ofType<SelectFail | Deselect>(
    ColonyActionTypes.SelectFail, ColonyActionTypes.Deselect
  )
    .map(_ => push(ROOT_ROUTES.Landing))

export const ColonyEpics = [
  appInitEpic,
  selectEpic,
  selectSuccessEpic,
  selectFailOrDeselectEpic
]
