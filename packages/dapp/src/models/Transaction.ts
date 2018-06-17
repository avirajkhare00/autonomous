import { TransactionReceipt } from '@colony/colony-js-adapter'

export interface Transaction {
  id: string,
  description: string,
  state: TransactionState,
  transactionHash?: string,
  receipt?: TransactionReceipt,
  error?: Error
}

export enum TransactionState {
  INITIATED,
  SUBMITTED,
  RECEIVED,
  ERROR
}
