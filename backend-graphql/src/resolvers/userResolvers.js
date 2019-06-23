const { AuthenticationError, UserInputError } = require('apollo-server')
const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const { User } = require('../models')

const createToken = user => {
  return {
    value: jwt.sign(
      _.pick(user, ['username', 'name', 'admin', 'id']),
      config.get('jwt_secret')
    )
  }
}

const userResolvers = {
  Query: {
    allUsers: (root, args, { currentUser }) => {
      if (!currentUser || !currentUser.admin) return null
      return User.find({})
    }
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
        return createToken(user)
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    updateCurrentUser: async (root, args, { currentUser }) => {
      const user = await User.findById(currentUser._id.toString())
      if (!user)
        throw new UserInputError(`User not found with id: '${args.id}'`)

      if (args.password) {
        const saltRounds = 10
        user.password = await bcrypt.hash(args.password, saltRounds)
      }

      user.username = args.username || user.username
      user.name = args.name || user.name
      await user.save()
      return createToken(user)
    },
    login: async (root, args) => {
      const { username, password } = args
      const user = await User.findOne({ username })
      if (!user) {
        throw new AuthenticationError(
          `User with name of '${username}' not found`
        )
      }

      const validPassword = await bcrypt.compare(password, user.password)
      if (!validPassword) throw new AuthenticationError(`Invalid password`)

      return createToken(user)
    }
  }
}

module.exports = {
  userResolvers
}
