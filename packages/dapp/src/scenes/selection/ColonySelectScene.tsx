import { default as React, SFC } from 'react'
import { RouteProps } from 'react-router'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Card, Divider } from 'semantic-ui-react'

import { ColonySelectionLayout } from '../../components/layout/ColonySelectionLayout'
import { RootActions } from '../../redux/store'
import { SelectColonyForm } from './SelectColonyForm'
import { createSelectAction } from '../../redux/colony/actions'

interface LoginSceneProps {
  selectColony (address: string): void
}

export const _colonySelectScene: SFC<LoginSceneProps & RouteProps> = ({ selectColony }) => (
  <ColonySelectionLayout>
    <Card>
      <Card.Content>
        <Card.Header>Select Colony</Card.Header>
        <Divider />
        <SelectColonyForm onSubmit={a => selectColony(a)} />
      </Card.Content>
    </Card>
  </ColonySelectionLayout>
)

const mapDispatch = (dispatch: Dispatch<RootActions>) => ({
  selectColony (address: string) {
    dispatch(createSelectAction(address))
  }
})

export const ColonySelectScene = connect(null, mapDispatch)(_colonySelectScene)
