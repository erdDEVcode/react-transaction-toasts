import React from 'react'
import { useToasts } from 'react-toast-notifications'
import { useCallback } from 'react'
import { Provider } from 'elrondjs'

import TrackTransactionToast from './components/TrackTransactionToast'
import ErrorToast from './components/ErrorToast'
import { ToastStyles } from './components/common'

interface UseTransactionToastsResult {
  trackTransaction: (txHash: string, optionOverrides?: Options) => void,
  showTransactionError: (msg: string, optionOverrides?: Options) => void,
}

export interface Options {
  provider?: Provider,
  styles?: ToastStyles,
}

export const useTransactionToasts = (options?: Options): UseTransactionToastsResult => {
  const { addToast } = useToasts()

  const trackTransaction = useCallback((txHash: string, optionOverrides?: Options) => {
    const opts = Object.assign({}, options, optionOverrides)

    if (!opts.provider) {
      throw new Error('Provider must be set')
    }

    addToast(
      <TrackTransactionToast txHash={txHash} {...opts} provider={opts.provider} />
    )
  }, [options])

  const showTransactionError = useCallback((msg: string, optionOverrides?: Options) => {
    const opts = Object.assign({}, options, optionOverrides)

    addToast(
      <ErrorToast {...opts}><p>{msg}</p></ErrorToast>
    )
  }, [options])

  return { trackTransaction, showTransactionError }
}

export { TransactionToastsProvider } from './contexts'