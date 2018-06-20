import { Action } from 'redux'
import { Task } from '../../models/Task'

export enum TaskActionTypes {
  GetAll = '[Task] Tasks Get All',
  GetAllFailed = '[Task] Tasks Get All Failed',
  Get = '[Task] Task Get',
  GetSuccess = '[Task] Task Get Success',
  GetFailed = '[Task] Task Get Failed',
  Create = '[Task] Task Create',
  CreateSuccess = '[Task] Task Create Success',
  CreateFailed = '[Task] Task Create Failed'
}

export interface GetAllTasks extends Action {
  type: TaskActionTypes.GetAll
}

export interface GetAllTasksFailed extends Action {
  type: TaskActionTypes.GetAllFailed
  error: Error
}

export interface GetTask extends Action {
  type: TaskActionTypes.Get
  id: number
}

export interface GetTaskSuccess extends Action {
  type: TaskActionTypes.GetSuccess
  task: Task
}

export interface GetTaskFailed extends Action {
  type: TaskActionTypes.GetFailed
  error: Error
}

export interface CreateTask extends Action {
  type: TaskActionTypes.Create
  specification: Object
}

export interface CreateTaskSuccess extends Action {
  type: TaskActionTypes.CreateSuccess
  taskId: number

}

export interface CreateTaskFailed extends Action {
  type: TaskActionTypes.CreateFailed
  error: Error
}

export function createGetAllTasksAction (): GetAllTasks {
  return { type: TaskActionTypes.GetAll }
}

export function createGetAllTasksFailedAction (error: Error): GetAllTasksFailed {
  return { type: TaskActionTypes.GetAllFailed, error }
}

export function createGetTaskAction (id: number): GetTask {
  return { type: TaskActionTypes.Get, id }
}

export function createGetTaskSuccessAction (task: Task): GetTaskSuccess {
  return { type: TaskActionTypes.GetSuccess, task }
}

export function createGetTaskFailedAction (error: Error): GetTaskFailed {
  return { type: TaskActionTypes.GetFailed, error }
}

export function createCreateTaskAction (specification: Object): CreateTask {
  return { type: TaskActionTypes.Create, specification }
}

export function createCreateTaskSuccessAction (taskId: number): CreateTaskSuccess {
  return { type: TaskActionTypes.CreateSuccess, taskId }
}

export function createCreateTaskFailedAction (error: Error): CreateTaskFailed {
  return { type: TaskActionTypes.CreateFailed, error }
}

export type TaskActions =
  | GetAllTasks
  | GetAllTasksFailed
  | GetTask
  | GetTaskSuccess
  | GetTaskFailed
  | CreateTask
  | CreateTaskSuccess
  | CreateTaskFailed
