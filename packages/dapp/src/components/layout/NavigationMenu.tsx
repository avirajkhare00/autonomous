import { default as React, SFC } from 'react'
import { NavLink } from 'react-router-dom'
import { Icon, Menu } from 'semantic-ui-react'

import { COLONY_ROUTES } from '../../scenes/routes'

interface NavigationMenuProps {
  onChangeColony (): void
}

export const NavigationMenu: SFC<NavigationMenuProps> = ({ onChangeColony }) => (
  <Menu vertical>
    <Menu.Item>
      <Menu.Header>Menu</Menu.Header>

      <Menu.Menu>
        <Menu.Item
          as={NavLink}
          exact
          to={COLONY_ROUTES.Dashboard}
          name={'Dashboard'}
          activeClassName='active'
        />
      </Menu.Menu>
    </Menu.Item>

    <Menu.Item
      onClick={() => onChangeColony()}
    >
      <Icon name='exchange' />
      Change colony
    </Menu.Item>
  </Menu>
)
