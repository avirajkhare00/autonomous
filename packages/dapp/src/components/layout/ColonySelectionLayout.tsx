import { default as React, SFC } from 'react'

import { BaseLayout } from './BaseLayout'
import glamorous from 'glamorous'

const Background = glamorous.div({
  alignItems: 'center',
  justifyContent: 'center'
})

export const ColonySelectionLayout: SFC = ({ children }) => (
  <BaseLayout>
    <Background>
      {children}
    </Background>
  </BaseLayout>
)
