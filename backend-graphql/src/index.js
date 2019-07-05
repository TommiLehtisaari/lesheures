const { ApolloServer } = require('apollo-server')

const config = require('config')
const jwt = require('jsonwebtoken')

const { UserDatabase, ProjectDatabase, TaskDatabase } = require('./datasources')
const { typeDefs } = require('./typeDefs')
const { resolvers } = require('./resolvers')

//const env = process.env.NODE_ENV

// This is declared here for context authentication
const userDatabase = new UserDatabase()

const dataSources = () => ({
  userDatabase,
  projectDatabase: new ProjectDatabase(),
  taskDatabase: new TaskDatabase()
})

const context = async ({ req }) => {
  const auth = req ? req.headers['x-auth-token'] : null
  if (auth) {
    const decodedToken = jwt.verify(auth, config.get('jwt_secret'))
    const currentUser = await userDatabase.getUserById(decodedToken.id)
    return { currentUser }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context
})

if (process.env.NODE_ENV !== 'test') {
  server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`Server ready at ${url}`)
    console.log(`Subscriptions ready at ${subscriptionsUrl}`)
    console.log(`mode: ${config.get('mode')}`)
  })
}

// export all the important pieces for integration/e2e tests to use
module.exports = {
  dataSources,
  context,
  typeDefs,
  resolvers,
  ApolloServer,
  server
}
