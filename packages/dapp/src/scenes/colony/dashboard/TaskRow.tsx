import { default as React, SFC } from 'react'
import { Button } from 'semantic-ui-react'

import { Task } from '../../../models/Task'

interface TaskListTableProps {
  task: Task
  finalize (): void
}

export const TaskRow: SFC<TaskListTableProps> = ({ task, finalize }) => (
  <tr>
    <td>{task.id}</td>
    <td>{task.specificationHash}</td>
    <td>{task.specification.brief}</td>
    <td>{task.deliverableHash}</td>
    <td>{task.finalized ? 'Yes' : 'No'}</td>
    <td><Button onClick={() => finalize()}>Finalize</Button></td>
    {/*<td>{task.deliverable!.description}</td>*/}
  </tr>
)
