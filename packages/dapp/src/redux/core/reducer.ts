import ColonyNetworkClient from '@colony/colony-js-client'

import { CoreActions, CoreActionTypes } from './actions'
import { IPFSAPI } from 'ipfs-api'

export interface CoreState {
  initialised: boolean,
  ipfsClient?: IPFSAPI
  networkClient?: ColonyNetworkClient
  networkId?: number
  accounts?: string[]
}

const initialState: CoreState = {
  initialised: false,
  networkClient: undefined,
  networkId: undefined,
  accounts: undefined
}

export function coreReducer (state: CoreState = initialState, action: CoreActions): CoreState {
  switch (action.type) {
    case CoreActionTypes.Initialized: {
      return {
        ...state,
        initialised: true,
        networkClient: action.networkClient,
        ipfsClient: action.ipfsClient,
        networkId: action.networkId,
        accounts: action.accounts
      }
    }

    default: {
      return state
    }
  }
}
