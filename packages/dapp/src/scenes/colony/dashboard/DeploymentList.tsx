import { default as React, SFC } from 'react'
import { Header, Dimmer, Loader } from 'semantic-ui-react'

import { DeploymentCard } from './DeploymentCard'
import { Task } from '../../../models/Task'

interface TaskListTableProps {
  tasks: Task[]
  isLoading: boolean
  onSubmit (task: Task): void
  onDeploy (task: Task): void
}

export const DeploymentList: SFC<TaskListTableProps> = ({ isLoading, tasks, onSubmit, onDeploy }) => (
  <div>
    <Dimmer active={isLoading} inverted>
      <Loader size='medium' />
    </Dimmer>

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
      : (!isLoading
          ? <Header as={'h1'}>You have no deployments yet, add one!</Header>
          : null
      )
    }
  </div>
)
