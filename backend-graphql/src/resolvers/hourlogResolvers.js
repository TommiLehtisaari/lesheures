const { UserInputError, AuthenticationError } = require('apollo-server')
const { Hourlog, Task, User } = require('../models')

const hourlogResolvers = {
  Query: {
    allHourlogs: () => Hourlog.find({})
  },
  Mutation: {
    createHourlog: async (root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError('Token not provided')
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
    },
    updateHourlog: async (root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError('Token not provided')
      const user = await User.findById(currentUser._id.toString())
      const hourlog = await Hourlog.findById(args.id).populate('user')

      await hourlog.populate('user').populate('project')

      if (!hourlog) {
        throw UserInputError(`Hourlog with given id '${args.id}' not found`)
      } else if (hourlog.user.id.toString() !== user._id.toString()) {
        throw new AuthenticationError(
          `Hourlog can be updatet only by the author of the hourlog`
        )
      }

      hourlog.date = args.date || hourlog.date
      hourlog.hours = args.hours || hourlog.hours
      await hourlog.save()
      return hourlog
    },
    deleteHourlog: async (root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError('Token not provided')
      const user = await User.findById(currentUser._id.toString())
      const hourlog = await Hourlog.findById(args.id).populate('user')

      if (!hourlog) {
        throw new UserInputError(`Hourlog with given id '${args.id}' not found`)
      }

      if (hourlog.user.id.toString() !== user._id.toString()) {
        throw new AuthenticationError(
          `Hourlog can be deleted only by the author of the hourlog`
        )
      }

      await hourlog.remove()
      return 'ok'
    }
  },
  Hourlog: {
    task: async root => {
      const hourlog = await Hourlog.findById(root.id).populate('task')
      return hourlog.task
    },
    user: async (root, args, { currentUser }) => {
      if (!currentUser || !currentUser.admin) return null
      const hourlog = await Hourlog.findById(root.id).populate('user')
      return hourlog.user
    }
  }
}

module.exports = { hourlogResolvers }
