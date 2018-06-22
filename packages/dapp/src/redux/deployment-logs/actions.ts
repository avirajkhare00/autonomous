import { Action } from 'redux'
import { DeploymentLog } from '../../models/DeploymentLog'

export enum DeploymentLogActionTypes {
  LoadDeployments = '[Colony] Colony LoadDeployments',
  LoadDeploymentsSuccess = '[Colony] Colony LoadDeploymentsSuccess',
  LoadDeploymentsFail = '[Colony] Colony LoadDeploymentsFail'
}

export interface LoadDeployments extends Action {
  type: DeploymentLogActionTypes.LoadDeployments
  address: string
}

export interface LoadDeploymentsSuccess extends Action {
  type: DeploymentLogActionTypes.LoadDeploymentsSuccess
  log: DeploymentLog
}

export interface LoadDeploymentsFail extends Action {
  type: DeploymentLogActionTypes.LoadDeploymentsFail
  error: Error
}

export function createLoadDeploymentsAction (address: string): LoadDeployments {
  return { type: DeploymentLogActionTypes.LoadDeployments, address }
}

export function createLoadDeploymentsSuccessAction (log: DeploymentLog): LoadDeploymentsSuccess {
  return { type: DeploymentLogActionTypes.LoadDeploymentsSuccess, log }
}

export function createLoadDeploymentsFailAction (error: Error): LoadDeploymentsFail {
  return { type: DeploymentLogActionTypes.LoadDeploymentsFail, error }
}

export type DeploymentLogActions =
  | LoadDeployments
  | LoadDeploymentsSuccess
  | LoadDeploymentsFail
