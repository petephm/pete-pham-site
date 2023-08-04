import { GraphQLClient } from 'graphql-request'

const hygraphClient = new GraphQLClient(import.meta.env.HYGRAPH_ENDPOINT, {
  headers: {
    authorization: `Bearer ${import.meta.env.HYGRAPH_PERMANENT_AUTH_TOKEN}`,
  },
})

export default hygraphClient
