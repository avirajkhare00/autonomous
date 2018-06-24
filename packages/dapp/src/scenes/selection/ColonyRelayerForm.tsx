import { Component, default as React, FormEvent } from 'react'
import { Divider, Form } from 'semantic-ui-react'
import { InlineTextAndButtonContainer, InlineTextLeftContainer } from './ColonySelectScene'
import { PrimaryLoginButton, SecondaryLoginButton } from '../../components/buttons/LoginButtons'

interface ColonyRelayerFormProps {
  onSubmit(address: string): void

  onDelete(address: string): void
}

interface ColonyRelayerFormState {
  address: string
}

export class ColonyRelayerForm extends Component<ColonyRelayerFormProps, ColonyRelayerFormState> {
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
        <InlineTextAndButtonContainer>
          <InlineTextLeftContainer>
            <p>
              Registration will create you a namespace on the Kubernetes cluster and listen
              to completed tasks in the colony.
            </p>
          </InlineTextLeftContainer>
          <PrimaryLoginButton>Register Colony</PrimaryLoginButton>
        </InlineTextAndButtonContainer>
        <Divider/>
        <InlineTextAndButtonContainer>
          <InlineTextLeftContainer>
            <p>
              Cleaning a colony will call the Relayer to delete the colony's namepsace and listener (useful for testing)
            </p>
          </InlineTextLeftContainer>
          <SecondaryLoginButton
            onClick={() => this.props.onDelete(this.state.address)}
          >
            Clean Colony
          </SecondaryLoginButton>
        </InlineTextAndButtonContainer>
      </Form>
    )
  }
}
