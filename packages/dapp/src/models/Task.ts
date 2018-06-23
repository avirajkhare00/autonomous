import { TaskRoleResult } from '@colony/colony-js-client'

export interface Task {
  id: number
  finalized: boolean
  specificationHash: string,
  specification: TaskSpecification
  deliverableHash?: string,
  deliverable?: TaskSubmission
  manager: TaskRoleResult
  worker?: TaskRoleResult
  evaluator?: TaskRoleResult
}

export interface TaskSpecification {
  brief: string
}

export interface TaskSubmission {
  deploymentString: string
}

export enum Role {
  MANAGER = 'MANAGER',
  EVALUATOR = 'EVALUATOR',
  WORKER = 'WORKER'
}

//
// More detailed task interface, but doesn't seem required at this stage
// import { IPFSHash } from '@colony/colony-js-client'
//
// export interface ColonyTask {
//   cancelled: boolean	          // Boolean flag denoting whether the task is cancelled.
//   deliverableDate?: Date	      // Date when the deliverable is due.
//   deliverableHash?: IPFSHash	  // Unique hash of the deliverable content.
//   domainId: number	            // Integer Domain ID the task belongs to.
//   dueDate?: Date	              // When the task is due.
//   finalized: boolean	          // Boolean flag denoting whether the task is finalized.
//   id: number	                  // Integer task ID.
//   payoutsWeCannotMake?: number	// Number of payouts that cannot be completed with the current task funding.
//   potId?: number	              // Integer ID of funding pot for the task.
//   skillId: number	              // Integer Skill ID the task is assigned to.
//   specificationHash: IPFSHash	  // Unique hash of the specification content.
// }
//
// export function createColonyTask(id: number,
//                                  cancelled: boolean = false,
//                                  domainId: number = 1,
//                                  finalized: boolean = false,
//                                  skillId: number = 1,
//                                  specificationHash: string = 'specificationHash',
//                                  payoutsWeCannotMake?: number,
//                                  dueDate?: Date,
//                                  deliverableDate?: Date,
//                                  deliverableHash?: string,
//                                  potId?: number): ColonyTask {
//   return {
//     cancelled: cancelled,
//     deliverableDate: deliverableDate,
//     deliverableHash: deliverableHash,
//     domainId: domainId,
//     dueDate: dueDate,
//     finalized: finalized,
//     id: id,
//     payoutsWeCannotMake: payoutsWeCannotMake,
//     potId: potId,
//     skillId: skillId,
//     specificationHash: specificationHash
//   } as ColonyTask
// }
//
// import { ColonyTask, createColonyTask } from './ColonyTask'
//
// // Extra Information or expanded info for hashs from ColonyTasks needed
// export interface DeploymentTask extends ColonyTask {// Could be composite instead
//   brief: string	          // Retrieved from specificationHash
// }
//
// export function createDeploymentTask(id: number,
//                                      brief?: string,
//                                      cancelled?: boolean,
//                                      domainId?: number,
//                                      finalized?: boolean,
//                                      skillId?: number,
//                                      specificationHash?: string,
//                                      payoutsWeCannotMake?: number,
//                                      dueDate?: Date,
//                                      deliverableDate?: Date,
//                                      deliverableHash?: string,
//                                      potId?: number): DeploymentTask {
//   return createDeploymentTaskFromColonyTask(
//     createColonyTask(
//       id, cancelled, domainId, finalized, skillId, specificationHash, payoutsWeCannotMake, dueDate,
//       deliverableDate, deliverableHash, potId
//     ),
//     brief
//   )
// }
//
// export function createDeploymentTaskFromColonyTask(task: ColonyTask, brief: string = 'This is the task brief'): DeploymentTask {
//   return {
//     cancelled: task.cancelled,
//     deliverableDate: task.deliverableDate,
//     deliverableHash: task.deliverableHash,
//     domainId: task.domainId,
//     dueDate: task.dueDate,
//     finalized: task.finalized,
//     id: task.id,
//     payoutsWeCannotMake: task.payoutsWeCannotMake,
//     potId: task.potId,
//     skillId: task.skillId,
//     specificationHash: task.specificationHash,
//     brief: brief
//   } as DeploymentTask
// }
