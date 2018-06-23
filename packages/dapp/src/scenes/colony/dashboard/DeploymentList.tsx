import { default as React, SFC } from 'react'
import { Header } from 'semantic-ui-react'

import { DeploymentCard } from './DeploymentCard'
import { Task } from '../../../models/Task'

interface TaskListTableProps {
  tasks: Task[]
  onSubmit (task: Task): void
  onDeploy (task: Task): void
}

export const DeploymentList: SFC<TaskListTableProps> = ({ tasks, onSubmit, onDeploy }) => (
  <div>
    {tasks.length > 0
      ? tasks
        .map((task, i) =>
          <DeploymentCard
            task={task}
            key={i}
            onSubmit={() => onSubmit(task)}
            onDeploy={() => onDeploy(task)}
          />
        )
      : <Header as={'h1'}>You have no deployments yet, add one!</Header>
    }
  </div>
)
