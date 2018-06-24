import { default as React, SFC } from 'react'
import glamorous from 'glamorous'

import { CancelButton, PrimaryButton } from '../../../../components/buttons/BaseButtons'

interface CommonButtonFormProps {
  primaryButtonText: string

  onCancel(): void
}

const InlineButtonsContainer = glamorous.div({
  marginTop: '20px!important',
  display: 'flex',
  flexDirection: 'row'
})

const ButtonLeftContainer = glamorous.div({
  flex: 1
})

export const CommonButtonForm: SFC<CommonButtonFormProps> = ({ primaryButtonText, onCancel }) => (
  <div>
    <InlineButtonsContainer>
      <ButtonLeftContainer>
        <CancelButton onClick={() => onCancel()}>
          Cancel
        </CancelButton>
      </ButtonLeftContainer>

      <PrimaryButton>{primaryButtonText}</PrimaryButton>
    </InlineButtonsContainer>
  </div>
)
