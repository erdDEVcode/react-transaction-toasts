import React from 'react'
import styled from '@emotion/styled'

import Button from './Button'
import { ButtonProps } from './common'

const StyledButton = styled(Button)`
  padding: 0.1em 0.3em;
  border-color: transparent;
  &:hover {
    border-color: inherit;
  }
`

const IconButton: React.FunctionComponent<ButtonProps> = ({ ...props }) => (
  <StyledButton {...props} />
)

export default IconButton



