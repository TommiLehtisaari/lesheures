const { gql } = require('apollo-server')

const hourlogTypes = gql`
  type Hourlog {
    id: ID!
    date: String!
    hours: Float!
    user: User!
    task: Task!
  }
`

module.exports = { hourlogTypes }
