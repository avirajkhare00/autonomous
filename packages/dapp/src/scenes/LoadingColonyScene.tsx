import { default as React, SFC } from 'react'
import { connect, Dispatch } from 'react-redux'
import { Header, Loader, Message } from 'semantic-ui-react'

import { ColonySelectionLayout } from '../components/layout/ColonySelectionLayout'
import { RootActions, RootState } from '../redux/store'
import { env } from '../config/ApplicationConfig'
import { createAppReadyAction } from '../redux/core/actions'
import { SecondaryButton } from '../components/buttons/BaseButtons'

const loadingColonyScene: SFC<{ isLoading: boolean, error: Error, reload(): void }> = ({ isLoading, error, reload }) => (
  <ColonySelectionLayout>
    {isLoading
      ? (
        <div>
          <Message>
            <Header as={'h1'}>Loading Autonomous DApp</Header>
            <Loader active inline={'centered'}/>
            <ul>
              <li>IPFS Node at {env.IPFS_HOST}:{env.IPFS_API_PORT}</li>
              <li>Contract Server at {env.CONTRACT_SERVER_HOST}:{env.CONTRACT_SERVER_PORT}</li>
              <li>Relayer at {env.RELAYER_HOST}:{env.RELAYER_PORT}</li>
            </ul>
          </Message>
        </div>
      )
      : null
    }
    {error
      ? (
        <Message negative>
          <Message.Header>Error loading DApp</Message.Header>

          <p>Ensure the following services are active:</p>
          <ul>
            <li>Metamask unlocked and connected to localhost ganache</li>
            <li>IPFS Node at {env.IPFS_HOST}:{env.IPFS_API_PORT}</li>
            <li>Contract Server at {env.CONTRACT_SERVER_HOST}:{env.CONTRACT_SERVER_PORT}</li>
            <li>Relayer at {env.RELAYER_HOST}:{env.RELAYER_PORT}</li>
          </ul>

          <SecondaryButton onClick={() => reload()}>Reload App</SecondaryButton>

          <h2>Error:</h2>
          <p style={{ maxWidth: 600 }}>{error.message.toString()}</p>
        </Message>
      )
      : null
    }
  </ColonySelectionLayout>
)

const mapState = (state: RootState) => ({
  isLoading: state.core.isLoading,
  error: state.core.error
})

const mapDispatch = (dispatch: Dispatch<RootActions>) => ({
  reload() {
    dispatch(createAppReadyAction())
  }
})

export const LoadingColonyScene = connect(mapState, mapDispatch)(loadingColonyScene)
