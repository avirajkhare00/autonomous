import { Component, default as React, FormEvent } from 'react'
import { Form } from 'semantic-ui-react'

interface CreateTaskFormProps {
  onSubmit (brief: string, workerAddress: string, evaluatorAddress: string): void
}

interface CreateTaskFormState {
  brief: string
  workerAddress: string
  evaluatorAddress: string
}

export class CreateTaskForm extends Component<CreateTaskFormProps, CreateTaskFormState> {
  state = {
    brief: '',
    workerAddress: '',
    evaluatorAddress: ''
  }

  handleSubmit (event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    this.props.onSubmit(
      this.state.brief,
      this.state.workerAddress,
      this.state.evaluatorAddress
    )
    this.setState({ brief: '' })
  }

  render () {
    return (
      <Form onSubmit={e => this.handleSubmit(e)}>
        <Form.TextArea
          label='Task Brief'
          placeholder='Description...'
          value={this.state.brief}
          onChange={event => this.setState({ brief: event.currentTarget.value })}
        />

        <Form.Input
          type={'text'}
          label='Worker Address'
          placeholder='0x...'
          value={this.state.workerAddress}
          onChange={event => this.setState({ workerAddress: event.currentTarget.value })}
        />

        <Form.Input
          type={'text'}
          label='Evaluator Address'
          placeholder='0x...'
          value={this.state.evaluatorAddress}
          onChange={event => this.setState({ evaluatorAddress: event.currentTarget.value })}
        />

        <Form.Button primary>Create Task</Form.Button>
      </Form>
    )
  }
}
