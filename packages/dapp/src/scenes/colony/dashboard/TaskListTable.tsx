import { default as React, SFC } from 'react'
import { Table } from 'semantic-ui-react'
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
        <Table>
          <Table.Header>
          <Table.Row>
            <Table.HeaderCell>TaskId</Table.HeaderCell>
            <Table.HeaderCell>BriefHash</Table.HeaderCell>
            <Table.HeaderCell>Brief</Table.HeaderCell>
            <Table.HeaderCell>ConfigHash</Table.HeaderCell>
            <Table.HeaderCell>Config</Table.HeaderCell>
            <Table.HeaderCell>Finalized</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
          </Table.Header>
          <Table.Body>
          {tasks.map((task, i) => <TaskRow task={task} key={i} finalize={() => onFinalize(task.id)}/>)}
          </Table.Body>
        </Table>
      )
      : <span>No tasks in Colony</span>
    }
  </div>
)
