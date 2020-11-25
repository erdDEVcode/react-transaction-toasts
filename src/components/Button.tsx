import React from 'react'
import styled from '@emotion/styled'

import { ButtonProps } from './common'

const StyledButton = styled.button`
  font-size: 1.2rem;
  padding: 1em 2em;
  border-radius: 5px;
`

const Content = styled.div`
  display: inline-block;
`

const Button: React.FunctionComponent<ButtonProps> = ({ children, onClick, ...props }) => {
  return (
    <StyledButton {...props} onClick={onClick}>
      {children ? <Content>{children}</Content> : null}
    </StyledButton>
  )
}

export default Button



