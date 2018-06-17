import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { RouterAction, routerMiddleware as createRouterMiddleware, routerReducer } from 'react-router-redux'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import createBrowserHistory from 'history/createBrowserHistory'

import { ColonyEpics } from './colony/epics'
import { colonyReducer, ColonyState } from './colony/reducer'
import { ColonyActions } from './colony/actions'
import { TransactionActions } from './transactions/actions'
import { TransactionsState } from './transactions/reducer'
import { CoreEpics } from './core/epics'
import { TransactionEpics } from './transactions/epics'
import { coreReducer, CoreState } from './core/reducer'
import { CoreActions } from './core/actions'

export const rootEpic = combineEpics(
  ...CoreEpics,
  ...ColonyEpics,
  ...TransactionEpics
)

export interface RootState {
  core: CoreState
  colony: ColonyState
  transactions: TransactionsState
}

export type RootActions =
  | CoreActions
  | RouterAction
  | ColonyActions
  | TransactionActions

const epicMiddleware = createEpicMiddleware(rootEpic)

export const history = createBrowserHistory()

const routerMiddleware = createRouterMiddleware(history)

const rootReducer = combineReducers({
  core: coreReducer,
  router: routerReducer,
  colony: colonyReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const enhancers = composeEnhancers(
  applyMiddleware(epicMiddleware),
  applyMiddleware(routerMiddleware)
)

export const store = createStore(
  rootReducer,
  enhancers
)
