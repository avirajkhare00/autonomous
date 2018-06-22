import { default as React, SFC } from 'react'
import { connect } from 'react-redux'
import { Header, Segment } from 'semantic-ui-react'
import { RootState } from '../../redux/store'
import { ColonyLayout } from '../../components/layout/ColonyLayout'
import { Colony } from '../../models/Colony'
import { RouteProps } from 'react-router'
import { ColonySwitch } from './navigation'

interface ColonySceneProps {
  colony: Colony
}

const _colonyScene: SFC<ColonySceneProps & RouteProps> = ({ colony }) => (
  <ColonyLayout>
    <Segment>
      <Header as='h1'>Autonomous Colony</Header>
      {colony
        ? (
          <div>
            Address: {colony.address}
            <br/>
          </div>
        )
        : null
      }

      <ColonySwitch />
    </Segment>
  </ColonyLayout>
)

const mapState = (state: RootState): Partial<ColonySceneProps> => ({
  colony: state.colony.colony
})

export const ColonyScene = connect(mapState)(_colonyScene)
