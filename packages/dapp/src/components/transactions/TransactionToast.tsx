import { default as React, SFC } from 'react'
import { Message, Icon, SemanticICONS } from 'semantic-ui-react'

import { Transaction, TransactionState } from '../../models/Transaction'

const getIconName = (state: TransactionState): SemanticICONS =>
  state === TransactionState.ERROR
    ? 'x'
    : state === TransactionState.INITIATED
    ? 'circle notched'
    : state === TransactionState.SUBMITTED
      ? 'clock outline'
      : state === TransactionState.RECEIVED
        ? 'check'
        : 'circle notched'

const isLoading = (state: TransactionState): boolean =>
  state === TransactionState.ERROR
    ? false
    : state === TransactionState.INITIATED
    ? true
    : state === TransactionState.SUBMITTED
      ? true
      : state === TransactionState.RECEIVED
        ? false
        : false

export const TransactionToast: SFC<{ transaction: Transaction, dismiss(): void }> = ({ transaction, dismiss }) => (
  <Message
    onDismiss={() => dismiss()}
    error={transaction.state === TransactionState.ERROR}
    info={transaction.state === TransactionState.INITIATED}
    warning={transaction.state === TransactionState.SUBMITTED}
    success={transaction.state === TransactionState.RECEIVED}
    icon
  >
    <Icon name={getIconName(transaction.state)} loading={isLoading(transaction.state)} />
    <Message.Content>
      <Message.Header>{transaction.description}</Message.Header>
      {!transaction.error
        ? <p>Performing on-chain transaction...</p>
        : <p>{transaction.error.message}</p>
      }
      {transaction.transactionHash}
      {transaction.receipt
        ? <p>Receipted mined {transaction.receipt.hash}</p>
        : null
      }
    </Message.Content>
  </Message>
)
