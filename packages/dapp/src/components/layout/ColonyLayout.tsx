import { default as React, SFC } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import glamorous from 'glamorous'

import { RootActions } from '../../redux/store'
import { NavigationMenu } from './NavigationMenu'
import { BaseLayout } from './BaseLayout'
import { createDeselectAction } from '../../redux/colony/actions'
import { MenuBackgroundColor } from '../colors/BaseColors'

const Container = glamorous.div({
  display: 'flex',
  flexDirection: 'row',
  flex: 1
})

const Menu = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: MenuBackgroundColor,
  width: 260
})

const Content = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  overflow: 'scroll',
  padding: 32
})

interface ColonyLayoutProps {
  changeColony (): void
}

const _colonyLayout: SFC<ColonyLayoutProps> = ({ changeColony, children }) => (
  <BaseLayout>
    <Container>
      <Menu>
        <NavigationMenu onChangeColony={changeColony} />
      </Menu>
      <Content>
        {children}
      </Content>
    </Container>
  </BaseLayout>
)

const mapDispatch = (dispatch: Dispatch<RootActions>) => ({
  changeColony () { dispatch(createDeselectAction()) }
})

export const ColonyLayout = connect(null, mapDispatch)(_colonyLayout)
