import React, { useCallback, useEffect, useState } from 'react'
import { Provider } from 'elrondjs'

import { openExternalUrl } from '../utils/url'

interface ViewBaseProps {
  provider: Provider,
}

interface Props extends ViewBaseProps {
  render: Function,
}

const Inner: React.FunctionComponent<Props> = ({ provider, render }) => {
  const [ chainId, setChainId ] = useState<string>()

  useEffect(() => {
    (async () => {
      try {
        if (!chainId) {
          const networkConfig = await provider.getNetworkConfig()
          setChainId(networkConfig.chainId)
        }
      } catch (err) {
        console.warn('[react-transaction-toasts] Error determining chain id', err)
      }
    })()
  }, [ chainId, provider ])
  
  const getTransactionUrl = useCallback(id => {
    if (undefined === chainId) {
      throw new Error('Chain id not known')
    }
    return `https://${'T' === chainId ? 'testnet-' : ''}explorer.elrond.com/transactions/${id}`
  }, [ chainId ])

  const getAddressUrl = useCallback(addr => {
    if (undefined === chainId) {
      throw new Error('Chain id not known')
    }
    return `https://${'T' === chainId ? 'testnet-' : ''}explorer.elrond.com/address/${addr}`
  }, [ chainId ])

  return render({ getTransactionUrl, getAddressUrl })
}

interface WrapperProps extends ViewBaseProps {
}

const Wrapper: React.FunctionComponent<WrapperProps> = ({ children, provider }) => {
  return (children && provider) ? (
    <Inner provider={provider} render={children as Function} />
  ) : null
}

export interface ViewInExplorerContext {
  onClick: () => void
}

interface ViewProps {
  fns: any,
  type: string,
  input: any,
}

const View: React.FunctionComponent<ViewProps> = ({ children, fns, type, input }) => {
  const onClick = useCallback(() => {
    try {
      switch (type) {
        case 'address':
          return openExternalUrl(fns.getAddressUrl(input))
        case 'transaction':
          return openExternalUrl(fns.getTransactionUrl(input))
      }
    } catch (err) {
      console.warn(`Error opening URL: ${err.message}`)
    }
  }, [ fns, type, input ])

  const ret: ViewInExplorerContext = {
    onClick,
  }

  return (children as Function)(ret)
}

interface ViewAddressProps extends ViewBaseProps {
  address: string,
}

export const ViewAddressInExplorer: React.FunctionComponent<ViewAddressProps> = ({ children, address, ...props }) => {
  return (
    <Wrapper {...props}>
      {(fns: any) => (
        <View type='address' input={address} fns={fns}>
          {children}
        </View>
      )}
    </Wrapper>
  )
}

interface ViewTransactionProps extends ViewBaseProps {
  id: string,
}

export const ViewTransactionInExplorer: React.FunctionComponent<ViewTransactionProps> = ({ children, id, ...props }) => {
  return (
    <Wrapper {...props}>
      {(fns: any) => (
        <View type='transaction' input={id} fns={fns}>
          {children}
        </View>
      )}
    </Wrapper>
  )
}

