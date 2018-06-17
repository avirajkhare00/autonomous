import { default as React, SFC } from 'react'
import { RouteProps } from 'react-router'
import { connect } from 'react-redux'

import { RootState } from '../../redux/store'
import { ROOT_ROUTES } from '../../scenes/routes'
import { ConditionalRedirectRoute } from './ConditionalRedirectRoute'

interface ColonyRouteProps {
  hasColony: boolean
  isLoading: boolean
}

const _colonyRoute: SFC<ColonyRouteProps & RouteProps> = ({ hasColony, isLoading, ...rest }) => (
  <ConditionalRedirectRoute
    redirectTo={ROOT_ROUTES.Landing}
    shouldLinkBack={true}
    isLoading={isLoading}
    shouldRedirect={!hasColony}
    {...rest}
  />
)

const mapState = (state: RootState): Partial<ColonyRouteProps> => ({
  hasColony: state.colony.hasColony,
  isLoading: state.colony.isLoading || !state.core.initialised
})

export const ColonyRoute = connect(mapState)(_colonyRoute)
