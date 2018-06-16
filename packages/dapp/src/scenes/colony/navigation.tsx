import { Redirect, Route, Switch } from 'react-router'
import { default as React, SFC } from 'react'

import { DashboardScene } from './dashboard/DashboardScene'

import { COLONY_ROUTES, ROOT_ROUTES } from '../routes'

export const ColonyNavigation: SFC = () => (
  <Switch>
    <Route path={COLONY_ROUTES.Dashboard} component={DashboardScene} />
    <Redirect from={ROOT_ROUTES.Colony} to={COLONY_ROUTES.Dashboard} />
  </Switch>
)
