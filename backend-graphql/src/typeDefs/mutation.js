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
    """
    Creating new Project requires Admin priveleges.
    """
    createProject(name: String!): Project
    """
    Task is a subclas of a Project and it needs ID of the Project.
    Creating new Task requires Admin priveleges.
    """
    createTask(name: String!, projectId: String!, description: String): Task
    """
    A new Hourlog is created by using personal Token as custom http-header 'x-auth-token'
    """
    createHourlog(date: String!, hours: Float!, taskId: String!): Hourlog
  }
`

module.exports = {
  mutation
}
