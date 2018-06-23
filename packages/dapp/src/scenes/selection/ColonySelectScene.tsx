import { default as React, SFC } from 'react'
import { RouteProps } from 'react-router'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Card, Divider, Button } from 'semantic-ui-react'

import { ColonySelectionLayout } from '../../components/layout/ColonySelectionLayout'
import { RootActions } from '../../redux/store'
import { EnterColonyForm } from './EnterColonyForm'
import {
  createCleanAction,
  createCleanAllAction,
  createRegisterAction,
  createSelectAction
} from '../../redux/colony/actions'
import { ColonyRelayerForm } from './ColonyRelayerForm'

interface LoginSceneProps {
  selectColony (address: string): void
  registerColony (address: string): void
  cleanColony (address: string): void
  cleanAll(): void
}

export const _colonySelectScene: SFC<LoginSceneProps & RouteProps> = ({ selectColony, registerColony, cleanColony, cleanAll }) => (
  <ColonySelectionLayout>
    <Card>
      <Card.Content>
        <Card.Header>Browse Colony</Card.Header>
        <Divider />
        <EnterColonyForm onSubmit={c => selectColony(c)} buttonText={'Select Colony'} />
      </Card.Content>
    </Card>
    <Card>
      <Card.Content>
        <Card.Header>Register new Colony with Autonomous</Card.Header>
        <Divider />
        <p>
          These actions do not affect the Colony or interact with the Blockchain, these methods
          interact with the Autonomous Relayer, which listens to changes in registered colonies
          and manages their deployments.
        </p>
        <ColonyRelayerForm
          onSubmit={c => registerColony(c)}
          onDelete={c => cleanColony(c)}
        />

        <p>
          Clean all namespaces and listeners on the Relayer (careful!)
        </p>
        <Button onClick={() => cleanAll()}>Clean All</Button>
      </Card.Content>
    </Card>
  </ColonySelectionLayout>
)

const mapDispatch = (dispatch: Dispatch<RootActions>) => ({
  selectColony (address: string) {
    dispatch(createSelectAction(address))
  },
  registerColony (address: string) {
    dispatch(createRegisterAction(address))
  },
  cleanColony (address: string) {
    dispatch(createCleanAction(address))
  },
  cleanAll () {
    dispatch(createCleanAllAction())
  }
})

export const ColonySelectScene = connect(null, mapDispatch)(_colonySelectScene)
