const { gql } = require('apollo-server')

const taskTypes = gql`
  type Task {
    id: ID!
    name: String!
    description: String
  }
`

// const taskTypes = gql`
//   type Type {
//     id: ID!
//     project: Project!
//     name: String!
//     description: String
//   }
// `

module.exports = { taskTypes }
