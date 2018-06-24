import { default as React, SFC } from 'react'
import { Icon, Loader } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { RootActions, RootState } from '../../../redux/store'
import { RouteProps } from 'react-router'

import { DeploymentLogTable } from './DeploymentLogTable'
import { DeploymentLog } from '../../../models/DeploymentLog'
import { createLoadDeploymentsAction } from '../../../redux/deployment-logs/actions'
import { SecondaryButton } from '../../../components/buttons/BaseButtons'

interface DeploymentLogSceneProps {
  log: DeploymentLog
  address: string | undefined
  isLoading: boolean

  refreshLog(address: string): void
}

export const deploymentLogScene: SFC<DeploymentLogSceneProps & RouteProps> = ({ log, isLoading, refreshLog, address }) => (
  <div>
    {address
      ? <SecondaryButton onClick={() => refreshLog(address)}><Icon name={'refresh'}/> Refresh Log</SecondaryButton>
      : <div>Not connected to a colony. (somehow you broke it!)</div>
    }

    {isLoading
      ? <Loader active inline={'centered'}/>
      : <DeploymentLogTable log={log}/>
    }
  </div>
)

const mapState = (state: RootState): Partial<DeploymentLogSceneProps> => ({
  log: state.deploymentLogs.log,
  isLoading: state.deploymentLogs.isLoading,
  address: state.colony.colony ? state.colony.colony.address : undefined
})

const mapDispatch = (dispatch: Dispatch<RootActions>) => ({
  refreshLog(address: string) {
    dispatch(createLoadDeploymentsAction(address))
  }
})

export const DeploymentLogScene = connect(mapState, mapDispatch)(deploymentLogScene)
