const { gql } = require('apollo-server')

const taskTypes = gql`
  type Task {
    id: ID!
    project: Project!
    name: String!
    description: String
    color: Int!
  }
`

module.exports = { taskTypes }
