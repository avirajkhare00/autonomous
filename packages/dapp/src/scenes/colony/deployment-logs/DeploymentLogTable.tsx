import { default as React, SFC } from 'react'
import { DeploymentLog } from '../../../models/DeploymentLog'
import { DeploymentRow } from './DeploymentRow'

interface DeploymentLogTableProps {
  log: DeploymentLog
}

export const DeploymentLogTable: SFC<DeploymentLogTableProps> = ({ log }) => (
  <table>
    <thead>
    <tr>
      <td>Deployment Name</td>
      <td>Events</td>
    </tr>
    </thead>
    <tbody>
    {
      Object.entries(log).map((kvp, i) =>
        <DeploymentRow
          key={i}
          deployment={kvp[0]}
          events={kvp[1]}
        />
      )}
    </tbody>
  </table>
)
