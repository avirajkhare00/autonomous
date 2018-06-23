import { Epic } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import uuid from 'uuid'

import { RootActions, RootState } from '../store'
import {
  createCreateTaskFailedAction,
  createCreateTaskSuccessAction,
  createFinalizeFailedAction,
  createFinalizeSuccessAction,
  createGetAllTasksFailedAction,
  createGetTaskAction,
  createGetTaskFailedAction,
  createGetTaskSuccessAction,
  createSubmitTaskConfigFailedAction,
  createSubmitTaskConfigSuccessAction,
  CreateTask,
  CreateTaskSuccess,
  Finalize,
  FinalizeSuccess,
  GetAllTasks,
  GetTask,
  SubmitTaskConfig,
  SubmitTaskConfigSuccess,
  TaskActionTypes
} from './actions'
import { createTransactionInitiateAction } from '../transactions/actions'
import { Role, Task } from '../../models/Task'
import {
  deserializeSpecification,
  serializeSpecification,
  serializeSubmission
} from '../../lib/SpecificationSerializer'

const getAllTasksEpic: Epic<RootActions, RootState> =
  (action$, store$) => action$.ofType<GetAllTasks>(TaskActionTypes.GetAll)
    .mergeMap(_ => {
      let colony = store$.getState().colony.colonyClient

      if (!colony) {
        return Observable.of(createGetAllTasksFailedAction(new Error('Network clients not initialised')))
      }

      let taskActions$ = Observable.fromPromise(colony.getTaskCount.call())
        .map(result => Array(result.count).fill(0).map(
          (_, i) => createGetTaskAction(i + 1)
          )
        )

      return Observable.combineLatest(
        taskActions$
      )
        .flatMap(([taskActions]) => [
          ...taskActions
        ])
        .catch(err => Observable.of(createGetTaskFailedAction(err)))
    })

const getTaskEpic: Epic<RootActions, RootState> =
  (action$, store$) => action$.ofType<GetTask>(TaskActionTypes.Get)
    .mergeMap(action => {
      let ipfsClient = store$.getState().core.ipfsClient
      let colony = store$.getState().colony.colonyClient

      if (!ipfsClient || !colony) {
        return Observable.of(createGetTaskFailedAction(new Error('Network clients not initialised')))
      }

      let task$ = Observable.fromPromise(colony.getTask.call({ taskId: action.id }))

      let specification$ = task$
      // .flatMap(task => ipfsClient!.dag.get(task.specificationHash) // TODO Replace this with DAG implementation
      // .map(result => result.value)
      // .map(result => JSON.parse(result.content!.toString()))
        .flatMap(task => ipfsClient!.files.get(task.specificationHash.toString())
          .catch(err => {
            console.log('Failed to get file from IPFS', err)
            throw err
          })
        )
        .map(files => files[0])
        .map(result => deserializeSpecification(result.content! as Buffer))

      // let deliverable$ = task$
      // // .flatMap(task => ipfsClient!.dag.get(task.specificationHash) // TODO Replace this with DAG implementation
      // // .map(result => result.value)
      // // .map(result => JSON.parse(result.content!.toString()))
      //   .flatMap(task => ipfsClient!.files.get(task.deliverableHash!.toString())
      //     .catch(err => {
      //       console.log('Failed to get file from IPFS', err)
      //       throw err
      //     })
      //   )
      //   .map(files => files[0])
      //   .map(result => ({ description: result.content!.toString() }))

      let managerAddress$ = Observable.fromPromise(colony.getTaskRole.call({ taskId: action.id, role: Role.MANAGER }))
      let workerAddress$ = Observable.fromPromise(colony.getTaskRole.call({ taskId: action.id, role: Role.WORKER }))
      let evaluatorAddress$ = Observable.fromPromise(colony.getTaskRole.call({
        taskId: action.id,
        role: Role.EVALUATOR
      }))

      return Observable.combineLatest(
        task$,
        specification$,
        managerAddress$,
        workerAddress$,
        evaluatorAddress$
      )
        .map(([networkTask, specification, managerAddress, workerAddress, evaluatorAddress]) => ({
          id: networkTask.id,
          specificationHash: networkTask.specificationHash,
          specification: specification,
          deliverableHash: networkTask.deliverableHash,
          finalized: networkTask.finalized,
          manager: managerAddress,
          worker: workerAddress,
          evaluator: evaluatorAddress
        }) as Task)
        .map(task => createGetTaskSuccessAction(task))
        .catch(err => Observable.of(createGetTaskFailedAction(err)))
    })

const createTaskEpic: Epic<RootActions, RootState> =
  (action$, store$) => action$.ofType<CreateTask>(TaskActionTypes.Create)
    .mergeMap(action => {
      let ipfsClient = store$.getState().core.ipfsClient
      let colony = store$.getState().colony.colonyClient

      if (!ipfsClient || !colony) {
        return Observable.of(createCreateTaskFailedAction(new Error('Network clients not initialised')))
      }

      console.log('Uploading task brief to IPFS:', action.specification)
      let upload$ = Observable.fromPromise(
        // TODO Replace with CID with DAG API
        // ipfsClient.dag.put(
        //   action.specification,
        //   {
        //     format: 'dag-cbor',
        //     hashAlg: 'sha3-512'
        //   }))
        // .map(cid => cid.toBaseEncodedString())
        ipfsClient.files.add(serializeSpecification(action.specification))
      )
        .map(files => files[0])
        .map(file => file.hash)
        // Continue here
        .do(cid => console.log('Uploaded to IPFS:', cid))

      return upload$
        .map(cid => () => colony!.createTask.send(
          { specificationHash: cid },
          { waitForMining: false }
        ))
        .do(init => console.log(init))
        .map(initiator => createTransactionInitiateAction(
          uuid.v4(),
          'Creating task',
          initiator,
          ({ taskId }) => createTransactionInitiateAction(
            uuid.v4(),
            'Assigning Worker Role',
            () => colony!.setTaskRoleUser.send({
              taskId,
              role: Role.WORKER,
              user: action.workerAddress
            }, { waitForMining: false }),
            () => createTransactionInitiateAction(
              uuid.v4(),
              'Assigning Evaluator Role',
              () => colony!.setTaskRoleUser.send({
                taskId,
                role: Role.EVALUATOR,
                user: action.evaluatorAddress
              }, { waitForMining: false }),
              () => createCreateTaskSuccessAction(taskId),
              err => createCreateTaskFailedAction(err)
            ),
            err => createCreateTaskFailedAction(err)
          ),
          err => createCreateTaskFailedAction(err)
        ))
        .do(uberact => console.log(uberact))
        .catch(err => Observable.of(createCreateTaskFailedAction(err)))
    })

const submitTaskConfigEpic: Epic<RootActions, RootState> =
  (action$, store$) => action$.ofType<SubmitTaskConfig>(TaskActionTypes.SubmitConfig)
    .mergeMap(action => {
      let ipfsClient = store$.getState().core.ipfsClient
      let colony = store$.getState().colony.colonyClient

      if (!ipfsClient || !colony) {
        return Observable.of(createSubmitTaskConfigFailedAction(new Error('Network clients not initialised')))
      }

      console.log('Uploading task config to IPFS:', JSON.stringify(action.submission))
      let upload$ = Observable.fromPromise(
        // TODO Replace with CID with DAG API
        // ipfsClient.dag.put(
        //   action.specification,
        //   {
        //     format: 'dag-cbor',
        //     hashAlg: 'sha3-512'
        //   }))
        // .map(did => did.toBaseEncodedString())
        ipfsClient.files.add(serializeSubmission(action.submission))
      )
        .map(files => files[0])
        .map(file => file.hash)
        // Continue here
        .do(cid => console.log('Uploaded to IPFS', cid))

      return upload$
        .map(cid => () => colony!.submitTaskDeliverable.send(
          { taskId: action.taskId, deliverableHash: cid },
          { waitForMining: false }
        ))
        .do(init => console.log(init))
        .map(initiator => createTransactionInitiateAction(
          uuid.v4(),
          'Submitting task deliverable',
          initiator,
          () => createSubmitTaskConfigSuccessAction(action.taskId),
          err => createSubmitTaskConfigFailedAction(err)
        ))
        .do(uberact => console.log(uberact))
        .catch(err => Observable.of(createCreateTaskFailedAction(err)))
    })

const finalizeTaskEpic: Epic<RootActions, RootState> =
  (action$, store$) => action$.ofType<Finalize>(TaskActionTypes.Finalize)
    .map(action => {
      let ipfsClient = store$.getState().core.ipfsClient
      let colony = store$.getState().colony.colonyClient

      if (!ipfsClient || !colony) {
        return createFinalizeFailedAction(action.taskId, new Error('Network clients not initialised'))
      }
      return createTransactionInitiateAction(
        uuid.v4(),
        'Finalizing task',
        () => colony!.finalizeTask.send(
          { taskId: action.taskId },
          { waitForMining: false }
        ),
        () => createFinalizeSuccessAction(action.taskId),
        err => createFinalizeFailedAction(action.taskId, err)
      )
    })

const taskChangedEpic: Epic<RootActions, RootState> =
  action$ => action$.ofType<CreateTaskSuccess | SubmitTaskConfigSuccess | FinalizeSuccess>(
    TaskActionTypes.CreateSuccess, TaskActionTypes.SubmitConfigSuccess, TaskActionTypes.FinalizeSuccess
  )
    .map(action => createGetTaskAction(action.taskId))

export const TasksEpics = [
  getAllTasksEpic,
  getTaskEpic,
  createTaskEpic,
  submitTaskConfigEpic,
  taskChangedEpic,
  finalizeTaskEpic
]
