import { default as React, SFC } from 'react'
import { Dimmer, Loader, Message, Modal } from 'semantic-ui-react'

import { ConfigurationModalState } from '../../../../redux/tasks/reducer'
import { DeployTaskForm } from './DeployTaskForm'

interface DeployTaskModalProps {
  state: ConfigurationModalState
  onSubmit (taskId: number): void
  onCancel (): void
}

export const DeployTaskModal: SFC<DeployTaskModalProps> = ({ state, onSubmit, onCancel }) => (
  <Modal open={state.isVisible}>
    <Modal.Header content={`Task ${state.taskId} - Deploy configuration`} />
    <Modal.Content>
      <Dimmer active={state.isLoading} inverted>
        <Loader size='small'>Deploying task...</Loader>
      </Dimmer>

      {state.error ? (
          <Message error>
            <p>There was an error deploying your task:</p>
            <p>
              {state.error.message}
            </p>
          </Message>
        )
        : null
      }

      {state.taskId
        ? <DeployTaskForm
          onSubmit={() => onSubmit(state.taskId!)}
          submission={state.submission}
          onCancel={() => onCancel()}
        />
        : null
      }
    </Modal.Content>
  </Modal>
)
