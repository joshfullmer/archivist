import ApolloClient from 'apollo-boost'

const apolloProvider = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

export default apolloProvider
