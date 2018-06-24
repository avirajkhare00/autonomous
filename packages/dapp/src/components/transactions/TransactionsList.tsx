import { default as React, SFC } from 'react'
import glamorous from 'glamorous'

import { Transaction } from '../../models/Transaction'
import { TransactionToast } from './TransactionToast'

const FloatingContainer = glamorous.div({
  zIndex: 99999,
  position: 'absolute',
  right: 16,
  bottom: 16
})

interface TransactionsListProps {
  transactions: Transaction[]
  dismiss (id: string): void
}

export const TransactionsList: SFC<TransactionsListProps> = ({ transactions, dismiss }) => (
  <FloatingContainer>
    {transactions
      .filter(t => t.isVisible)
      .map((t, i) =>
        <TransactionToast transaction={t} key={i} dismiss={() => dismiss(t.id)} />
      )}
  </FloatingContainer>
)
