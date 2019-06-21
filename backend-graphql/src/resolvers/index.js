const { userResolvers } = require('./userResolvers')
const { projectResolvers } = require('./projectResolvers')
const { taskResolvers } = require('./taskResolvers')
const _ = require('lodash')

const resolvers = _.merge(userResolvers, projectResolvers, taskResolvers)

module.exports = {
  resolvers
}
