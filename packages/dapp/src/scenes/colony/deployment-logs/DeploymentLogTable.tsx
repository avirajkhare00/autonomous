import { default as React, SFC } from 'react'
import { DeploymentLog } from '../../../models/DeploymentLog'
import { DeploymentRow } from './DeploymentRow'
import { Table } from 'semantic-ui-react'

interface DeploymentLogTableProps {
  log: DeploymentLog
}

export const DeploymentLogTable: SFC<DeploymentLogTableProps> = ({ log }) => (
  <Table>
    <Table.Header>
    <Table.Row>
      <Table.HeaderCell>Deployment Name</Table.HeaderCell>
      <Table.HeaderCell>Events</Table.HeaderCell>
    </Table.Row>
    </Table.Header>
    <Table.Body>
    {
      Object.entries(log).map((kvp, i) =>
        <DeploymentRow
          key={i}
          deployment={kvp[0]}
          events={kvp[1]}
        />
      )}
    </Table.Body>
  </Table>
)
