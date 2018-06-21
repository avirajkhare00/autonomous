import { default as React, SFC } from 'react'
import glamorous from 'glamorous'

import { env } from '../../config/ApplicationConfig'

const FullDiv = glamorous.div({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
})

const Title = glamorous.div({
  height: 32,
  backgroundColor: 'white',
  color: 'red'
})

export const BaseLayout: SFC = ({ children }) => (
  <FullDiv>
    <Title>
      {env.APP_NAME}
    </Title>
    {children}
  </FullDiv>
)
