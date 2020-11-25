import React, { useCallback, useState } from 'react'
import styled from '@emotion/styled'
import { Provider, TransactionOnChain, TransactionStatus } from 'elrondjs'

import _ from '../utils/lodash'
import { useGetTransaction } from '../hooks'
import ErrorToast from './ErrorToast'
import ToastContainer from './ToastContainer'
import LoadingIcon from './LoadingIcon'
import LinkButton from './LinkButton'
import { DefaultProps, getStyle } from './common'
import { ViewInExplorerContext, ViewTransactionInExplorer } from './ViewInExplorer'
import Button from './Button'

const Container = styled(ToastContainer)`
`

const SuccessContainer = styled(Container)`
  background-color: ${(p: any) => getStyle(p.styles, 'success.bgColor')};
  color: ${(p: any) => getStyle(p.styles, 'success.textColor')};

  p {
    font-weight: bolder;
  }
`

const PendingContainer = styled(Container)`
  background-color: ${(p: any) => getStyle(p.styles, 'pending.bgColor')};
  color: ${(p: any) => getStyle(p.styles, 'pending.textColor')};

  p {
    font-weight: lighter;
    font-style: italic;
  }
`

const ErrorMsg = styled.div`
  margin-top: 1rem;
`

const DetailsContainer = styled.div`
  margin-top: 1rem;
  font-size: 80%;

  button {
    font-size: 1em;
    color: inherit;
    border-color: inherit;
  }
  
  button + div {
    margin-top: 1rem;
  }
`

const Hash = styled.div`
  margin-bottom: 1rem;
  strong {
    font-weight: bolder;
  }
`

interface DetailsProps {
  txHash: string,
  tx?: TransactionOnChain,
  provider: Provider,
}

const TxDetails: React.FunctionComponent<DetailsProps> = ({ provider, txHash, tx }) => {
  const [showDetails, setShowDetails] = useState(false)
  
  const toggleDetails = useCallback(() => {
    setShowDetails(!showDetails)
  }, [showDetails])
 
  return tx ? (
    <DetailsContainer>
      
      <LinkButton icon={showDetails ? 'upArrow' : 'downArrow'} onClick={toggleDetails}>
        {showDetails ? 'Hide' : 'Show'} details
      </LinkButton>
      {showDetails ? (
        <div>
          <Hash><strong>Id: </strong><span>{txHash}</span></Hash>
          <ViewTransactionInExplorer id={txHash} provider={provider}>
            {({ onClick }: ViewInExplorerContext) => (
              <Button icon='open-external' onClick={onClick}>
                View in explorer
              </Button>
            )}
          </ViewTransactionInExplorer>
        </div>
      ) : null}
    </DetailsContainer>
  ) : null
}

interface Props extends DefaultProps {
  txHash: string,
  provider: Provider,
}

const Toast: React.FunctionComponent<Props> = ({ provider, txHash, closeAfter, ...props }) => {
  const { tx, error } = useGetTransaction(provider, txHash)

  // useEffect(() => {
  //   let timer: any

  //   if (tx?.status === TransactionStatus.SUCCESS && closeAfter) {
  //     timer = closeAfter(3000)
  //   }

  //   return () => {
  //     clearTimeout(timer)
  //   }
  // }, [ tx, closeAfter ])

  if (error) {
    return (
      <ErrorToast {...props}>
        <p>Unable to read transaction state</p>
        <ErrorMsg>{error}</ErrorMsg>
      </ErrorToast>
    )
  }

  const txDetails = <TxDetails txHash={txHash} tx={tx} provider={provider} />

  switch (_.get(tx, 'status')) {
    case TransactionStatus.FAILURE:
      return (
        <ErrorToast {...props}>
          <p>Transaction failed</p>
          {txDetails}
        </ErrorToast>        
      )
    case TransactionStatus.SUCCESS:
      return (
        <SuccessContainer icon='ok' {...props}>
          <p>Transaction successful</p>
          {txDetails}
        </SuccessContainer>
      )
    default:
      return (
        <PendingContainer icon={<LoadingIcon />} {...props}>
          <p>Transaction in progress</p>
          {txDetails}
        </PendingContainer>
      )
  }
}

export default Toast
