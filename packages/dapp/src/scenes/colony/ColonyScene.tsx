import { default as React, SFC } from 'react'
import { RouteProps } from 'react-router'
import { connect } from 'react-redux'
import { Button, Header, Segment } from 'semantic-ui-react'
import { Dispatch } from 'redux'
import { RootActions, RootState } from '../../redux/store'
import { ColonyLayout } from '../../components/layout/ColonyLayout'
import { Colony } from '../../models/Colony'
import { createCreateTaskAction, createGetAllTasksAction } from '../../redux/tasks/actions'
import { DashboardScene } from './dashboard/DashboardScene'

interface ColonySceneProps {
  colony: Colony

  createTask(): void
  refreshTasks(): void
}

const _colonyScene: SFC<ColonySceneProps & RouteProps> = ({ colony, createTask, refreshTasks }) => (
  <ColonyLayout>
    <Segment>
      <Header as='h1'>Autonomous Colony</Header>
      {colony
        ? (
          <div>
            Address: {colony.address}

            <br />

            <Button onClick={() => createTask()}>Create Task</Button>
            <Button onClick={() => refreshTasks()}>Refresh Tasks</Button>
          </div>
        )
        : null
      }

      <DashboardScene/>

    </Segment>
  </ColonyLayout>
)

const mapState = (state: RootState): Partial<ColonySceneProps> => ({
  colony: state.colony.colony
})

const mapDispatch = (dispatch: Dispatch<RootActions>) => ({
  createTask() {
    dispatch(createCreateTaskAction({
      foo: 'bar'
    }))
  },
  refreshTasks() {
    dispatch(createGetAllTasksAction())
  }
})

export const ColonyScene = connect(mapState, mapDispatch)(_colonyScene)
