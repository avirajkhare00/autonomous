import { default as React, SFC } from 'react'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { RootActions, RootState } from '../../../redux/store'
import { RouteProps } from 'react-router'

import { TaskListTable } from './TaskListTable'
import { Task } from '../../../models/Task'
import {
  createCreateTaskAction,
  createFinalizeAction,
  createGetAllTasksAction,
  createSubmitTaskConfigAction
} from '../../../redux/tasks/actions'
import { CreateTaskForm } from './CreateTaskForm'
import { SubmitTaskConfigForm } from './SubmitTaskConfigForm'

interface DashboardSceneProps {
  tasks: Task[]

  createTask (brief: string, workerAddress: string, evaluatorAddress: string): void

  submitConfig (taskId: number, deploymentString: string): void

  finalizeTask (taskId: number): void

  refreshTasks (): void
}

export const _dashboardScene: SFC<DashboardSceneProps & RouteProps> = ({ tasks, createTask, submitConfig, refreshTasks, finalizeTask }) => (
  <div>
    <CreateTaskForm onSubmit={(b, w, e) => createTask(b, w, e)} />
    <br />
    <SubmitTaskConfigForm tasks={tasks} onSubmit={(id, c) => submitConfig(id, c)} />
    <br />
    <Button onClick={() => refreshTasks()}>Refresh Tasks</Button>
    <br />
    Here's where things about the colony will go.

    <div>
      Like the tasks: <TaskListTable tasks={tasks} onFinalize={id => finalizeTask(id)} />
    </div>
  </div>
)

const mapState = (state: RootState): Partial<DashboardSceneProps> => ({
  tasks: state.tasks.tasks
})

const mapDispatch = (dispatch: Dispatch<RootActions>) => ({
  createTask (brief: string, workerAddress: string, evaluatorAddress: string) {
    dispatch(createCreateTaskAction(
      {
        brief: brief
      },
      workerAddress,
      evaluatorAddress
    ))
  },
  submitConfig (taskId: number, deploymentString: string) {
    dispatch(createSubmitTaskConfigAction(taskId, {
      deploymentString: deploymentString
    }))
  },
  refreshTasks () {
    dispatch(createGetAllTasksAction())
  },
  finalizeTask (taskId: number) {
    dispatch(createFinalizeAction(taskId))
  }
})

export const DashboardScene = connect(mapState, mapDispatch)(_dashboardScene)
