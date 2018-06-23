import { default as React, SFC } from 'react'
import { ColonyLayout } from '../../components/layout/ColonyLayout'
import { RouteProps } from 'react-router'
import { ColonySwitch } from './navigation'

export const ColonyScene: SFC<RouteProps> = () => (
  <ColonyLayout>
    <ColonySwitch />
  </ColonyLayout>
)
