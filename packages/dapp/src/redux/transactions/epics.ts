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
      let tx = action.initiator()

      let receiptObs = tx.meta.receiptPromise
        ? Observable.fromPromise(tx.meta.receiptPromise)
          .map(receipt => createTransactionReceiptAction(action.id, receipt))
        : tx.meta.receipt
          ? Observable.of(createTransactionReceiptAction(action.id, tx.meta.receipt))
          : Observable.throw('Receipt not found')

      return Observable.merge(
        Observable.of(createTransactionSubmittedAction(action.id, tx.meta.transaction)),
        receiptObs
      )
        .catch(err => Observable.of(createTransactionErrorAction(action.id, err)))
    })

export const TransactionEpics = [
  initiateTransactionEpic
]
