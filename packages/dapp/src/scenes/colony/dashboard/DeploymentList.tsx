import { default as React, SFC } from 'react'
import { Dimmer, Header, Loader } from 'semantic-ui-react'
import glamorous from 'glamorous'

import { DeploymentCard } from './DeploymentCard'
import { Task } from '../../../models/Task'

interface TaskListTableProps {
  tasks: Task[]
  isLoading: boolean

  onSubmit(task: Task): void

  onDeploy(task: Task): void
}

const CardsContainer = glamorous.div({
  display: 'flex',
  flexDirection: 'row',
  marginTop: '20px!important'
})

export const DeploymentList: SFC<TaskListTableProps> = ({ isLoading, tasks, onSubmit, onDeploy }) => (
  <div>
    <Dimmer active={isLoading} inverted>
      <Loader size='medium'/>
    </Dimmer>

    <CardsContainer>
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
            ? <Header as={'h2'}>You have no deployments yet, add one!</Header>
            : null
        )
      }
    </CardsContainer>
  </div>
)
