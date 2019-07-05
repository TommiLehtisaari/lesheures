const { ForbiddenError } = require('apollo-server')

const taskResolvers = {
  Mutation: {
    createTask: async (_, args, { currentUser, dataSources }) => {
      if (!currentUser || !currentUser.admin) {
        throw new ForbiddenError('Creating task requires Admin privileges.')
      }
      const result = await dataSources.taskDatabase.createTask({
        projectId: args.projectId,
        name: args.name,
        description: args.description
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
        description: args.description
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
