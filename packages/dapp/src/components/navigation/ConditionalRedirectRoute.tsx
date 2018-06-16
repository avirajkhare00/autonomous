import { default as React, SFC } from 'react'
import { Redirect, Route, RouteProps } from 'react-router'
import { ROOT_ROUTES } from '../../scenes/routes'

interface PrivateRouteProps {
  shouldRedirect: boolean
  isLoading: boolean,
  redirectTo: string
  loadingRedirect?: string,
  shouldLinkBack?: boolean
}

export const ConditionalRedirectRoute: SFC<PrivateRouteProps & RouteProps> =
  ({ shouldRedirect, redirectTo, component: Component, isLoading, shouldLinkBack = false, loadingRedirect = ROOT_ROUTES.Root, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isLoading ? (
            <Redirect
              to={{
                pathname: loadingRedirect,
                state: shouldLinkBack ? { from: props.location } : {}
              }}
            />
          )
          : shouldRedirect
          ? (
            <Redirect
              to={{
                pathname: redirectTo,
                state: shouldLinkBack ? { from: props.location } : {}
              }}
            />
          )
          : (
            Component ? <Component {...props} /> : null
          )
      }
    />
  )
