import { default as React, SFC } from 'react'
import { NavLink } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
import glamorous from 'glamorous'

import { COLONY_ROUTES } from '../../scenes/routes'
import { FontFamily, MenuBackgroundHighlight, MenuTextColor, Primary } from '../colors/BaseColors'

interface NavigationMenuProps {
  onChangeColony (): void
}

const Container = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%'
})

const menuCommon: React.CSSProperties = ({
  color: MenuTextColor,
  fontSize: 16,
  fontFamily: FontFamily,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: 16,
  transition: '0.25s cubic-bezier(0.17, 0.67, 0.52, 0.97)'
})

const MenuLink = glamorous(NavLink)({
  ...menuCommon,
  borderLeft: '4px solid transparent',
  ':hover': {
    backgroundColor: MenuBackgroundHighlight,
    color: MenuTextColor
  }
})

const AlignedIcon = glamorous(Icon)({
  height: 'inherit !important',
  marginRight: '8px !important'
})

const MenuButton = glamorous.a({
  ...menuCommon,
  cursor: 'pointer',
  ':hover': {
    backgroundColor: MenuBackgroundHighlight,
    color: MenuTextColor
  }
})

const activeStyle: React.CSSProperties = {
  borderLeft: `4px solid ${Primary}`,
  backgroundColor: MenuBackgroundHighlight
}

export const NavigationMenu: SFC<NavigationMenuProps> = ({ onChangeColony }) => (
  <Container>
    <MenuLink
      exact
      to={COLONY_ROUTES.Dashboard}
      activeStyle={activeStyle}
    >
      <AlignedIcon name='list' />
      Deployments
    </MenuLink>

    <MenuLink
      exact
      to={COLONY_ROUTES.Logs}
      activeStyle={activeStyle}
    >
      <AlignedIcon name='cloud download' />
      Deployment Logs
    </MenuLink>

    <br/>

    <MenuButton
      onClick={() => onChangeColony()}
    >
      <AlignedIcon name='exchange' />
      Change colony
    </MenuButton>
  </Container>
)
