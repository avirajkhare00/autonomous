import { Button } from 'semantic-ui-react'
import glamorous from 'glamorous'
import {
  CancelButtonBackgroundColor,
  CancelButtonColor,
  PrimaryButtonBackgroundColor,
  PrimaryButtonColor, RedButtonBackgroundColor,
  SecondaryButtonBackgroundColor
} from '../colors/ButtonColors'

export const PrimaryButton = glamorous(Button)({
  backgroundColor: PrimaryButtonBackgroundColor + '!important',
  color: PrimaryButtonColor + '!important'
})

export const SecondaryButton = glamorous(Button)({
  backgroundColor: SecondaryButtonBackgroundColor + '!important',
  color: PrimaryButtonColor + '!important'
})

export const CancelButton = glamorous(Button)({
  backgroundColor: CancelButtonBackgroundColor + '!important',
  color: CancelButtonColor + '!important'
})

export const RedButton = glamorous(CancelButton)({
  backgroundColor: RedButtonBackgroundColor + '!important',
  color: PrimaryButtonColor + '!important'
})
