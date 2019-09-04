import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import 'font-awesome/css/font-awesome.css'
import 'semantic-ui-css/semantic.min.css'
import './index.css'

import App from './App'

import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'

import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_URL
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  if (token) {
    return {
      headers: {
        ...headers,
        'x-auth-token': token ? token : null
      }
    }
  } else {
    return {
      headers: {
        ...headers
      }
    }
  }
})

const link = authLink.concat(httpLink)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloHooksProvider>
  </ApolloProvider>,
  document.getElementById('root')
)
