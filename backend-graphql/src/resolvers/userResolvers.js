const { AuthenticationError, UserInputError } = require('apollo-server')
const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const { User } = require('../models')

const userResolvers = {
  Query: {
    allUsers: () => User.find({})
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

      return {
        value: jwt.sign(
          _.pick(user, ['username', 'name', 'admin', 'id']),
          config.get('jwt_secret')
        )
      }
    }
  }
}

module.exports = {
  userResolvers
}
