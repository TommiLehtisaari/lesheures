const { gql } = require('apollo-server')

const mutation = gql`
  type Mutation {
    createUser(username: String!, password: String!): Token
    login(username: String!, password: String!): Token
    createProject(name: String!): Project
    createTask(name: String!, description: String): Task
  }
`

module.exports = {
  mutation
}
