import React from 'react'
import { useToasts } from 'react-toast-notifications'
import { useCallback } from 'react'
import { Provider } from 'elrondjs'

import TrackTransactionToast from './components/TrackTransactionToast'
import ErrorToast from './components/ErrorToast'
import { ToastStyles } from './components/common'

export interface StyleOptions {
  styles?: ToastStyles,
}

export interface HookOptions extends StyleOptions {
  provider?: Provider,
}

export interface ShowErrorOptions extends StyleOptions {
}

export interface TrackTransactionOptions extends HookOptions {
  disableAutoCloseOnSuccess?: boolean,
}

interface UseTransactionToastsResult {
  trackTransaction: (txHash: string, opts?: TrackTransactionOptions) => void,
  showError: (msg: string, opts?: ShowErrorOptions) => void,
}

export const useTransactionToasts = (options?: HookOptions): UseTransactionToastsResult => {
  const { addToast } = useToasts()

  const trackTransaction = useCallback((txHash: string, opts?: TrackTransactionOptions) => {
    const finalOpts = Object.assign({}, options, opts)

    if (!finalOpts.provider) {
      throw new Error('Provider must be set')
    }

    addToast(
      <TrackTransactionToast txHash={txHash} {...finalOpts} provider={finalOpts.provider} />
    )
  }, [options])

  const showError = useCallback((msg: string, opts?: ShowErrorOptions) => {
    const finalOps = Object.assign({}, options, opts)

    addToast(
      <ErrorToast {...finalOps}><p>{msg}</p></ErrorToast>
    )
  }, [options])

  return { trackTransaction, showError }
}

export { TransactionToastsProvider } from './contexts'