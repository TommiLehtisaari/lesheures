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
    },
    updateProject: async (root, args, { currentUser }) => {
      if (!currentUser || !currentUser.admin) {
        throw new ForbiddenError('Editing a Project requires Admin privileges.')
      }
      const project = await Project.findById(args.id)
      if (!project) {
        throw new UserInputError(`Project with id '${args.id}' not found`)
      }
      project.name = args.name || project.name
      project.save()
      await project.populate('tasks')
      return project
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
