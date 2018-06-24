import { TransactionActions, TransactionActionTypes } from './actions'
import { Transaction, TransactionState } from '../../models/Transaction'

export interface TransactionsState {
  transactions: Map<string, Transaction>
}

const initialState: TransactionsState = {
  transactions: new Map()
}

export function transactionsReducer (state: TransactionsState = initialState, action: TransactionActions): TransactionsState {
  switch (action.type) {
    // When a mint is requested, set the state to REQUESTED
    case TransactionActionTypes.Initiate: {

      let newTx: Transaction = {
        id: action.id,
        isVisible: true,
        description: action.description,
        state: TransactionState.INITIATED,
        transactionHash: undefined,
        receipt: undefined,
        error: undefined
      }

      let newTxs = new Map(state.transactions.set(action.id, newTx))

      return {
        ...state,
        transactions: newTxs
      }
    }

    case TransactionActionTypes.Submitted: {
      return {
        ...state,
        transactions: modifyTransactions(
          state.transactions,
          action.id,
          t => ({
            id: t.id,
            isVisible: true,
            description: t.description,
            state: TransactionState.SUBMITTED,
            transactionHash: action.transaction.hash,
            receipt: t.receipt,
            error: t.error
          })
        )
      }
    }

    case TransactionActionTypes.Receipt: {
      return {
        ...state,
        transactions: modifyTransactions(
          state.transactions,
          action.id,
          t => ({
            id: t.id,
            isVisible: true,
            description: t.description,
            state: TransactionState.RECEIVED,
            transactionHash: t.transactionHash,
            receipt: action.receipt,
            error: t.error
          })
        )
      }
    }

    case TransactionActionTypes.Error: {
      return {
        ...state,
        transactions: modifyTransactions(
          state.transactions,
          action.id,
          t => ({
            id: t.id,
            isVisible: true,
            description: t.description,
            state: TransactionState.ERROR,
            transactionHash: t.transactionHash,
            receipt: t.receipt,
            error: action.error
          })
        )
      }
    }

    case TransactionActionTypes.DismissTransaction: {
      return {
        ...state,
        transactions: modifyTransactions(
          state.transactions,
          action.transactionId,
          t => ({
            id: t.id,
            isVisible: false,
            description: t.description,
            state: t.state,
            transactionHash: t.transactionHash,
            receipt: t.receipt,
            error: t.error
          })
        )
      }
    }

    default: {
      return state
    }
  }
}

function modifyTransactions (
  transactions: Map<string, Transaction>,
  id: string,
  stateChange: (p: Transaction) => Transaction
): Map<string, Transaction> {

  let currentTx = transactions.get(id)

  if (currentTx) {
    const transaction = stateChange(currentTx)
    const transactionsCopy = new Map(transactions)
    transactionsCopy.set(id, transaction)
    return transactionsCopy
  } else {
    return transactions
  }
}
