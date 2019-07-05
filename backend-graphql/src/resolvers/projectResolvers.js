const { Project } = require('../models')
const { ForbiddenError } = require('apollo-server')

const projectResolvers = {
  Query: {
    allProjects: () => Project.find({})
  },
  Mutation: {
    createProject: async (root, args, { currentUser, dataSources }) => {
      if (!currentUser || !currentUser.admin) {
        throw new ForbiddenError(
          'Creating new Project requires Admin privileges.'
        )
      }
      const result = await dataSources.projectDatabase.createProject({
        name: args.name
      })
      return result
    },
    updateProject: async (root, args, { currentUser, dataSources }) => {
      if (!currentUser || !currentUser.admin) {
        throw new ForbiddenError('Editing a Project requires Admin privileges.')
      }
      const result = await dataSources.projectDatabase.updateProject({
        id: args.id,
        name: args.name
      })
      return result
    }
  },
  Project: {
    tasks: async (root, _, { dataSources }) => {
      const tasks = await dataSources.projectDatabase.getTasksById(root.id)
      return tasks
    }
  }
}

module.exports = {
  projectResolvers
}
