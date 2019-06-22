const { Project } = require('../models')
const { UserInputError, ForbiddenError } = require('apollo-server')

const projectResolvers = {
  Query: {
    allProjects: () => Project.find({})
  },
  Mutation: {
    createProject: async (root, args, { currentUser }) => {
      if (!currentUser || !currentUser.admin) {
        throw new ForbiddenError(
          'Creating new Project requires Admin privileges.'
        )
      }
      const project = new Project({ name: args.name })
      try {
        await project.save()
        return project
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    }
  },
  Project: {
    tasks: async root => {
      const project = await Project.findById(root.id).populate('tasks')
      return project.tasks
    }
  }
}

module.exports = {
  projectResolvers
}
