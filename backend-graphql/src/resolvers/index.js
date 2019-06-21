const { userResolvers } = require('./userResolvers')
const { projectResolvers } = require('./projectResolvers')
const _ = require('lodash')

const resolvers = _.merge(userResolvers, projectResolvers)

module.exports = {
  resolvers
}
