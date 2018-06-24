import { Component, default as React, FormEvent } from 'react'
import { Form } from 'semantic-ui-react'
import { TaskSubmission } from '../../../../models/Task'
import { CommonButtonForm } from './CommonButtonForm'

interface SubmitTaskConfigFormProps {
  submission: TaskSubmission

  onSubmit(): void

  onCancel(): void
}

export class DeployTaskForm extends Component<SubmitTaskConfigFormProps> {
  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    this.props.onSubmit()
  }

  render() {
    return (
      <Form onSubmit={e => this.handleSubmit(e)}>

        {this.props.submission.deploymentString
          ? <Form.TextArea
            disabled
            fluid
            label='Configuration (JSON Kubernetes Config)'
            value={this.props.submission.deploymentString}
          />
          : null
        }

        <CommonButtonForm primaryButtonText={'Submit'} onCancel={this.props.onCancel}/>
      </Form>
    )
  }
}
