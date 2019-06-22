const { Task, Project } = require('../models')
const { UserInputError } = require('apollo-server')

const taskResolvers = {
  Mutation: {
    createTask: async (root, args) => {
      const project = await Project.findById(args.projectId)
      if (!project) {
        throw new UserInputError(
          `Project with given id (${args.projectId} not found)`
        )
      }

      const task = new Task({
        name: args.name,
        description: args.description,
        project: project._id
      })

      try {
        await task.save()
        project.tasks = project.tasks.concat(task._id)
        await project.save()
        return task
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    }
  },
  Task: {
    project: async root => {
      const task = await Task.findById(root.id).populate('project')
      return task.project
    }
  }
}

module.exports = {
  taskResolvers
}
