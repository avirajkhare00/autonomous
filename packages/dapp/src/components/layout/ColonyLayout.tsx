import { default as React, SFC } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import { RootActions } from '../../redux/store'
import { NavigationMenu } from './NavigationMenu'
import { BoldBackground } from './BoldBackground'
import { BaseLayout } from './BaseLayout'
import { createDeselectAction } from '../../redux/colony/actions'
// import glamorous from 'glamorous'

// const Background = glamorous(BoldBackground)({
//   paddingTop: 40
// })

interface ColonyLayoutProps {
  changeColony (): void
}

const _colonyLayout: SFC<ColonyLayoutProps> = ({ changeColony, children }) => (
  <BaseLayout>
    <BoldBackground>
        <Grid>
          <Grid.Column mobile={16} tablet={4} computer={4}>
            <NavigationMenu onChangeColony={changeColony} />
          </Grid.Column>
          <Grid.Column mobile={16} tablet={12} computer={12}>
            {children}
          </Grid.Column>
        </Grid>
    </BoldBackground>
  </BaseLayout>
)

const mapDispatch = (dispatch: Dispatch<RootActions>) => ({
  changeColony () { dispatch(createDeselectAction()) }
})

export const ColonyLayout = connect(null, mapDispatch)(_colonyLayout)
