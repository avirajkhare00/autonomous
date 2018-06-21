import { Component, default as React, FormEvent } from 'react'
import { Form } from 'semantic-ui-react'

interface CreateTaskFormProps {
  onSubmit(brief: string): void
}

interface CreateTaskFormState {
  brief: string
}

export class CreateTaskForm extends Component<CreateTaskFormProps, CreateTaskFormState> {
  state = {
    brief: ''
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    this.props.onSubmit(this.state.brief)
    this.setState({ brief: '' })
  }

  render() {
    return (
      <Form onSubmit={e => this.handleSubmit(e)}>
        <Form.TextArea
          label='Task Brief'
          placeholder='Specification goes here'
          value={this.state.brief}
          onChange={event => this.setState({ brief: event.currentTarget.value })}
        />

        <Form.Button primary>Create Task</Form.Button>
      </Form>
    )
  }
}
