const { ForbiddenError } = require('apollo-server')

const colorDefiner = number => {
  if (!number || number < 0 || number > 15) {
    return Math.floor(Math.random() * 15)
  } else {
    return number
  }
}

const taskResolvers = {
  Mutation: {
    createTask: async (_, args, { currentUser, dataSources }) => {
      if (!currentUser || !currentUser.admin) {
        throw new ForbiddenError('Creating task requires Admin privileges.')
      }

      const result = await dataSources.taskDatabase.createTask({
        projectId: args.projectId,
        name: args.name,
        description: args.description,
        color: colorDefiner(args.color)
      })
      return result
    },
    updateTask: async (_, args, { currentUser, dataSources }) => {
      if (!currentUser || !currentUser.admin) {
        throw new ForbiddenError('Updating a task requires Admin privileges.')
      }
      const result = await dataSources.taskDatabase.updateTask({
        id: args.id,
        name: args.name,
        description: args.description,
        color: colorDefiner(args.color)
      })
      return result
    }
  },
  Task: {
    project: async (root, _, { dataSources }) => {
      return dataSources.taskDatabase.getTaskProject(root.id)
    }
  }
}

module.exports = {
  taskResolvers
}
