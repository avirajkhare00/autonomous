import { default as React, Component, FormEvent } from 'react'
import { Form } from 'semantic-ui-react'

interface SelectColonyFormProps {
  buttonText: string
  onSubmit (address: string): void
}

interface EnterColonyFormState {
  address: string
}

export class EnterColonyForm extends Component<SelectColonyFormProps, EnterColonyFormState> {
  state = {
    address: ''
  }

  handleSubmit (event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    this.props.onSubmit(this.state.address)
  }

  render () {
    return (
      <Form onSubmit={e => this.handleSubmit(e)}>
        <Form.Input
          fluid
          label='Address'
          placeholder='0x...'
          onChange={event => this.setState({ address: event.currentTarget.value })}
        />

        <Form.Button primary>{this.props.buttonText}</Form.Button>
      </Form>
    )
  }
}
