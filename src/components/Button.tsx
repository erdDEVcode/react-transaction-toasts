import React from 'react'
import styled from '@emotion/styled'
import { buttonStyles } from 'emotion-styled-utils'

import { ButtonProps } from './common'

const StyledButton = styled.button`
  font-weight: lighter;
  font-size: 1rem;
  padding: 0.7em 1.4em;
  border-radius: 5px;

  ${({ disabled }) => buttonStyles({
    bgColor: 'transparent',
    textColor: 'inherit',
    borderColor: 'inherit',
    hoverBgColor: 'transparent',
    hoverTextColor: 'inherit',
    hoverBorderColor: 'inherit',
    shadowColor: 'transparent',
    inDisabledState: disabled,
  })};

  &:hover {
    transform: scale(1.2);
  }
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



