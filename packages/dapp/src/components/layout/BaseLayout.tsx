import { default as React, SFC } from 'react'
import glamorous from 'glamorous'

const FullDiv = glamorous.div({
  width: '100%',
  height: '100%',
  display: 'flex'
})

export const BaseLayout: SFC = ({ children }) => (
  <FullDiv>
    {children}
  </FullDiv>
)
