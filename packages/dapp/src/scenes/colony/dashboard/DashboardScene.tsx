import { default as React, SFC } from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../../redux/store'
import { RouteProps } from 'react-router'
import { TaskListTable } from './TaskListTable'
import { Task } from '../../../models/Task'

interface DashboardSceneProps {
  tasks: Task[]
}

export const _dashboardScene: SFC<DashboardSceneProps & RouteProps> = ({ tasks }) => (
  <div>
    Here's where things about the colony will go.

    <div>
      Like the tasks: <TaskListTable tasks={tasks}/>
    </div>
  </div>
)

const mapState = (state: RootState): Partial<DashboardSceneProps> => ({
  tasks: state.tasks.tasks
})

export const DashboardScene = connect(mapState)(_dashboardScene)
