const { ApolloServer, PubSub } = require('apollo-server')

const mongoose = require('mongoose')
const config = require('config')
const jwt = require('jsonwebtoken')

const { User } = require('./src/models')
const { typeDefs } = require('./src/typeDefs')
const { resolvers } = require('./src/resolvers')

const pubsub = new PubSub()

mongoose.set('useFindAndModify', false)
const env = process.env.NODE_ENV

const databaseDefiner = env => {
  switch (env) {
    case 'test':
      return config.get('db').toString()
    default:
      return config.get('atlas_uri').toString()
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

const server = new ApolloServer({
  typeDefs,
  resolvers,
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
