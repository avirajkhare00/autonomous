import { default as React, SFC } from 'react'
import { Task } from '../../../models/Task'

interface TaskListTableProps {
  task: Task
}

export const TaskRow: SFC<TaskListTableProps> = ({ task }) => (
  <tr>
    <td>{task.id}</td>
    <td>{task.specificationHash}</td>
    <td>{task.specification.description}</td>
    <td>{task.deliverableHash}</td>
    {/*<td>{task.deliverable!.description}</td>*/}
  </tr>
)
