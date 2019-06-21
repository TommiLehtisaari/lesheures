const { gql } = require('apollo-server')

const projectTypes = gql`
  type Project {
    id: ID!
    name: String!
  }
`

// const projectTypes = gql`
//   type Project {
//     id: ID!
//     name: String!
//     tasks: [Task]
//   }
// `
module.exports = { projectTypes }
