import { default as React, SFC } from 'react'
import { TaskRow } from './TaskRow'
import { Task } from '../../../models/Task'

interface TaskListTableProps {
  tasks: Task[]
}

export const TaskListTable: SFC<TaskListTableProps> = ({ tasks }) => (
  <div>
    {tasks.length > 0
      ? (
        <table>
          <thead>
          <tr>
            <td>TaskId</td>
            <td>SpecificationHash</td>
            <td>Specification</td>
          </tr>
          </thead>
          <tbody>
          {tasks.map((task, i) => <TaskRow task={task} key={i}/>)}
          </tbody>
        </table>
      )
      : <span>No tasks in Colony</span>
    }
  </div>
)
