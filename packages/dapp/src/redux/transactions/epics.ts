import { Epic } from 'redux-observable'

import { RootActions, RootState } from '../store'
import {
  createDismissTransaction,
  createTransactionErrorAction,
  createTransactionReceiptAction,
  createTransactionSubmittedAction,
  InitiateTransaction,
  TransactionActionTypes,
  TransactionReceiptReceived
} from './actions'
import { Observable } from 'rxjs/Observable'

const initiateTransactionEpic: Epic<RootActions, RootState> =
  action$ => action$.ofType<InitiateTransaction<any>>(TransactionActionTypes.Initiate)
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

      let successAction$ = submission$
        .flatMap(tx => tx.eventDataPromise!)
        .map(returnedData => action.successAction(returnedData))

      return Observable.merge(
        submission$.map(tx => createTransactionSubmittedAction(action.id, tx.meta.transaction)),
        receipt$,
        successAction$
      )
        .catch(err => {
          console.log('Error in transaction', err)
          return [
            createTransactionErrorAction(action.id, err),
            action.failAction(err)
          ]
        })
    })

const automaticDismissTransactionEpic: Epic<RootActions, RootState> =
  action$ => action$.ofType<TransactionReceiptReceived>(TransactionActionTypes.Receipt)
    .mergeMap(action => {
      return new Observable(observer => {
        setInterval(() => {
          observer.next(createDismissTransaction(action.id))
        }, 3000)
      })
    })

export const TransactionEpics = [
  initiateTransactionEpic,
  automaticDismissTransactionEpic
]
