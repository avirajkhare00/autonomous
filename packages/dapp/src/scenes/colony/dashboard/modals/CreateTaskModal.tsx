import { default as React, SFC } from 'react'
import { Message, Modal, Dimmer, Loader } from 'semantic-ui-react'
import { CreateModalState } from '../../../../redux/tasks/reducer'
import { CreateTaskForm } from './CreateTaskForm'

interface CreateTaskModalProps {
  state: CreateModalState
  onSubmit (brief: string, workerAddress: string, evaluatorAddress: string): void
  onCancel (): void
}

export const CreateTaskModal: SFC<CreateTaskModalProps> = ({ state, onSubmit, onCancel }) => (
  <Modal open={state.isVisible}>
    <Modal.Header content='Submit a configuration' />
    <Modal.Content>
      <Dimmer active={state.isLoading} inverted>
        <Loader size='small'>Creating task...</Loader>
      </Dimmer>

      {state.error ? (
          <Message error>
            <p>There was an error creating your task:</p>
            <p>
              {state.error.message}
            </p>
          </Message>
        )
        : null
      }

      <CreateTaskForm
        brief={state.brief}
        evaluatorAddress={state.evaluatorAddress}
        workerAddress={state.evaluatorAddress}
        onSubmit={(brief, worker, evaluator) => onSubmit(brief, worker, evaluator)}
        onCancel={() => onCancel()}
      />
    </Modal.Content>
  </Modal>
)
