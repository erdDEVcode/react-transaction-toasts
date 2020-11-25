import React from 'react'
import styled from '@emotion/styled'
import { flex, boxShadow } from 'emotion-styled-utils'
import { DefaultProps } from './common'
import IconButton from './IconButton'

const Container = styled.div`
  ${flex({ direction: 'row', justify: 'flex-start', align: 'flex-start' })};
  position: relative;
  border-radius: 5px;
  padding: 1rem 2rem 1rem 1rem;
  font-size: 0.9rem;
  ${boxShadow({ color: '#666' })};
`

const CloseButton = styled(IconButton)`
  position: absolute;
  top: 2px;
  right: 2px;
  font-size: 0.8em;
`

const Icon = styled.span`
  display: inline-block;
  margin-right: 1em;
  font-size: 1em;
`

interface Props extends DefaultProps {
  className?: string,
  icon?: any,
  onClick?: () => void,
}

const ToastContainer: React.FunctionComponent<Props> = ({ className, children, onClick, icon, closeNow }) => {
  return (
    <Container className={className} onClick={onClick}>
      {icon ? <Icon>{icon}</Icon> : null}
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

