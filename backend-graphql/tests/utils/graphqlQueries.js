const { gql } = require('apollo-server')

const CREATE_PROJECT = gql`
  mutation createProject($name: String!) {
    createProject(name: $name) {
      id
      name
    }
  }
`

const CREATE_TASK = gql`
  mutation createTask(
    $name: String!
    $projectId: String!
    $description: String
  ) {
    createTask(name: $name, projectId: $projectId, description: $description) {
      name
      id
      project {
        name
        id
      }
    }
  }
`

module.exports = { CREATE_PROJECT, CREATE_TASK }
