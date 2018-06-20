import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { RouterAction, routerMiddleware as createRouterMiddleware, routerReducer } from 'react-router-redux'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import createBrowserHistory from 'history/createBrowserHistory'

import { ColonyEpics } from './colony/epics'
import { colonyReducer, ColonyState } from './colony/reducer'
import { ColonyActions } from './colony/actions'
import { TransactionActions } from './transactions/actions'
import { transactionsReducer, TransactionsState } from './transactions/reducer'
import { CoreEpics } from './core/epics'
import { TransactionEpics } from './transactions/epics'
import { coreReducer, CoreState } from './core/reducer'
import { CoreActions } from './core/actions'
import { tasksReducer, TasksState } from './tasks/reducer'
import { TasksEpics } from './tasks/epics'
import { TaskActions } from './tasks/actions'

export const rootEpic = combineEpics(
  ...CoreEpics,
  ...ColonyEpics,
  ...TransactionEpics,
  ...TasksEpics
)

export interface RootState {
  core: CoreState
  colony: ColonyState
  transactions: TransactionsState
  tasks: TasksState
}

export type RootActions =
  | CoreActions
  | RouterAction
  | ColonyActions
  | TransactionActions
  | TaskActions

const epicMiddleware = createEpicMiddleware(rootEpic)

export const history = createBrowserHistory()

const routerMiddleware = createRouterMiddleware(history)

const rootReducer = combineReducers({
  core: coreReducer,
  router: routerReducer,
  colony: colonyReducer,
  transactions: transactionsReducer,
  tasks: tasksReducer
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
