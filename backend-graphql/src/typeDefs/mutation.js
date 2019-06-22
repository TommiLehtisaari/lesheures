const { gql } = require('apollo-server')

const mutation = gql`
  type Mutation {
    """
    Creates a user and saves it to the database and returns token for
    server-side authentication and authorization. Server reads Token
    from custom http-header 'x-auth-token'

    Note: username must be unique.
    """
    createUser(username: String!, password: String!): Token
    """
    Returns Token for further server-side authentication and
    authorization in exchange for valid username and password.
    Server reads Token from custom http-header 'x-auth-token'
    """
    login(username: String!, password: String!): Token
    createProject(name: String!): Project
    createTask(name: String!, projectId: String!, description: String): Task
    createHourlog(date: String!, hours: Float!, taskId: String!): Hourlog
  }
`

module.exports = {
  mutation
}
