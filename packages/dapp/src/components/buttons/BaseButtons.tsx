import { Button } from 'semantic-ui-react'
import glamorous from 'glamorous'
import {
  CancelButtonBackgroundColor,
  PrimaryButtonBackgroundColor,
  PrimaryButtonColor,
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
  color: PrimaryButtonColor + '!important'
})

export const PrimaryMenuButton = glamorous(PrimaryButton)({
  height: '36px',
  width: '142px'
})

export const SecondaryMenuButton = glamorous(SecondaryButton)({
  height: '36px',
  width: '142px'
})

export const CancelMenuButton = glamorous(CancelButton)({
  height: '36px',
  width: '142px'
})
