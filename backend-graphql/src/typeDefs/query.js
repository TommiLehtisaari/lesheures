const { gql } = require('apollo-server')

const query = gql`
  type Query {
    allUsers: [User]
    allProjects: [Project!]
    allHourlogs: [Hourlog]
  }
`

module.exports = {
  query
}
