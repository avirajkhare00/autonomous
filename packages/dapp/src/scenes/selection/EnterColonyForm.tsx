import { Component, default as React, FormEvent } from 'react'
import { Form } from 'semantic-ui-react'
import glamorous from 'glamorous'
import { PrimaryMenuButton } from '../../components/buttons/BaseButtons'

interface SelectColonyFormProps {
  buttonText: string

  onSubmit(address: string): void
}

interface EnterColonyFormState {
  address: string
}

const ButtonContainer = glamorous.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

export class EnterColonyForm extends Component<SelectColonyFormProps, EnterColonyFormState> {
  state = {
    address: ''
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    this.props.onSubmit(this.state.address)
  }

  render() {
    return (
      <Form onSubmit={e => this.handleSubmit(e)}>
        <Form.Input
          fluid
          label='Address'
          placeholder='0x...'
          onChange={event => this.setState({ address: event.currentTarget.value })}
        />

        <ButtonContainer>
          <PrimaryMenuButton>{this.props.buttonText}</PrimaryMenuButton>
        </ButtonContainer>
      </Form>
    )
  }
}
