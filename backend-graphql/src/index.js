const { ApolloServer } = require('apollo-server')

const mongoose = require('mongoose')
const config = require('config')
const jwt = require('jsonwebtoken')

const { User } = require('./models')
const { typeDefs } = require('./typeDefs')
const { resolvers } = require('./resolvers')

mongoose.set('useFindAndModify', false)
const env = process.env.NODE_ENV

const databaseDefiner = env => {
  switch (env) {
    case 'test':
      return config.get('db').toString()
    case 'production':
      return config.get('atlas_uri').toString()
    default:
      return config.get('db').toString()
  }
}

const MONGODB_URI = databaseDefiner(env)

console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connection to MongoDB:', error.message)
  })

const { UserDatabase } = require('./datasources')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    userDatabase: new UserDatabase()
  }),
  context: async ({ req }) => {
    const auth = req ? req.headers['x-auth-token'] : null
    if (auth) {
      const decodedToken = jwt.verify(auth, config.get('jwt_secret'))
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
