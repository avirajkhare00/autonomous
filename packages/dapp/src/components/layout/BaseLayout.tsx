import { default as React, SFC } from 'react'
import glamorous from 'glamorous'

import logo from '../../assets/Logo_Icon.png'
import { env } from '../../config/ApplicationConfig'
import { DarkForeground, FontFamily, LightBackground, MenuBackgroundColor, TitleColor } from '../colors/BaseColors'
import { connect } from 'react-redux'
import { RootState } from '../../redux/store'
import { Colony } from '../../models/Colony'

const FullDiv = glamorous.div({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
})

const Header = glamorous.div({
  fontFamily: FontFamily,
  height: 64,
  backgroundColor: MenuBackgroundColor,
  fontSize: 20,
  color: TitleColor,
  display: 'flex',
  alignItems: 'center',
  paddingLeft: 16,
  paddingRight: 16
})

const Logo = glamorous.img({
  display: 'block',
  marginRight: 16
})

const LogoContainer = glamorous.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  flex: 1
})

const MetaContainer = glamorous.div({
  display: 'flex',
  flexDirection: 'row'
})

const MetaItem = glamorous.div({
  backgroundColor: LightBackground,
  color: DarkForeground,
  borderRadius: 99,
  fontSize: 12,
  padding: '8px 16px',
  marginLeft: '16px'
})

const Container = glamorous.div({
  display: 'flex',
  flex: 1
})

interface BaseLayoutProps {
  initialized: boolean
  accounts: string[],
  networkId: number,
  colony: Colony
}

export const baseLayout: SFC<BaseLayoutProps> = ({ children, initialized, accounts, networkId, colony }) => (
  <FullDiv>
    <Header>
      <LogoContainer>
        <Logo src={logo} alt={'Autonomous'} /> {env.APP_NAME}
      </LogoContainer>
      {initialized ? (
          <MetaContainer>
            <MetaItem>Network ID: {networkId}</MetaItem>
            {colony ? (
                <MetaItem>Colony: {colony.address}</MetaItem>
              )
              : null}
            <MetaItem>Account: {accounts[0]}</MetaItem>
          </MetaContainer>
        )
        : null
      }
    </Header>
    <Container>
      {children}
    </Container>
  </FullDiv>
)

const mapState = (state: RootState) => ({
  initialized: state.core.initialised,
  accounts: state.core.accounts,
  networkId: state.core.networkId,
  colony: state.colony.colony
})

export const BaseLayout = connect(mapState)(baseLayout)
