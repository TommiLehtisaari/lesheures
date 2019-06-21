const { Task } = require('../models')
const { UserInputError } = require('apollo-server')

const taskResolvers = {
  Mutation: {
    createTask: async (root, args) => {
      const task = new Task({ name: args.name, description: args.description })
      try {
        await task.save()
        return task
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    }
  }
}

module.exports = {
  taskResolvers
}
