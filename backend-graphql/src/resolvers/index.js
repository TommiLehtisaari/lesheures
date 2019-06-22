const { userResolvers } = require('./userResolvers')
const { projectResolvers } = require('./projectResolvers')
const { taskResolvers } = require('./taskResolvers')
const { hourlogResolvers } = require('./hourlogResolvers')
const _ = require('lodash')

const resolvers = _.merge(
  userResolvers,
  projectResolvers,
  taskResolvers,
  hourlogResolvers
)

module.exports = {
  resolvers
}
