const { DataSource } = require('apollo-datasource')
const { AuthenticationError, UserInputError } = require('apollo-server')
const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const { User } = require('../models')

class UserMongo extends DataSource {
  constructor() {
    super()
  }

  createToken(user) {
    return jwt.sign(
      _.pick(user, ['username', 'name', 'admin', 'id']),
      config.get('jwt_secret')
    )
  }

  async getAllUsers() {
    return await User.find({})
  }

  async getUserById({ id }) {
    return await User.findById(id)
  }

  async createUser({ username, name, password }) {
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
      return this.createToken(user)
    } catch (error) {
      return new UserInputError(error.message, {
        invalidArgs: { username, password, name }
      })
    }
  }

  async updateUser({ username, name, password, id }) {
    const user = await User.findById(id)
    if (!user) return new UserInputError(`User not found with id: '${id}'`)

    if (password) {
      const saltRounds = 10
      user.password = await bcrypt.hash(password, saltRounds)
    }

    user.username = username || user.username
    user.name = name || user.name
    await user.save()
    return this.createToken(user)
  }

  async login({ username, password }) {
    const user = await User.findOne({ username })
    if (!user) {
      return new AuthenticationError(
        `User with name of '${username}' not found`
      )
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) return new AuthenticationError(`Invalid password`)

    return this.createToken(user)
  }
}

module.exports = UserMongo
