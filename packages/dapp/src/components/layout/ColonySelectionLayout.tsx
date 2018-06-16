import { default as React, SFC } from 'react'

import { BaseLayout } from './BaseLayout'
import { BoldBackground } from './BoldBackground'
import glamorous from 'glamorous'

const Background = glamorous(BoldBackground)({
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
