const { gql } = require('apollo-server')

const mutation = gql`
  type Mutation {
    createUser(username: String!, password: String!): Token
    login(username: String!, password: String!): Token
    createProject(name: String!): Project
  }
`

module.exports = {
  mutation
}
