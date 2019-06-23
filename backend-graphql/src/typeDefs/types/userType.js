const { gql } = require('apollo-server')

const userTypes = gql`
  type User {
    username: String!
    name: String!
    admin: Boolean!
    id: ID!
  }

  type Token {
    value: String!
  }
`

module.exports = { userTypes }
