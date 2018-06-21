import { Epic } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import uuid from 'uuid'

import { RootActions, RootState } from '../store'
import {
  createCreateTaskFailedAction,
  createCreateTaskSuccessAction,
  createGetAllTasksFailedAction,
  createGetTaskAction,
  createGetTaskFailedAction,
  createGetTaskSuccessAction,
  CreateTask,
  CreateTaskSuccess,
  GetAllTasks,
  GetTask,
  TaskActionTypes
} from './actions'
import { createTransactionInitiateAction } from '../transactions/actions'
import { Task } from '../../models/Task'

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
        .map(result => ({ description: result.content!.toString() }))

      return Observable.combineLatest(
        task$,
        specification$
      )
        .map(([networkTask, specification]) => ({
          id: networkTask.id,
          specificationHash: networkTask.specificationHash,
          specification: specification
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
        ipfsClient.files.add(
          new Buffer(action.specification)
        ))
        .map(files => files[0])
        .map(file => file.hash)
        // Continue here
        .do(cid => console.log('Uploaded to IPFS', cid))

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
          ({ taskId }) => createCreateTaskSuccessAction(taskId),
          err => createCreateTaskFailedAction(err)
        ))
        .do(uberact => console.log(uberact))
        .catch(err => Observable.of(createCreateTaskFailedAction(err)))
    })

const taskCreatedEpic: Epic<RootActions, RootState> =
  action$ => action$.ofType<CreateTaskSuccess>(TaskActionTypes.CreateSuccess)
    .map(action => createGetTaskAction(action.taskId))

export const TasksEpics = [
  getAllTasksEpic,
  getTaskEpic,
  createTaskEpic,
  taskCreatedEpic
]
