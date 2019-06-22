const { Project } = require('../models')
const { UserInputError } = require('apollo-server')

const projectResolvers = {
  Query: {
    allProjects: () => Project.find({})
  },
  Mutation: {
    createProject: async (root, args) => {
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
