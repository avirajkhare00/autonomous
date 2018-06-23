import { Component, default as React, FormEvent } from 'react'
import { Form } from 'semantic-ui-react'
import { TaskSubmission } from '../../../../models/Task'

interface SubmitTaskConfigFormProps {
  submission: TaskSubmission

  onSubmit (): void
  onCancel (): void
}

export class DeployTaskForm extends Component<SubmitTaskConfigFormProps> {
  handleSubmit (event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    this.props.onSubmit()
  }

  render () {
    return (
      <Form onSubmit={e => this.handleSubmit(e)}>

        <Form.TextArea
          disabled
          fluid
          label='Configuration (JSON Kubernetes Config)'
          value={this.props.submission.deploymentString}
        />

        <Form.Button
          type={'button'}
          secondary
          onClick={() => this.props.onCancel()}
        >
          Cancel
        </Form.Button>

        <Form.Button primary>Submit</Form.Button>
      </Form>
    )
  }
}
