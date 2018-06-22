import { Action } from 'redux'
import { Colony } from '../../models/Colony'
import { ColonyClient } from '@colony/colony-js-client'

export enum ColonyActionTypes {
  Select = '[Colony] Colony Select',
  SelectSuccess = '[Colony] Colony Select Success',
  SelectFail = '[Colony] Colony Select Fail',
  Deselect = '[Colony] Colony Deselect',
  Register = '[Colony] Colony Register Select',
  RegisterSuccess = '[Colony] Colony Register Success',
  RegisterFail = '[Colony] Colony Register Fail'
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

export interface Register extends Action {
  type: ColonyActionTypes.Register
  address: string
}

export interface RegisterSuccess extends Action {
  type: ColonyActionTypes.RegisterSuccess
  address: string
}

export interface RegisterFail extends Action {
  type: ColonyActionTypes.RegisterFail
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

export function createRegisterAction (address: string): Register {
  return { type: ColonyActionTypes.Register, address }
}

export function createRegisterSuccessAction (address: string): RegisterSuccess {
  return { type: ColonyActionTypes.RegisterSuccess, address }
}

export function createRegisterFailAction (error: Error): RegisterFail {
  return { type: ColonyActionTypes.RegisterFail, error }
}

export function createDeselectAction (): Deselect {
  return { type: ColonyActionTypes.Deselect }
}

export type ColonyActions =
  | Select
  | SelectSuccess
  | SelectFail
  | Register
  | RegisterSuccess
  | RegisterFail
  | Deselect
