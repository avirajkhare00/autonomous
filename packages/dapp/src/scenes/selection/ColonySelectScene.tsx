import { default as React, SFC } from 'react'
import { RouteProps } from 'react-router'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Card, Divider } from 'semantic-ui-react'

import { ColonySelectionLayout } from '../../components/layout/ColonySelectionLayout'
import { RootActions } from '../../redux/store'
import { EnterColonyForm } from './EnterColonyForm'
import { createRegisterAction, createSelectAction } from '../../redux/colony/actions'

interface LoginSceneProps {
  selectColony (address: string): void
  registerColony (address: string): void
}

export const _colonySelectScene: SFC<LoginSceneProps & RouteProps> = ({ selectColony, registerColony }) => (
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
        <EnterColonyForm onSubmit={c => registerColony(c)} buttonText={'Register colony'} />
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
  }
})

export const ColonySelectScene = connect(null, mapDispatch)(_colonySelectScene)
