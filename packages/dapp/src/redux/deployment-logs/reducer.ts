import { DeploymentLogActions, DeploymentLogActionTypes } from './actions'
import { DeploymentLog } from '../../models/DeploymentLog'

export interface DeploymentLogState {
  isLoading: boolean
  log: DeploymentLog
}

const initialState: DeploymentLogState = {
  isLoading: false,
  log: {}
}

export function deploymentLogReducer (state: DeploymentLogState = initialState, action: DeploymentLogActions): DeploymentLogState {
  switch (action.type) {
    case DeploymentLogActionTypes.LoadDeployments: {
      return {
        ...state,
        isLoading: true,
        log: {}
      }
    }

    case DeploymentLogActionTypes.LoadDeploymentsSuccess: {
      return {
        ...state,
        isLoading: false,
        log: action.log
      }
    }

    case DeploymentLogActionTypes.LoadDeploymentsFail: {
      return {
        ...state,
        isLoading: false,
        log: {}
      }
    }

    default: {
      return state
    }
  }
}
