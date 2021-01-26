import React, { useCallback } from 'react'
import styled from '@emotion/styled'
import { ToastProvider, ToastProps, ToastProviderProps } from 'react-toast-notifications'

const ToastContainer = styled.div`
  margin-bottom: 0.3rem;
`

export interface TransactionToastsContextValue {
}

const Context = React.createContext({} as TransactionToastsContextValue)

const CustomToast: React.FunctionComponent<ToastProps> = ({ children, onDismiss: closeNow }) => {
  const c: any = React.Children.only(children)

  const closeAfter = useCallback((delayMs: number) => {
    return setTimeout(() => {
      closeNow && closeNow()
    }, delayMs)
  }, [closeNow])

  const child = React.cloneElement(c, {
    closeNow,
    closeAfter,
  })

  return (
    <ToastContainer>{child} </ToastContainer>
  )
}

export const TransactionToastsProvider: React.FunctionComponent<ToastProviderProps> = props => {
  const customProps: ToastProviderProps = {
    placement: 'top-right',
    autoDismissTimeout: 5000,
    ...props,
  }

  return (
    <Context.Provider value={{}}>
      <ToastProvider components={{ Toast: CustomToast }} {...customProps} />
    </Context.Provider>
  )
}
