const { DataSource } = require('apollo-datasource')
const { UserInputError } = require('apollo-server')
const { Task, Project } = require('../models')

class TaskMongo extends DataSource {
  constructor() {
    super()
  }

  async createTask({ projectId, name, description }) {
    const project = await Project.findById(projectId)
    if (!project) {
      throw new UserInputError(`Project with given id (${projectId} not found)`)
    }

    const task = new Task({
      name: name,
      description: description,
      project: project._id
    })

    try {
      await task.save()
      project.tasks = project.tasks.concat(task._id)
      await project.save()
      return task
    } catch (error) {
      throw new UserInputError(error.message, {
        invalidArgs: { projectId, name, description }
      })
    }
  }

  async updateTask({ id, name, description }) {
    const task = await Task.findById(id)
    if (!task) {
      throw new UserInputError(`Task with given id (${id} not found)`)
    }
    task.name = name || task.name
    task.description = description || task.description
    task.save()
    await task.populate('project')
    return task
  }

  async getTaskProject(id) {
    const task = await Task.findById(id).populate('project')
    return task.project
  }
}

module.exports = TaskMongo