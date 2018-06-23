import { default as React, SFC } from 'react'
import glamorous from 'glamorous'
import { Icon, Menu } from 'semantic-ui-react'

import { MenuBackgroundColor, TitleColor } from '../colors/BaseColors'
import { env } from '../../config/ApplicationConfig'
import { COLONY_ROUTES } from '../../scenes/routes'
import { NavLink } from 'react-router-dom'

const FullDiv = glamorous.div({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
})

const TitleSyle = glamorous.div({
  backgroundColor: MenuBackgroundColor
})

const MenuItemSyle = glamorous.div({
  color: TitleColor
})

export const BaseLayout: SFC = ({ children }) => (
  <FullDiv>
    <TitleSyle>
      <Menu secondary>
        <Menu.Item
          as={NavLink}
          exact
          to={COLONY_ROUTES.Dashboard}
        >
          <MenuItemSyle>
            <span>{env.APP_NAME} </span> <Icon name='cogs' padding/>
          </MenuItemSyle>
        </Menu.Item>
      </Menu>
    </TitleSyle>
    {children}
  </FullDiv>
)
