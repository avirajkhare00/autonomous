import { default as React, SFC } from 'react'

import { BaseLayout } from './BaseLayout'
import glamorous from 'glamorous'
import { FadedBackground } from '../colors/BaseColors'

const Background = glamorous.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  backgroundColor: FadedBackground
})

export const ColonySelectionLayout: SFC = ({ children }) => (
  <BaseLayout>
    <Background>
      {children}
    </Background>
  </BaseLayout>
)
