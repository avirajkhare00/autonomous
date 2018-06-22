import { TaskSpecification, TaskSubmission } from '../models/Task'

export const serializeSpecification = (spec: TaskSpecification): Buffer => {
  return Buffer.from(JSON.stringify(spec))
}
export const deserializeSpecification = (data: Buffer): TaskSpecification => {
  return JSON.parse(data.toString())
}

export const serializeSubmission = (spec: TaskSubmission): Buffer => {
  return Buffer.from(JSON.stringify(spec))
}
export const deserializeSubmission = (data: Buffer): TaskSubmission => {
  return JSON.parse(data.toString())
}
