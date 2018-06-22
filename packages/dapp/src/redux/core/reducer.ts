import ColonyNetworkClient from '@colony/colony-js-client'

import { CoreActions, CoreActionTypes } from './actions'
import { IPFSAPI } from 'ipfs-api'

export interface CoreState {
  initialised: boolean,
  isLoading: boolean,
  error: Error | undefined,
  ipfsClient?: IPFSAPI
  networkClient?: ColonyNetworkClient
  networkId?: number
  accounts?: string[]
}

const initialState: CoreState = {
  initialised: false,
  error: undefined,
  isLoading: true,
  networkClient: undefined,
  networkId: undefined,
  accounts: undefined
}

export function coreReducer (state: CoreState = initialState, action: CoreActions): CoreState {
  switch (action.type) {
    case CoreActionTypes.Ready: {
      return {
        ...state,
        initialised: false,
        isLoading: true,
        error: undefined,
        networkClient: undefined,
        ipfsClient: undefined,
        networkId: undefined,
        accounts: undefined
      }
    }

    case CoreActionTypes.Initialized: {
      return {
        ...state,
        initialised: true,
        isLoading: false,
        error: undefined,
        networkClient: action.networkClient,
        ipfsClient: action.ipfsClient,
        networkId: action.networkId,
        accounts: action.accounts
      }
    }

    case CoreActionTypes.LoadFailed: {
      return {
        ...state,
        initialised: false,
        isLoading: false,
        error: action.error,
        networkClient: undefined,
        ipfsClient: undefined,
        networkId: undefined,
        accounts: undefined
      }
    }

    default: {
      return state
    }
  }
}
