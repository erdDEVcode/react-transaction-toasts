import React from 'react'
import styled from '@emotion/styled'
import { flex } from 'emotion-styled-utils'
import { DefaultProps } from './common'
import Button from './Button'

const Container = styled.div`
  ${flex({ direction: 'row', justify: 'flex-start', align: 'flex-start' })};
  position: relative;
  border-radius: 5px;
  padding: 1rem 2rem 1rem 1rem;
  font-size: 0.9rem;
`

const CloseButton = styled(Button)`
  position: absolute;
  top: 1px;
  right: 1px;
  font-size: 0.8em;
  color: inherit;
  border: none;
`

interface Props extends DefaultProps {
  className?: string,
  icon?: any,
}

const ToastContainer: React.FunctionComponent<Props> = ({ className, children, icon, closeNow }) => {
  return (
    <Container className={className}>
      {icon}
      <div>
        {children}
      </div>
      {closeNow ? (
        <CloseButton onClick={closeNow}>x</CloseButton>
      ) : null}
    </Container>
  )
}

export default ToastContainer

