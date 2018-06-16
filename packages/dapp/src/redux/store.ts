import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { RouterAction, routerMiddleware as createRouterMiddleware, routerReducer } from 'react-router-redux'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import createBrowserHistory from 'history/createBrowserHistory'

import { ColonyEpics } from './colony/epics'
import { colonyReducer, ColonyState } from './colony/reducer'
import { ColonyActions } from './colony/actions'

export const rootEpic = combineEpics(
  ...ColonyEpics
)

export interface RootState {
  colony: ColonyState
}

export type RootActions =
  | RouterAction
  | ColonyActions

const epicMiddleware = createEpicMiddleware(rootEpic)

export const history = createBrowserHistory()

const routerMiddleware = createRouterMiddleware(history)

const rootReducer = combineReducers({
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
