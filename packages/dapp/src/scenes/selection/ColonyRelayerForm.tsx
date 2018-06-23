import { default as React, Component, FormEvent } from 'react'
import { Form } from 'semantic-ui-react'

interface ColonyRelayerFormProps {
  onSubmit (address: string): void
  onDelete (address: string): void
}

interface ColonyRelayerFormState {
  address: string
}

export class ColonyRelayerForm extends Component<ColonyRelayerFormProps, ColonyRelayerFormState> {
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

        <p>
          Registration will create you a namespace on the Kubernetes cluster and listen
          to completed tasks in the colony.
        </p>

        <Form.Button primary>Register</Form.Button>

        <p>
          This will call the Relayer to delete the colony's namespace and listener.
          (Useful for testing!)
        </p>
        <Form.Button
          type={'button'}
          negative
          onClick={() => this.props.onDelete(this.state.address)}
        >
          Clean up Colony
        </Form.Button>
      </Form>
    )
  }
}
