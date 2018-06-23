import { default as React, SFC } from 'react'
import glamorous from 'glamorous'
import { Icon, Menu } from 'semantic-ui-react'
import { env } from '../../config/ApplicationConfig'
import { COLONY_ROUTES } from '../../scenes/routes'
import { NavLink } from 'react-router-dom'

const FullDiv = glamorous.div({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
})

// const TitleSyle = glamorous.div({
//   backgroundColor: MenuBackgroundColor
// })

// const MenuItemSyle = glamorous.div({
//   color: TitleColor
// })

export const BaseLayout: SFC = ({ children }) => (
  <FullDiv>
    {/*<TitleSyle>*/}
      <Menu secondary>
        <Menu.Item
          as={NavLink}
          exact
          to={COLONY_ROUTES.Dashboard}
        >
            {env.APP_NAME}
            <Icon name='cogs' padding/>
        </Menu.Item>
      </Menu>
    {/*</TitleSyle>*/}
    {children}
  </FullDiv>
)
