import { default as React, SFC } from 'react'
import { Button, Icon, Table } from 'semantic-ui-react'

import { Task } from '../../../models/Task'

interface TaskListTableProps {
  task: Task

  finalize(): void
}

export const TaskRow: SFC<TaskListTableProps> = ({ task, finalize }) => (
  <Table.Row>
    <Table.Cell>{task.id}</Table.Cell>
    <Table.Cell>{task.specificationHash.substring(0, 8)}</Table.Cell>
    <Table.Cell>{task.specification.brief}</Table.Cell>
    <Table.Cell>{task.deliverableHash ? task.deliverableHash.substring(0, 8) : ''}</Table.Cell>
    <Table.Cell>{task.deliverable ? task.deliverable.deploymentString : ''}</Table.Cell>
    <Table.Cell>{task.finalized ? (<div><Icon color='green' name='checkmark' size='large' /></div>) : ''}</Table.Cell>
    <Table.Cell><Button onClick={() => finalize()}>Finalize</Button></Table.Cell>
  </Table.Row>
)
