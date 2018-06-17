import { Epic } from 'redux-observable'

import { RootActions, RootState } from '../store'
import {
  createTransactionErrorAction,
  createTransactionReceiptAction,
  createTransactionSubmittedAction,
  InitiateTransaction,
  TransactionActionTypes
} from './actions'
import { Observable } from 'rxjs/Observable'

const initiateTransactionEpic: Epic<RootActions, RootState> =
  action$ => action$.ofType<InitiateTransaction>(TransactionActionTypes.Initiate)
    .mergeMap(action => {
      let submission$ = Observable.fromPromise(action.initiator())

      let receipt$ = submission$
        .flatMap(tx => tx.meta.receiptPromise
          ? Observable.fromPromise(tx.meta.receiptPromise)
            .map(receipt => createTransactionReceiptAction(action.id, receipt))
          : tx.meta.receipt
            ? Observable.of(createTransactionReceiptAction(action.id, tx.meta.receipt))
            : Observable.throw('Receipt not found')
        )

      return Observable.merge(
        submission$.map(tx => createTransactionSubmittedAction(action.id, tx.meta.transaction)),
        receipt$
      )
        .catch(err => {
          console.log('Error in transaction', err)
          return Observable.of(createTransactionErrorAction(action.id, err))
        })
    })

export const TransactionEpics = [
  initiateTransactionEpic
]
