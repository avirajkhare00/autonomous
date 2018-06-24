import { default as React, SFC } from 'react'
import { Card, Button } from 'semantic-ui-react'
import Jazzicon from 'react-jazzicon'
import glamorous from 'glamorous'

import { Task } from '../../../models/Task'
import { RootState } from '../../../redux/store'
import { Colony } from '../../../models/Colony'
import { connect } from 'react-redux'

interface TaskListTableProps {
  task: Task
  colony: Colony
  onSubmit (): void
  onDeploy (): void
}

const IconCenter = glamorous.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 16
})

export const deploymentCard: SFC<TaskListTableProps> = ({ task, colony, onSubmit, onDeploy }) => (
  <Card>
    <IconCenter>
      <Jazzicon diameter={50} seed={task.id + parseInt(colony.address.substring(0,8), 16)} />
    </IconCenter>
    <Card.Content>
      <Card.Header>Task #{task.id}</Card.Header>
      <Card.Description>{task.specification.brief}</Card.Description>
    </Card.Content>
    <Card.Content>
      <Button onClick={() => onSubmit()}>Submit Work</Button>
      <Button onClick={() => onDeploy()}>Deploy</Button>
    </Card.Content>
  </Card>
)

const mapState = (state: RootState) => ({
  colony: state.colony.colony
})
export const DeploymentCard = connect(mapState)(deploymentCard)
