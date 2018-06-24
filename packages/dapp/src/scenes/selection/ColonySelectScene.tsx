import { default as React, SFC } from 'react'
import { RouteProps } from 'react-router'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import glamorous from 'glamorous'
import { Card } from 'semantic-ui-react'

import { ColonySelectionLayout } from '../../components/layout/ColonySelectionLayout'
import { RootActions } from '../../redux/store'
import { EnterColonyForm } from './EnterColonyForm'
import {
  createCleanAction,
  createCleanAllAction,
  createRegisterAction,
  createSelectAction
} from '../../redux/colony/actions'
import { ColonyRelayerForm } from './ColonyRelayerForm'
import { RedLoginButton } from '../../components/buttons/LoginButtons'

interface LoginSceneProps {
  selectColony(address: string): void

  registerColony(address: string): void

  cleanColony(address: string): void

  cleanAll(): void
}

const CardsContainer = glamorous.div({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'space-even',
  justifyContent: 'center',
  flex: 1
})

const CardWrapper = glamorous.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 0.4
})

const CardContainer = glamorous(Card)({
  display: 'flex',
  flex: 0.8
})

const CardContentContainer = glamorous(Card.Content)({
  margin: '10px!important'
})

const CardHeaderContainer = glamorous(Card.Header)({
  margin: '10px!important',
  marginLeft: '0px!important'
})

export const InlineTextAndButtonContainer = glamorous.div({
  marginBottom: '10px',
  display: 'flex',
  flexDirection: 'row'
})

export const InlineTextLeftContainer = glamorous.div({
  margin: 'auto',
  flex: 1
})

export const _colonySelectScene: SFC<LoginSceneProps & RouteProps> = ({ selectColony, registerColony, cleanColony, cleanAll }) => (
  <ColonySelectionLayout>
    <CardsContainer>
      <CardWrapper>
        <CardContainer>
          <CardContentContainer>
            <CardHeaderContainer>Select a Colony</CardHeaderContainer>
            <p>
              Enter a colony address to manage deployments using Autonomous.
            </p>
            <EnterColonyForm onSubmit={c => selectColony(c)} buttonText={'Select Colony'}/>
          </CardContentContainer>
        </CardContainer>
      </CardWrapper>

      <CardWrapper>
        <CardContainer>
          <CardContentContainer>
            <CardHeaderContainer>Register a new Colony with Autonomous</CardHeaderContainer>
            <p>
              These actions do not affect the colony or interact with the Blockchain. These methods interact with the
              Autonomous Relayer, which listens to changes in registered colonies and manages their deployments.
            </p>
            <ColonyRelayerForm
              onSubmit={c => registerColony(c)}
              onDelete={c => cleanColony(c)}
            />
            <InlineTextAndButtonContainer>
              <InlineTextLeftContainer>
                <p>
                  Clean all namespaces and listeners on the Relayer (careful!)
                </p>
              </InlineTextLeftContainer>
              <RedLoginButton onClick={() => cleanAll()}>Clean All</RedLoginButton>
            </InlineTextAndButtonContainer>
          </CardContentContainer>
        </CardContainer>
      </CardWrapper>
    </CardsContainer>
  </ColonySelectionLayout>
)

const mapDispatch = (dispatch: Dispatch<RootActions>) => ({
  selectColony(address: string) {
    dispatch(createSelectAction(address))
  },
  registerColony(address: string) {
    dispatch(createRegisterAction(address))
  },
  cleanColony(address: string) {
    dispatch(createCleanAction(address))
  },
  cleanAll() {
    dispatch(createCleanAllAction())
  }
})

export const ColonySelectScene = connect(null, mapDispatch)(_colonySelectScene)
