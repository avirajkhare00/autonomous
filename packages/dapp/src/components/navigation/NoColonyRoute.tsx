import { default as React, SFC } from 'react'
import { RouteProps } from 'react-router'
import { connect } from 'react-redux'

import { RootState } from '../../redux/store'
import { ConditionalRedirectRoute } from './ConditionalRedirectRoute'
import { ROOT_ROUTES } from '../../scenes/routes'

interface UnauthorizedRouteProps {
  hasColony: boolean
  isLoading: boolean
}

const _noColonyRoute: SFC<UnauthorizedRouteProps & RouteProps> = ({ hasColony, isLoading, ...rest }) => (
  <ConditionalRedirectRoute
    redirectTo={ROOT_ROUTES.Colony}
    shouldLinkBack={true}
    shouldRedirect={hasColony}
    isLoading={isLoading}
    {...rest}
  />
)

const mapState = (state: RootState): Partial<UnauthorizedRouteProps> => ({
  hasColony: state.colony.hasColony,
  isLoading: state.colony.isLoading
})

export const NoColonyRoute = connect(mapState)(_noColonyRoute)
