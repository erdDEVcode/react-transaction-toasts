import React from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'

const spin = keyframes`
  from {
    transform:rotate(0deg);
  }
  50% {
    transform:rotate(180deg);
  }
  to {
    transform:rotate(360deg);
  }
`

const Container = styled.span`
  display: inline-block;
  animation: ${spin} 2s linear infinite;
  font-size: inherit;
`

interface Props {
  className?: string,
  title?: string,
}

const LoadingIcon: React.FunctionComponent<Props> = props => (
  <Container {...props}>/</Container>
)


export default LoadingIcon