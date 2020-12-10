import ApolloClient from 'apollo-boost'

import { useAppState } from '../state/app.state'

const apolloProvider = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  request: (operation) => {
    const { user: { jwt } } = useAppState()
    const headers = {
      Authorization: `Bearer ${jwt}`
    }
    operation.setContext({ headers })
  }
})

export default apolloProvider
