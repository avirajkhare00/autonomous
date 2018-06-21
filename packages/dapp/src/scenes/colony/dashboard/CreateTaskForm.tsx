import { Component, default as React, FormEvent } from 'react'
import { Form } from 'semantic-ui-react'

interface CreateTaskFormProps {
  onSubmit(brief: string): void
}

interface CreateTaskFormState {
  brief: string
}

export class CreateTaskColonyForm extends Component<CreateTaskFormProps, CreateTaskFormState> {
  state = {
    brief: ''
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    this.props.onSubmit(this.state.brief)
  }

  render() {
    return (
      <Form onSubmit={e => this.handleSubmit(e)}>
        <Form.TextArea
          label='Task Brief'
          placeholder='Specification goes here'
          onChange={event => this.setState({ brief: event.currentTarget.value })}
        />

        <Form.Button primary>Submit Task</Form.Button>
      </Form>
    )
  }
}
