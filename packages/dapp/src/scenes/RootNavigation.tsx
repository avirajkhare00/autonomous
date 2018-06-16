import { default as React, SFC } from 'react'
import { Route, Switch } from 'react-router'

import { ROOT_ROUTES } from './routes'
import { ColonySelectScene } from './selection/ColonySelectScene'
import { LoadingColonyScene } from './LoadingColonyScene'
import { ColonyScene } from './colony/ColonyScene'
import { ColonyRoute } from '../components/navigation/ColonyRoute'
import { NoColonyRoute } from '../components/navigation/NoColonyRoute'

export const RootNavigation: SFC = () => (
  <Switch>
    <Route exact={true} path={ROOT_ROUTES.Root} component={LoadingColonyScene} />
    <NoColonyRoute exact={true} path={ROOT_ROUTES.Landing} component={ColonySelectScene} />
    <ColonyRoute path={ROOT_ROUTES.Colony} component={ColonyScene} />
  </Switch>
)
