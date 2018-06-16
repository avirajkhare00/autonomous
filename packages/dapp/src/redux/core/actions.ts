import { Action } from 'redux'

export interface AppReady extends Action {
  type: '@@READY'
}

export function createAppReadyAction(): AppReady {
  return { type: '@@READY' }
}
