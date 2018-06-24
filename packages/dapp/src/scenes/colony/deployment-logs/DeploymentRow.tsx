import { default as React, SFC } from 'react'
import { DeploymentEvent, StreamEvent } from '../../../models/DeploymentLog'
import { Table } from 'semantic-ui-react'

interface TaskListTableProps {
  deployment: string
  events: StreamEvent<DeploymentEvent>[]
}

export const DeploymentRow: SFC<TaskListTableProps> = ({ deployment, events }) => (
  <Table.Row>
    <Table.Cell>{deployment}</Table.Cell>
    <Table.Cell>
      <ul>
        {
          events.map((e, i) =>
            <li key={i}>
              {JSON.stringify(e.object.status)}
            </li>
          )}
      </ul>
    </Table.Cell>
  </Table.Row>
)
