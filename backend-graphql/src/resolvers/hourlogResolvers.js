const { UserInputError, AuthenticationError } = require('apollo-server')
const { Hourlog, Task, User } = require('../models')

const hourlogResolvers = {
  Mutation: {
    createHourlog: async (root, args, { currentUser }) => {
      if (!currentUser) throw AuthenticationError('Token not provided')
      const task = await Task.findById(args.taskId)
      const { hours, date } = args
      if (!task || !hours || !date) {
        throw UserInputError(`Invalid arguments .`, {
          invalidArgs: args
        })
      }
      const hourlog = new Hourlog({
        user: currentUser.id,
        task: task._id,
        hours,
        date: new Date(date)
      })
      await hourlog.save()
      const user = await User.findById(currentUser._id.toString())
      user.hourlogs = user.hourlogs.concat(hourlog._id.toString())
      await user.save()
      return hourlog
    }
  }
}

module.exports = { hourlogResolvers }
