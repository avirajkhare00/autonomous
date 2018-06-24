import { Component, default as React, FormEvent } from 'react'
import { Form } from 'semantic-ui-react'
import { TaskSubmission } from '../../../../models/Task'
import { CommonButtonForm } from './CommonButtonForm'

interface SubmitTaskConfigFormProps {
  submission: TaskSubmission

  onSubmit(configuration: string): void

  onCancel(): void
}

interface SubmitTaskConfigFormState {
}

export class SubmitTaskConfigForm extends Component<SubmitTaskConfigFormProps, SubmitTaskConfigFormState> {
  state = {
    configuration: this.props.submission.deploymentString
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    this.props.onSubmit(this.state.configuration)
  }

  render() {
    return (
      <Form onSubmit={e => this.handleSubmit(e)}>

        <Form.TextArea
          fluid
          label='Configuration (JSON Kubernetes Config)'
          value={this.state.configuration}
          onChange={event => this.setState({ configuration: event.currentTarget.value })}
        />

        <CommonButtonForm primaryButtonText={'Submit'} onCancel={this.props.onCancel}/>
      </Form>
    )
  }
}
