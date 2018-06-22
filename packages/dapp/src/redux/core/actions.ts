import { Action } from 'redux'
import { IPFSAPI } from 'ipfs-api'
import ColonyNetworkClient from '@colony/colony-js-client'

export enum CoreActionTypes {
  Ready = '@@READY',
  Initialized = '[Core] App Initialized',
  LoadFailed = '[Core] App Load Failed'
}

export interface AppReady extends Action {
  type: CoreActionTypes.Ready
}

export interface AppInitialized extends Action {
  type: CoreActionTypes.Initialized
  networkClient: ColonyNetworkClient
  ipfsClient: IPFSAPI
  networkId: number
  accounts: string[]
}

export interface LoadFailed extends Action {
  type: CoreActionTypes.LoadFailed
  error: Error

}

export function createAppReadyAction (): AppReady {
  return { type: CoreActionTypes.Ready }
}

export function createAppInitializedAction (networkClient: ColonyNetworkClient, ipfsClient: IPFSAPI, networkId: number, accounts: string[]): AppInitialized {
  return { type: CoreActionTypes.Initialized, networkClient, ipfsClient, networkId, accounts }
}

export function createLoadFailedAction (error: Error): LoadFailed {
  return { type: CoreActionTypes.LoadFailed, error }
}

export type CoreActions =
  | AppReady
  | AppInitialized
  | LoadFailed
