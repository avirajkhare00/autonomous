import { default as React, SFC } from 'react'
import { Loader } from 'semantic-ui-react'

import { ColonySelectionLayout } from '../components/layout/ColonySelectionLayout'

export const LoadingColonyScene: SFC = () => (
  <ColonySelectionLayout>
    <Loader active inline={'centered'} inverted />
  </ColonySelectionLayout>
)
