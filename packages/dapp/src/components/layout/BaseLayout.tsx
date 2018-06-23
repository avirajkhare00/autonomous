import { default as React, SFC } from 'react'
import glamorous from 'glamorous'
import { Icon, Menu } from 'semantic-ui-react'
import { env } from '../../config/ApplicationConfig'
import { MenuBackgroundColor, TitleColor } from '../colors/BaseColors'

const FullDiv = glamorous.div({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
})

export const BaseLayout: SFC = ({ children }) => (
  <FullDiv>
    <Menu pointing secondary style={{ backgroundColor: MenuBackgroundColor }}>
      <Menu.Item style={{ color: TitleColor, height: '50px', fontSize: '20px' }}>
        {env.APP_NAME} &nbsp;<Icon name='cogs' style={{ color: TitleColor }}/>
      </Menu.Item>
    </Menu>
    {children}
  </FullDiv>
)
