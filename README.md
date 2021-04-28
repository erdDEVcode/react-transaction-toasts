![scr1](https://raw.githubusercontent.com/erdDEVcode/react-transaction-toasts/master/screenshot.png)
![scr2](https://raw.githubusercontent.com/erdDEVcode/react-transaction-toasts/master/screenshot2.png)

# DEPRECATED - react-transaction-toasts is now deprecated and no longer maintained.

[![NPM module](https://badge.fury.io/js/react-transaction-toasts.svg)](https://badge.fury.io/js/react-transaction-toasts)
[![Join the community](https://img.shields.io/badge/Chat%20on-Telegram-brightgreen.svg?color=0088cc)](https://t.me/erdDEV)
[![Follow on Twitter](https://img.shields.io/twitter/url/http/shields.io.svg?style=social&label=Follow&maxAge=2592000)](https://twitter.com/erd_dev)

React component for visualizing [Elrond](https://elrond.com) transaction progress.

* Tracks transaction progress and reports success/failure.
* Optionally auto-hide a notification once transaction completes.
* Customizable styling.
* Powered by [react-toast-notifications](https://github.com/jossmac/react-toast-notifications).

## Installation

_Note: This package requires React 17 or above._

```shell
npm install --save react-transaction-toasts react@17 elrondjs
```

## Usage

First, you need to setup the `TransactionToastProvider`. In your top-level app component:

```js
import { Component } from 'react'
import { TransactionToastsProvider } from 'react-transaction-toasts'

export default class App extends React.Component {
  componentDidCatch (error: Error, info: React.ErrorInfo) {
    console.error(error, info)
  }

  render() {
    return (
      <TransactionToastProvider>
        {/* app/routing components here */}
      </TransactionToastProvider>
    )
  }
}
```

Then in any child component you can do:

```js
import { useTransactionToasts } from 'react-transaction-toasts'
import { useCallback } from 'react'
import { ProxyProvider } from 'elrondjs'

// React functional component
export default () => {
  const { trackTransaction, showError } = useTransactionToasts()

  const sendTransaction = useCallback(async () => {
    const provider = new ProxyProvider(...)
    const signedTx = ...

    try {
      const ret = await provider.sendSignedTransaction(signedTx)
      trackTransaction(ret.hash, { provider })
    } catch (err) {
      showError(err.message)
    }
  })

  return (
    <button onClick={sendTransaction}>Send</button>
  )
}
```

### Customization

By default the toast notification automatically disappears after a few seconds for a 
transaction that succeeds. To prevent this happening:

```js
const { trackTransaction, showError } = useTransactionToasts({
  disableAutoCloseOnSuccess: true,
})
```

The `TransactionToastsProvider` component takes the same properties as `ToastProvider` in the `react-toast-notification` package. The defaults set are:

* `placement`: `top-right`
* `autoDismissTimeout`: `5000`

[See the full docs](https://github.com/jossmac/react-toast-notifications#toastprovider-props) for more information on values you can set.

## Contributor guide

This is for anyone working on this codebase.

Build and watch component:

```shell
yarn dev
```

Build component for production:

```shell
yarn build
```

Build and publish a new release

```
yarn release
```

## License

MIT
