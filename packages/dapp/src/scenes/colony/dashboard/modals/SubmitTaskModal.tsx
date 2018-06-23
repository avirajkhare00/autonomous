import { default as React, SFC } from 'react'
import { Message, Modal, Dimmer, Loader } from 'semantic-ui-react'
import { SubmitTaskConfigForm } from './SubmitTaskConfigForm'
import { ConfigurationModalState } from '../../../../redux/tasks/reducer'

interface SubmitTaskModalProps {
  state: ConfigurationModalState
  onSubmit (taskId: number, configuration: string): void
  onCancel (): void
}

export const SubmitTaskModal: SFC<SubmitTaskModalProps> = ({ state, onSubmit, onCancel }) => (
  <Modal open={state.isVisible}>
    <Modal.Header content={`Task ${state.taskId}`} />
    <Modal.Header content='Submit a configuration' />
    <Modal.Content>
      <Dimmer active={state.isLoading} inverted>
        <Loader size='small'>Submitting task...</Loader>
      </Dimmer>

      {state.error ? (
          <Message error>
            <p>There was an error sumbmitting your task:</p>
            <p>
              {state.error.message}
            </p>
          </Message>
        )
        : null
      }

      {state.taskId
        ? <SubmitTaskConfigForm
          onSubmit={config => onSubmit(state.taskId!, config)}
          submission={state.submission}
          onCancel={() => onCancel()}
        />
        : null
      }
    </Modal.Content>
  </Modal>
)
