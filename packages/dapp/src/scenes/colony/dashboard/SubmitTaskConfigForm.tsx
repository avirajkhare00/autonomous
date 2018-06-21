import { Component, default as React, FormEvent } from 'react'
import { Form } from 'semantic-ui-react'
import { Task } from '../../../models/Task'

interface SubmitTaskConfigFormProps {
  tasks: Task[]

  onSubmit(taskId: number, configUrl: string): void
}

interface SubmitTaskConfigFormState {
  taskId: number
  configUrl: string
}

export class SubmitTaskConfigForm extends Component<SubmitTaskConfigFormProps, SubmitTaskConfigFormState> {
  state = {
    taskId: 0,
    configUrl: ''
  }

  taskIdOptions() {
    if (this.props.tasks.length > 0 && this.state.taskId === 0) {
      this.setState({ taskId: this.props.tasks[0].id })
    }
    return this.props.tasks.map(t => {
      return { value: t.id, text: t.id.toString() }
    })
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    this.props.onSubmit(this.state.taskId, this.state.configUrl)
    this.setState({ taskId: 0, configUrl: '' })
  }

  render() {
    return (
      <Form onSubmit={e => this.handleSubmit(e)}>
        <Form.Select
          value={this.state.taskId}
          options={this.taskIdOptions()}
          label='Task Id'
          onChange={(_, data) => this.setState({ taskId: data.value as number })}
        />
        <Form.Input
          fluid
          label='Config Url'
          placeholder='https://github.com/...'
          value={this.state.configUrl}
          onChange={event => this.setState({ configUrl: event.currentTarget.value })}
        />

        <Form.Button primary>Submit Config</Form.Button>
      </Form>
    )
  }
}
