import { useState, useEffect } from 'react'
import { Provider, TransactionOnChain } from 'elrondjs'

import { doInterval } from '../utils/timer'


interface UseGetTransactionResult {
  tx?: TransactionOnChain,
  error?: string,
}

export const useGetTransaction = (provider: Provider, txHash: string): UseGetTransactionResult => {
  const [tx, setTx] = useState<TransactionOnChain>()
  const [error, setError] = useState()

  useEffect(() => {
    const timer = doInterval(async () => {
      try {
        setTx(await provider.getTransaction(txHash))
        setError(undefined)
      } catch (err) {
        console.warn(err)
        setTx(undefined)
        setError(err.message)
      }
    }, { delayMs: 3000, executeImmediately: false /* give time for tx to show up on network */ })

    return () => clearInterval(timer)
  }, [setTx, provider, txHash])

  return { tx, error }
}