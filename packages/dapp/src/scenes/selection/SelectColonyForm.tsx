import { default as React, Component, FormEvent } from 'react'
import { Form } from 'semantic-ui-react'

interface SelectColonyFormProps {
  onSubmit (address: string): void
}

interface SelectColonyFormState {
  address: string
}

export class SelectColonyForm extends Component<SelectColonyFormProps, SelectColonyFormState> {
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

        <Form.Button primary>Select Colony</Form.Button>
      </Form>
    )
  }
}
