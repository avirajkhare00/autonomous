import { Action } from 'redux'
import { Colony } from '../../models/Colony'
import { ColonyClient } from '@colony/colony-js-client'

export enum ColonyActionTypes {
  Select = '[Colony] Colony',
  SelectSuccess = '[Colony] Colony Success',
  SelectFail = '[Colony] Colony Fail',
  Deselect = '[Colony] Deselect'
}

export interface Select extends Action {
  type: ColonyActionTypes.Select
  address: string
}

export interface SelectSuccess extends Action {
  type: ColonyActionTypes.SelectSuccess
  colony: Colony
  client: ColonyClient
}

export interface SelectFail extends Action {
  type: ColonyActionTypes.SelectFail
  error: Error
}

export interface Deselect extends Action {
  type: ColonyActionTypes.Deselect
}

export function createSelectAction (address: string): Select {
  return { type: ColonyActionTypes.Select, address }
}

export function createSelectSuccessAction (colony: Colony, client: ColonyClient): SelectSuccess {
  return { type: ColonyActionTypes.SelectSuccess, colony, client }
}

export function createSelectFailAction (error: Error): SelectFail {
  return { type: ColonyActionTypes.SelectFail, error }
}

export function createDeselectAction (): Deselect {
  return { type: ColonyActionTypes.Deselect }
}

export type ColonyActions =
  | Select
  | SelectSuccess
  | SelectFail
  | Deselect
