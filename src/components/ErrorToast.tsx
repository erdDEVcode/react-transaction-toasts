import React from 'react'
import styled from '@emotion/styled'

import { DefaultProps, getStyle } from './common'
import ToastContainer from './ToastContainer'

const Container = styled(ToastContainer)`
  background-color: ${(p: any) => getStyle(p.styles, 'error.bgColor')};
  color: ${(p: any) => getStyle(p.styles, 'error.textColor')};
`

interface Props extends DefaultProps {
}

const ErrorToast: React.FunctionComponent<Props> = ({ children, ...props }) => {
  return(
    <Container icon='⚠' {...props}>
      {children}
    </Container>
  )
}

export default ErrorToast
