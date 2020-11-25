import React from 'react'
import styled from '@emotion/styled'

const Container = styled.span`
`

interface Props {
  className?: string,
  title?: string,
}

const LoadingIcon: React.FunctionComponent<Props> = props => (
  <Container {...props}>/</Container>
)


export default LoadingIcon