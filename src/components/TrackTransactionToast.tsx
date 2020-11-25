import React, { useCallback, useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { Provider, TransactionOnChain, TransactionStatus } from 'elrondjs'

import _ from '../utils/lodash'
import { useGetTransaction } from '../hooks'
import ErrorToast from './ErrorToast'
import ToastContainer from './ToastContainer'
import LoadingIcon from './LoadingIcon'
import { DefaultProps, getStyle } from './common'
import { ViewInExplorerContext, ViewTransactionInExplorer } from './ViewInExplorer'
import Button from './Button'


const SuccessContainer = styled(ToastContainer)`
  background-color: ${(p: any) => getStyle(p.styles, 'success.bgColor')};
  color: ${(p: any) => getStyle(p.styles, 'success.textColor')};

  p {
    font-weight: bolder;
  }
`

const PendingContainer = styled(ToastContainer)`
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
  font-size: 80%;
  margin-top: 1rem;
`

const Hash = styled.div`
  margin-bottom: 1rem;
  strong {
    font-weight: bolder;
  }
`

const ViewButton = styled(Button)`
`

const ShowDetailsButton = styled(Button)`
  display: block;
  font-size: 0.6rem;
`

const DetailsInnerDiv = styled.div`
  margin-top: 1rem;
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
      <ShowDetailsButton onClick={toggleDetails}>
        {showDetails ? '- Hide details' : '+ Show details'}
      </ShowDetailsButton>
      {showDetails ? (
        <DetailsInnerDiv>
          <Hash><strong>Id: </strong><span>{txHash}</span></Hash>
          <ViewTransactionInExplorer id={txHash} provider={provider}>
            {({ onClick }: ViewInExplorerContext) => (
              <ViewButton icon='open-external' onClick={onClick}>
                View in explorer ↗
              </ViewButton>
            )}
          </ViewTransactionInExplorer>
        </DetailsInnerDiv>
      ) : null}
    </DetailsContainer>
  ) : null
}

interface Props extends DefaultProps {
  txHash: string,
  provider: Provider,
  disableAutoCloseOnSuccess?: boolean,
}

const Toast: React.FunctionComponent<Props> = ({ provider, txHash, closeAfter, disableAutoCloseOnSuccess, ...props }) => {
  const { tx, error } = useGetTransaction(provider, txHash)

  useEffect(() => {
    let timer: any

    if (tx?.status === TransactionStatus.SUCCESS && closeAfter && !disableAutoCloseOnSuccess) {
      timer = closeAfter(3000)
    }

    return () => {
      clearTimeout(timer)
    }
  }, [tx, closeAfter, disableAutoCloseOnSuccess ])

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
        <SuccessContainer icon='✔️' {...props}>
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
