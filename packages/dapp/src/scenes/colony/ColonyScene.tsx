import { default as React, SFC } from 'react'
import { RouteProps } from 'react-router'
import { connect } from 'react-redux'
import { Button, Header, Segment } from 'semantic-ui-react'
import { Dispatch } from 'redux'

import { RootActions, RootState } from '../../redux/store'
import { ColonyLayout } from '../../components/layout/ColonyLayout'
import { ColonyNavigation } from './navigation'
import { Colony } from '../../models/Colony'
import { createCreateTaskAction } from '../../redux/tasks/actions'
import { Task } from '../../models/Task'

interface ColonySceneProps {
  colony: Colony
  tasks: Task[]
  createTask (): void
}

const _colonyScene: SFC<ColonySceneProps & RouteProps> = ({ colony, tasks, createTask }) => (
  <ColonyLayout>
    <Segment>
      <Header as='h1'>Autonomous Colony</Header>
      {colony
        ? (
          <div>
            Address: {colony.address}

            Tasks: {JSON.stringify(tasks)}

            <ColonyNavigation />

            <Button
              onClick={() => createTask()}
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
  tasks: state.tasks.tasks
})

const mapDispatch = (dispatch: Dispatch<RootActions>) => ({
  createTask () {
    dispatch(createCreateTaskAction({
      foo: 'bar'
    }))
  }
})

export const ColonyScene = connect(mapState, mapDispatch)(_colonyScene)
