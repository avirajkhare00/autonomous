import { TaskActions, TaskActionTypes } from './actions'
import { Task } from '../../models/Task'

export interface TasksState {
  isCreateTaskLoading: boolean,
  isCreateTaskModalVisible: boolean
  tasks: Task[]
}

const initialState: TasksState = {
  isCreateTaskLoading: false,
  isCreateTaskModalVisible: false,
  tasks: []
}

export function tasksReducer (state: TasksState = initialState, action: TaskActions): TasksState {
  switch (action.type) {
    case TaskActionTypes.Create: {
      return {
        ...state,
        isCreateTaskLoading: true
      }
    }

    case TaskActionTypes.CreateSuccess: {
      return {
        ...state,
        isCreateTaskLoading: false,
        isCreateTaskModalVisible: false
      }
    }

    case TaskActionTypes.CreateFailed: {
      return {
        ...state,
        isCreateTaskLoading: false
      }
    }

    case TaskActionTypes.GetSuccess: {
      let tasks = state.tasks.filter(t => t.id !== action.task.id)

      return {
        ...state,
        tasks: [...tasks, action.task]
      }
    }

    default: {
      return state
    }
  }
}