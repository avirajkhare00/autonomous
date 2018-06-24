import { default as React, SFC } from 'react'
import { Header, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { RootActions, RootState } from '../../../redux/store'
import { RouteProps } from 'react-router'
import glamorous from 'glamorous'

import { DeploymentList } from './DeploymentList'
import { Task } from '../../../models/Task'
import {
  createCloseCreateModalAction,
  createCloseDeployModalAction,
  createCloseSubmitModalAction,
  createCreateTaskAction,
  createFinalizeAction,
  createGetAllTasksAction,
  createOpenCreateModalAction,
  createOpenDeployModalAction,
  createOpenSubmitModalAction,
  createSubmitTaskConfigAction
} from '../../../redux/tasks/actions'
import { SubmitTaskModal } from './modals/SubmitTaskModal'
import { ConfigurationModalState, CreateModalState } from '../../../redux/tasks/reducer'
import { CreateTaskModal } from './modals/CreateTaskModal'
import { DeployTaskModal } from './modals/DeployTaskModal'
import { TransactionsList } from '../../../components/transactions/TransactionsList'
import { Transaction } from '../../../models/Transaction'
import { createDismissTransaction } from '../../../redux/transactions/actions'
import { PrimaryButton, SecondaryButton } from '../../../components/buttons/BaseButtons'

interface DashboardSceneProps {
  transactions: Transaction[]
  tasks: Task[]
  isLoadingTasks: boolean
  createModal: CreateModalState,
  submitModal: ConfigurationModalState,
  deployModal: ConfigurationModalState

  createTask(brief: string, workerAddress: string, evaluatorAddress: string): void

  submitConfig(taskId: number, deploymentString: string): void

  refreshTasks(): void

  finalizeTask(taskId: number): void

  openCreateModal(): void

  openSubmitModal(task: Task): void

  openDeployModal(task: Task): void

  closeCreateModal(): void

  closeSubmitModal(): void

  closeDeployModal(): void

  dismissTransaction(id: string): void
}

const InlineTextAndButtonContainer = glamorous.div({
  marginBottom: '25px!important',
  display: 'flex',
  flexDirection: 'row',
  marginRight: '42px!important'
})

const HeaderContainer = glamorous(Header)({
  margin: 'auto!important',
  marginRight: '20px!important'
})

const ButtonLeftContainer = glamorous.div({
  flex: 1
})

export const _dashboardScene: SFC<DashboardSceneProps & RouteProps> =
  ({ transactions, tasks, isLoadingTasks, createModal, submitModal, deployModal, createTask, submitConfig, refreshTasks, finalizeTask, openCreateModal, openSubmitModal, openDeployModal, closeCreateModal, closeSubmitModal, closeDeployModal, dismissTransaction }) => (
    <div>
      <CreateTaskModal
        state={createModal}
        onSubmit={(b, w, e) => createTask(b, w, e)}
        onCancel={() => closeCreateModal()}
      />

      <SubmitTaskModal
        state={submitModal}
        onSubmit={(id, config) => submitConfig(id, config)}
        onCancel={() => closeSubmitModal()}
      />

      <DeployTaskModal
        state={deployModal}
        onSubmit={(id) => finalizeTask(id)}
        onCancel={() => closeDeployModal()}
      />

      <TransactionsList transactions={transactions} dismiss={id => dismissTransaction(id)}/>

      <InlineTextAndButtonContainer>
        <HeaderContainer as={'h1'} style={{}}>Open deployment tasks</HeaderContainer>

        <ButtonLeftContainer onClick={() => refreshTasks()}>
          <SecondaryButton>
          <Icon name={'refresh'}/> Refresh deployments
          </SecondaryButton>
        </ButtonLeftContainer>

        <PrimaryButton onClick={() => openCreateModal()} primary>
          <Icon name={'plus circle'}/> Create new deployment
        </PrimaryButton>
      </InlineTextAndButtonContainer>

      <DeploymentList
        isLoading={isLoadingTasks}
        onSubmit={task => openSubmitModal(task)}
        onDeploy={task => openDeployModal(task)}
        tasks={tasks}
      />
    </div>
  )

const mapState = (state: RootState): Partial<DashboardSceneProps> => ({
  transactions: Array.from(state.transactions.transactions.values()),
  tasks: state.tasks.tasks,
  isLoadingTasks: state.tasks.isLoading,
  createModal: state.tasks.createModal,
  submitModal: state.tasks.submitModal,
  deployModal: state.tasks.deployModal
})

const mapDispatch = (dispatch: Dispatch<RootActions>) => ({
  createTask(brief: string, workerAddress: string, evaluatorAddress: string) {
    dispatch(createCreateTaskAction(
      {
        brief: brief
      },
      workerAddress,
      evaluatorAddress
    ))
  },
  submitConfig(taskId: number, deploymentString: string) {
    dispatch(createSubmitTaskConfigAction(taskId, {
      deploymentString: deploymentString
    }))
  },
  refreshTasks() {
    dispatch(createGetAllTasksAction())
  },
  finalizeTask(taskId: number) {
    dispatch(createFinalizeAction(taskId))
  },
  openCreateModal() {
    dispatch(createOpenCreateModalAction())
  },
  openSubmitModal(task: Task) {
    dispatch(createOpenSubmitModalAction(
      task.id,
      task.deliverable,
      undefined
    ))
  },
  openDeployModal(task: Task) {
    dispatch(createOpenDeployModalAction(
      task.id,
      task.deliverable,
      undefined
    ))
  },
  closeCreateModal() {
    dispatch(createCloseCreateModalAction())
  },
  closeSubmitModal() {
    dispatch(createCloseSubmitModalAction())
  },
  closeDeployModal() {
    dispatch(createCloseDeployModalAction())
  },
  dismissTransaction(id: string) {
    dispatch(createDismissTransaction(id))
  }
})

export const DashboardScene = connect(mapState, mapDispatch)(_dashboardScene)
