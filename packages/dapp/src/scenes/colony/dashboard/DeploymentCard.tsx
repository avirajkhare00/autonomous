import { default as React, SFC } from 'react'
import { Card } from 'semantic-ui-react'
import Jazzicon from 'react-jazzicon'
import glamorous from 'glamorous'

import { Task } from '../../../models/Task'
import { RootState } from '../../../redux/store'
import { Colony } from '../../../models/Colony'
import { connect } from 'react-redux'
import { PrimaryCardButton } from '../../../components/buttons/CardButtons'

interface TaskListTableProps {
  task: Task
  colony: Colony

  onSubmit(): void

  onDeploy(): void
}

const CardContainer = glamorous(Card)({
  height: '360px!important',
  margin: '10px!important'
})

const CardContentContainer = glamorous(Card.Content)({
  borderTop: 'none!important',
  border: 'none!important'
})

const TopCardContentContainer = glamorous(CardContentContainer)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '10px!important'
})

const IconCenter = glamorous(TopCardContentContainer)({
  marginTop: '30px!important'
})

const DescriptionCardContentContainer = glamorous(CardContentContainer)({
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
  height: '180px!important',
  minHeight: '180px!important',
  maxHeight: '180px!important',
  paddingTop: '0px!important'
})

export const deploymentCard: SFC<TaskListTableProps> = ({ task, colony, onSubmit, onDeploy }) => (
  <CardContainer>
    <IconCenter>
      <Jazzicon diameter={50} seed={task.id + parseInt(colony.address.substring(0, 8), 16)}/>
    </IconCenter>
    <TopCardContentContainer>
      <Card.Header>Task #{task.id}</Card.Header>
    </TopCardContentContainer>
    <DescriptionCardContentContainer>
      <Card.Description>{task.specification.brief}</Card.Description>
    </DescriptionCardContentContainer>
    <CardContentContainer>
      {task.deliverableHash
        ? (<PrimaryCardButton onClick={() => onDeploy()}>Deploy</PrimaryCardButton>)
        : (<PrimaryCardButton onClick={() => onSubmit()}>Submit Config</PrimaryCardButton>)
      }
    </CardContentContainer>
  </CardContainer>
)

const mapState = (state: RootState) => ({
  colony: state.colony.colony
})
export const DeploymentCard = connect(mapState)(deploymentCard)
