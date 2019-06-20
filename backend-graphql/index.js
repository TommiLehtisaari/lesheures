const { ApolloServer, gql, PubSub } = require('apollo-server')
const { AuthenticationError, UserInputError } = require('apollo-server')

const mongoose = require('mongoose')
const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const _ = require('lodash')

const User = require('./models/userModel')

const pubsub = new PubSub()

mongoose.set('useFindAndModify', false)
const env = process.env.NODE_ENV

const databaseDefiner = env => {
  switch (env) {
    case 'test':
      return config.get('db').toString()
    default:
      return config.get('atlas_uri')
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

const users = [
  { id: 1, username: 'tommi', password: 'salainene' },
  { id: 2, username: 'arto', password: 'salainene' },
  { id: 3, username: 'matti', password: 'salainene' }
]

const typeDefs = gql`
  type Query {
    allUsers: User!
  }

  type Mutation {
    createUser(username: String!, password: String!): Token
  }

  type User {
    username: String!
    name: String!
    password: String!
    admin: Boolean!
    id: ID!
  }

  type Token {
    value: String!
  }
`

const resolvers = {
  Query: {
    allUsers: () => users
  },
  Mutation: {
    createUser: async (root, args) => {
      const { username, password, name } = args

      const saltRounds = 10
      const hashPassword = await bcrypt.hash(password, saltRounds)

      const user = new User({
        username,
        name,
        password: hashPassword,
        admin: false
      })

      try {
        await user.save()
        return {
          value: jwt.sign(
            _.pick(user, ['username', 'name', 'admin', 'id']),
            config.get('jwt_secret')
          )
        }
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    }
  }
}

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
