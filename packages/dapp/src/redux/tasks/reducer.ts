import { TaskActions, TaskActionTypes } from './actions'
import { Task, TaskSubmission } from '../../models/Task'

export type ConfigurationModalState = {
  isLoading: boolean
  isVisible: boolean
  submission: TaskSubmission,
  taskId?: number,
  error?: Error
}

export type CreateModalState = {
  isLoading: boolean
  isVisible: boolean
  brief: string,
  managerAddress: string,
  workerAddress: string,
  evaluatorAddress: string
  error?: Error
}

export interface TasksState {
  createModal: CreateModalState,
  submitModal: ConfigurationModalState,
  deployModal: ConfigurationModalState,
  isLoading: boolean
  tasks: Task[]
}

const initialState: TasksState = {
  createModal: {
    isLoading: false,
    isVisible: false,
    brief: '',
    managerAddress: '',
    workerAddress: '',
    evaluatorAddress: '',
    error: undefined
  },
  submitModal: {
    taskId: undefined,
    isLoading: false,
    isVisible: false,
    submission: {
      deploymentString: ''
    },
    error: undefined
  },
  deployModal: {
    taskId: undefined,
    isLoading: false,
    isVisible: false,
    submission: {
      deploymentString: ''
    },
    error: undefined
  },
  isLoading: false,
  tasks: []
}

export function tasksReducer(state: TasksState = initialState, action: TaskActions): TasksState {
  switch (action.type) {
    case TaskActionTypes.Create: {
      return {
        ...state,
        createModal: {
          ...state.createModal,
          isLoading: true
        }
      }
    }

    case TaskActionTypes.CreateSuccess: {
      return {
        ...state,
        createModal: {
          ...state.createModal,
          isLoading: false,
          isVisible: false
        }
      }
    }

    case TaskActionTypes.CreateFailed: {
      return {
        ...state,
        createModal: {
          ...state.createModal,
          isLoading: false,
          isVisible: true,
          error: action.error
        }
      }
    }

    case TaskActionTypes.SubmitConfig: {
      return {
        ...state,
        submitModal: {
          ...state.submitModal,
          isLoading: true
        }
      }
    }

    case TaskActionTypes.SubmitConfigSuccess: {
      return {
        ...state,
        submitModal: {
          ...state.submitModal,
          isLoading: false,
          isVisible: false
        }
      }
    }

    case TaskActionTypes.SubmitConfigFailed: {
      return {
        ...state,
        submitModal: {
          ...state.submitModal,
          isLoading: false,
          isVisible: true,
          error: action.error
        }
      }
    }

    case TaskActionTypes.Finalize: {
      return {
        ...state,
        deployModal: {
          ...state.deployModal,
          isLoading: true
        }
      }
    }

    case TaskActionTypes.FinalizeSuccess: {
      return {
        ...state,
        deployModal: {
          ...state.deployModal,
          isLoading: false,
          isVisible: false
        }
      }
    }

    case TaskActionTypes.FinalizeFailed: {
      return {
        ...state,
        deployModal: {
          ...state.deployModal,
          isLoading: false,
          isVisible: true,
          error: action.error
        }
      }
    }

    case TaskActionTypes.GetAll: {
      return {
        ...state,
        isLoading: true,
        tasks: []
      }
    }

    case TaskActionTypes.GetSuccess: {
      let tasks = state.tasks.filter(t => t.id !== action.task.id)

      return {
        ...state,
        isLoading: false,
        tasks: [...tasks, action.task]
      }
    }

    case TaskActionTypes.OpenCreateModal: {
      return {
        ...state,
        createModal: {
          ...state.createModal,
          isVisible: true,
          error: undefined
        }
      }
    }

    case TaskActionTypes.OpenSubmitModal: {
      return {
        ...state,
        submitModal: {
          ...state.submitModal,
          isVisible: true,
          taskId: action.taskId,
          error: undefined
        }
      }
    }

    case TaskActionTypes.OpenDeployModal: {
      return {
        ...state,
        deployModal: {
          ...state.deployModal,
          isVisible: true,
          taskId: action.taskId,
          error: undefined
        }
      }
    }

    case TaskActionTypes.CloseCreateModal: {
      return {
        ...state,
        createModal: {
          ...state.createModal,
          isVisible: false
        }
      }
    }

    case TaskActionTypes.CloseSubmitModal: {
      return {
        ...state,
        submitModal: {
          ...state.submitModal,
          isVisible: false
        }
      }
    }

    case TaskActionTypes.CloseDeployModal: {
      return {
        ...state,
        deployModal: {
          ...state.deployModal,
          isVisible: false
        }
      }
    }

    default: {
      return state
    }
  }
}
