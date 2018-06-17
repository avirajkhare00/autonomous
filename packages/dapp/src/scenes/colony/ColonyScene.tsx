import { default as React, SFC } from 'react'
import { RouteProps } from 'react-router'
import { connect } from 'react-redux'
import { Header, Segment, Button } from 'semantic-ui-react'
import { ColonyClient } from '@colony/colony-js-client'
import { Dispatch } from 'redux'

import { RootActions, RootState } from '../../redux/store'
import { ColonyLayout } from '../../components/layout/ColonyLayout'
import { ColonyNavigation } from './navigation'
import { Colony } from '../../models/Colony'
import { createTransactionInitiateAction, TransactionInitiator } from '../../redux/transactions/actions'

interface ColonySceneProps {
  colony: Colony
  colonyClient: ColonyClient
  createTask (initiator: TransactionInitiator<any>): void
}

const _colonyScene: SFC<ColonySceneProps & RouteProps> = ({ colony, colonyClient, createTask }) => (
  <ColonyLayout>
    <Segment>
      <Header as='h1'>Autonomous Colony</Header>
      {colony
        ? (
          <div>
            Address: {colony.address}

            Tasks: [{colony.tasks.join(', ')}]

            <ColonyNavigation />

            <Button
              onClick={() => createTask(
                () => colonyClient.createTask.send({
                  specificationHash: 'QmcNbGg6EVfFn2Z1QxWauR9XY9KhnEcyb5DUXCXHi8pwMJ'
                }, { waitForMining: false })
              )}
            >
              Create Task
            </Button>
          </div>
        )
        : null
      }

    </Segment>
  </ColonyLayout>
)

const mapState = (state: RootState): Partial<ColonySceneProps> => ({
  colony: state.colony.colony,
  colonyClient: state.colony.colonyClient
})

const mapDispatch = (dispatch: Dispatch<RootActions>) => ({
  createTask (initiator: TransactionInitiator<any>) {
    dispatch(createTransactionInitiateAction(
      'test',
      'Create task',
      initiator
    ))
  }
})

export const ColonyScene = connect(mapState, mapDispatch)(_colonyScene)
