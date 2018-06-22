import 'rxjs/add/observable/combineLatest'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/fromPromise'
import 'rxjs/add/observable/bindNodeCallback'
import 'rxjs/add/observable/throw'
import 'rxjs/add/observable/merge'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/timeout'
import 'rxjs/add/operator/delay'

import 'semantic-ui-css/semantic.min.css'

import { Component, default as React } from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import { history, store } from './redux/store'
import { RootNavigation } from './scenes/RootNavigation'
import { createAppReadyAction } from './redux/core/actions'

export class App extends Component {
  componentDidMount () {
    store.dispatch(createAppReadyAction())
  }

  render () {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <RootNavigation />
        </ConnectedRouter>
      </Provider>
    )
  }
}
