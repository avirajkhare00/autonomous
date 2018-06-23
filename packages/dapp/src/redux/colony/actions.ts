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
  RegisterFail = '[Colony] Colony Register Fail',
  Clean = '[Colony] Colony Clean Select',
  CleanSuccess = '[Colony] Colony Clean Success',
  CleanFail = '[Colony] Colony Clean Fail',
  CleanAll = '[Colony] Colony CleanAll Select',
  CleanAllSuccess = '[Colony] Colony CleanAll Success',
  CleanAllFail = '[Colony] Colony CleanAll Fail'
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

export interface Clean extends Action {
  type: ColonyActionTypes.Clean
  address: string
}

export interface CleanSuccess extends Action {
  type: ColonyActionTypes.CleanSuccess
  address: string
}

export interface CleanFail extends Action {
  type: ColonyActionTypes.CleanFail
  error: Error
}

export interface CleanAll extends Action {
  type: ColonyActionTypes.CleanAll
}

export interface CleanAllSuccess extends Action {
  type: ColonyActionTypes.CleanAllSuccess
}

export interface CleanAllFail extends Action {
  type: ColonyActionTypes.CleanAllFail
  error: Error
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

export function createCleanAction (address: string): Clean {
  return { type: ColonyActionTypes.Clean, address }
}

export function createCleanSuccessAction (address: string): CleanSuccess {
  return { type: ColonyActionTypes.CleanSuccess, address }
}

export function createCleanFailAction (error: Error): CleanFail {
  return { type: ColonyActionTypes.CleanFail, error }
}

export function createCleanAllAction (): CleanAll {
  return { type: ColonyActionTypes.CleanAll }
}

export function createCleanAllSuccessAction (): CleanAllSuccess {
  return { type: ColonyActionTypes.CleanAllSuccess }
}

export function createCleanAllFailAction (error: Error): CleanAllFail {
  return { type: ColonyActionTypes.CleanAllFail, error }
}

export type ColonyActions =
  | Select
  | SelectSuccess
  | SelectFail
  | Register
  | RegisterSuccess
  | RegisterFail
  | Deselect
  | Clean
  | CleanSuccess
  | CleanFail
  | CleanAll
  | CleanAllSuccess
  | CleanAllFail
