import { default as React, SFC } from 'react'
import { NavLink } from 'react-router-dom'
import { Icon, Menu } from 'semantic-ui-react'
import { COLONY_ROUTES } from '../../scenes/routes'
import { MenuBackgroundColor, TitleColor } from '../colors/BaseColors'

interface NavigationMenuProps {
  onChangeColony(): void
}

export const NavigationMenu: SFC<NavigationMenuProps> = ({ onChangeColony }) => (
  <Menu vertical style={{ backgroundColor: MenuBackgroundColor }}>
    <Menu.Item
      style={{ color: TitleColor }}
      as={NavLink}
      exact
      to={COLONY_ROUTES.Dashboard}
      activeClassName='active'
    >
      <Icon name='list'/>
      Deployment
    </Menu.Item>

    <Menu.Item
      style={{ color: TitleColor }}
      as={NavLink}
      exact
      to={COLONY_ROUTES.Logs}
      activeClassName='active'
    >
      <Icon name='cloud download'/>
      Deployment Status
    </Menu.Item>

    <Menu.Item
      style={{ color: TitleColor }}
      activeClassName='active'
    >
      <Icon name='cog'/>
      Register Colony
    </Menu.Item>

    <Menu.Item
      style={{ color: TitleColor }}
      onClick={() => onChangeColony()}
    >
      <Icon name='exchange'/>
      Change colony
    </Menu.Item>
  </Menu>
)
