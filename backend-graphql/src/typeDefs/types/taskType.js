const { gql } = require('apollo-server')

const taskTypes = gql`
  type Type {
    id: ID!
    project: Project!
    name: String!
    description: String
  }
`
module.exports = { taskTypes }
