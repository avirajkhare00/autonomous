import { default as React, SFC } from 'react'
import { NavLink } from 'react-router-dom'
import { Icon, Menu } from 'semantic-ui-react'
import glamorous from 'glamorous'
import { COLONY_ROUTES } from '../../scenes/routes'
import { MenuBackgroundColor, MenuTextColor } from '../colors/BaseColors'

interface NavigationMenuProps {
  onChangeColony(): void
}

const MenuSyle = glamorous.div({
  backgroundColor: MenuBackgroundColor
})

const MenuItemSyle = glamorous.div({
  color: MenuTextColor
})

export const NavigationMenu: SFC<NavigationMenuProps> = ({ onChangeColony }) => (
  <MenuSyle>
    <Menu vertical pointing secondary >
      <Menu.Item
        as={NavLink}
        exact
        to={COLONY_ROUTES.Dashboard}
        activeClassName='active'
      >
        <MenuItemSyle>
          <Icon name='list'/>
          Deployment
        </MenuItemSyle>
      </Menu.Item>

      <Menu.Item
        as={NavLink}
        exact
        to={COLONY_ROUTES.Logs}
        activeClassName='active'
      >
        <MenuItemSyle>
          <Icon name='cloud download'/>
          Deployment Status
        </MenuItemSyle>
      </Menu.Item>

      <Menu.Item
        activeClassName='active'
      >
        <MenuItemSyle>
          <Icon name='cog'/>
          Register Colony
        </MenuItemSyle>
      </Menu.Item>

      <Menu.Item onClick={() => onChangeColony()}>
        <MenuItemSyle>
          <Icon name='exchange'/>
          Change colony
        </MenuItemSyle>
      </Menu.Item>
    </Menu>
  </MenuSyle>
)
