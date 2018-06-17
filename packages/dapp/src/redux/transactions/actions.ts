import { TransactionReceipt, Transaction } from '@colony/colony-js-adapter'
import { Action } from 'redux'
import { ContractResponse } from '@colony/colony-js-contract-client'

export enum TransactionActionTypes {
  Initiate = '[WEB3] Transaction Initiate',
  Submitted = '[WEB3] Transaction Submitted',
  Receipt = '[WEB3] Transaction Receipt',
  Error = '[WEB3] Transaction Error'
}

export interface InitiateTransaction extends Action {
  type: TransactionActionTypes.Initiate
  id: string
  description: string
  initiator: () => ContractResponse<any>
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

export function createTransactionInitiateAction (id: string, description: string, initiator: () => ContractResponse<any>): InitiateTransaction {
  return { type: TransactionActionTypes.Initiate, id, description, initiator }
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
  | InitiateTransaction
  | TransactionSubmitted
  | TransactionReceiptReceived
  | TransactionError
