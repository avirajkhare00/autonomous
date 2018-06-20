import { TransactionReceipt, Transaction } from '@colony/colony-js-adapter'
import { Action } from 'redux'
import { ContractResponse } from '@colony/colony-js-contract-client'

export enum TransactionActionTypes {
  Initiate = '[WEB3] Transaction Initiate',
  Submitted = '[WEB3] Transaction Submitted',
  Receipt = '[WEB3] Transaction Receipt',
  Error = '[WEB3] Transaction Error'
}

export type TransactionInitiator<T> = () => Promise<ContractResponse<T>>
export type TransactionResultResolver<T> = (input: T) => Action
export type TransactionFailResolver = (err: Error) => Action

export interface InitiateTransaction<T> extends Action {
  type: TransactionActionTypes.Initiate
  id: string
  description: string
  initiator: TransactionInitiator<T>
  successAction: TransactionResultResolver<T>
  failAction: TransactionFailResolver
}

export interface TransactionSubmitted extends Action {
  type: TransactionActionTypes.Submitted
  id: string
  transaction: Transaction
}

export interface TransactionReceiptReceived extends Action {
  type: TransactionActionTypes.Receipt
  id: string
  receipt: TransactionReceipt
}

export interface TransactionError extends Action {
  type: TransactionActionTypes.Error
  id: string
  error: Error
}

export function createTransactionInitiateAction<T> (
  id: string,
  description: string,
  initiator: TransactionInitiator<T>,
  successAction: TransactionResultResolver<T>,
  failAction: TransactionFailResolver
): InitiateTransaction<T> {
  return { type: TransactionActionTypes.Initiate, id, description, initiator, successAction, failAction }
}

export function createTransactionSubmittedAction (id: string, transaction: Transaction): TransactionSubmitted {
  return { type: TransactionActionTypes.Submitted, id, transaction }
}

export function createTransactionReceiptAction (id: string, receipt: TransactionReceipt): TransactionReceiptReceived {
  return { type: TransactionActionTypes.Receipt, id, receipt }
}

export function createTransactionErrorAction (id: string, error: Error): TransactionError {
  return { type: TransactionActionTypes.Error, id, error }
}

export type TransactionActions =
  | InitiateTransaction<any>
  | TransactionSubmitted
  | TransactionReceiptReceived
  | TransactionError
