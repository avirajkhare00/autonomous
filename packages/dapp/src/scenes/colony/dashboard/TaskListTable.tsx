import { default as React, SFC } from 'react'
import { TaskRow } from './TaskRow'
import { Task } from '../../../models/Task'

interface TaskListTableProps {
  tasks: Task[]
  onFinalize(id: number): void
}

export const TaskListTable: SFC<TaskListTableProps> = ({ tasks, onFinalize }) => (
  <div>
    {tasks.length > 0
      ? (
        <table>
          <thead>
          <tr>
            <td>TaskId</td>
            <td>BriefHash</td>
            <td>Brief</td>
            <td>ConfigHash</td>
            <td>Config</td>
            <td>Finalized</td>
            <td>Actions</td>
          </tr>
          </thead>
          <tbody>
          {tasks.map((task, i) => <TaskRow task={task} key={i} finalize={() => onFinalize(task.id)}/>)}
          </tbody>
        </table>
      )
      : <span>No tasks in Colony</span>
    }
  </div>
)
