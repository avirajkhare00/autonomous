import { default as React, SFC } from 'react'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { RootActions, RootState } from '../../../redux/store'
import { RouteProps } from 'react-router'

import { TaskListTable } from './TaskListTable'
import { Task } from '../../../models/Task'
import { createCreateTaskAction, createGetAllTasksAction } from '../../../redux/tasks/actions'
import { CreateTaskColonyForm } from './CreateTaskForm'

interface DashboardSceneProps {
  tasks: Task[]

  createTask(brief: string): void

  refreshTasks(): void
}

export const _dashboardScene: SFC<DashboardSceneProps & RouteProps> = ({ tasks, createTask, refreshTasks }) => (
  <div>
    <CreateTaskColonyForm onSubmit={a => createTask(a)}/>
    <br/>
    <Button onClick={() => refreshTasks()}>Refresh Tasks</Button>
    <br/>
    Here's where things about the colony will go.

    <div>
      Like the tasks: <TaskListTable tasks={tasks}/>
    </div>
  </div>
)

const mapState = (state: RootState): Partial<DashboardSceneProps> => ({
  tasks: state.tasks.tasks
})

const mapDispatch = (dispatch: Dispatch<RootActions>) => ({
  createTask(brief: string) {
    dispatch(createCreateTaskAction(
      brief
    ))
  },
  refreshTasks() {
    dispatch(createGetAllTasksAction())
  }
})

export const DashboardScene = connect(mapState, mapDispatch)(_dashboardScene)
