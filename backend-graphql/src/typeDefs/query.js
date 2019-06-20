const { gql } = require('apollo-server')

const query = gql`
  type Query {
    allUsers: User!
  }
`

module.exports = {
  query
}
