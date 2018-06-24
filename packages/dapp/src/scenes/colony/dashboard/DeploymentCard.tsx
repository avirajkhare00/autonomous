import { default as React, SFC } from 'react'
import { Card } from 'semantic-ui-react'
import Jazzicon from 'react-jazzicon'
import glamorous from 'glamorous'

import { Task } from '../../../models/Task'
import { RootState } from '../../../redux/store'
import { Colony } from '../../../models/Colony'
import { connect } from 'react-redux'
import { PrimaryCardButton } from '../../../components/buttons/CardButtons'
import { CardStatusBackgroundColor, CardStatusColor } from '../../../components/colors/BaseColors'

interface TaskListTableProps {
  task: Task
  colony: Colony

  onSubmit(): void

  onDeploy(): void
}

const CardContainer = glamorous(Card)({
  height: '380px!important',
  margin: '13px!important'
})

const CardContentContainer = glamorous(Card.Content)({
  borderTop: 'none!important',
  border: 'none!important'
})

const CommonCardContentContainer = glamorous(CardContentContainer)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

const StatusContainer = glamorous.div({
  backgroundColor: CardStatusBackgroundColor,
  color: CardStatusColor,
  borderRadius: 99,
  fontSize: 12,
  padding: '4px 8px'
})

const HeaderCenter = glamorous(CommonCardContentContainer)({
  margin: '10px!important'
})

const IconCenter = glamorous(HeaderCenter)({
  marginTop: '30px!important'
})

const DescriptionCardContentContainer = glamorous(CardContentContainer)({
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
  height: '170px!important',
  minHeight: '170px!important',
  maxHeight: '170px!important',
  paddingTop: '10px!important'
})

const ButtonCardContentContainer = glamorous(CommonCardContentContainer)({
  marginBottom: '10px!important'
})

export const deploymentCard: SFC<TaskListTableProps> = ({ task, colony, onSubmit, onDeploy }) => (
  <CardContainer>
    <IconCenter>
      <Jazzicon diameter={50} seed={task.id + parseInt(colony.address.substring(0, 8), 16)}/>
    </IconCenter>
    <CommonCardContentContainer>
      <Card.Header>Task #{task.id}</Card.Header>
    </CommonCardContentContainer>
    <CommonCardContentContainer>
      {task.deliverableHash
        ? (<StatusContainer>Status: In Review</StatusContainer>)
        : (<StatusContainer>Status: In Progress</StatusContainer>)
      }
    </CommonCardContentContainer>
    <DescriptionCardContentContainer>
      <Card.Description>{task.specification.brief}</Card.Description>
    </DescriptionCardContentContainer>
    <ButtonCardContentContainer>
      {task.deliverableHash
        ? (<PrimaryCardButton onClick={() => onDeploy()}>Deploy</PrimaryCardButton>)
        : (<PrimaryCardButton onClick={() => onSubmit()}>Submit Config</PrimaryCardButton>)
      }
    </ButtonCardContentContainer>
  </CardContainer>
)

const mapState = (state: RootState) => ({
  colony: state.colony.colony
})
export const DeploymentCard = connect(mapState)(deploymentCard)
