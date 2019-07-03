const { createTestClient } = require('apollo-server-testing')
const { ApolloServer, gql } = require('apollo-server')
const mongoose = require('mongoose')
const config = require('config')
const jwt = require('jsonwebtoken')
const { User } = require('../src/models')
const { typeDefs, resolvers, dataSources, context } = require('../src/index')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context
})

User.remove()

const CREATE_USER = gql`
  mutation createUser($username: String!, $name: String, $password: String!) {
    createUser(username: $username, name: $name, password: $password) {
      value
    }
  }
`
// const LOGIN = gql`
//   mutation login($username: String!, $password: String!) {
//     login(username: $username, password: $password) {
//       value
//     }
//   }
// `

const testUsers = [
  { username: 'testuser', name: 'Firstname Lastname', password: 'salainen' }
]

describe('Mutations', () => {
  it('user created', async () => {
    await User.deleteMany({})
    const { mutate } = await createTestClient(server)
    const res = await mutate({
      mutation: CREATE_USER,
      variables: testUsers[0]
    })
    const token = res.data.createUser.value
    const decodedToken = jwt.verify(token, config.get('jwt_secret'))
    expect(decodedToken.name).toEqual(testUsers[0].name)
    expect(decodedToken.username).toEqual(testUsers[0].username)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
