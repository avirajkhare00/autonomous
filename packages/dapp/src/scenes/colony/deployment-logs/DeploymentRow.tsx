import { default as React, SFC } from 'react'
import { DeploymentEvent, StreamEvent } from '../../../models/DeploymentLog'

interface TaskListTableProps {
  deployment: string
  events: StreamEvent<DeploymentEvent>[]
}

export const DeploymentRow: SFC<TaskListTableProps> = ({ deployment, events }) => (
  <tr>
    <td>{deployment}</td>
    <td>
      <ul>
        {
          events.map((e, i) =>
            <li key={i}>
              {JSON.stringify(e.object.status)}
            </li>
          )}
      </ul>
    </td>
  </tr>
)
