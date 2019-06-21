const { query } = require('./query')
const { mutation } = require('./mutation')
const { userTypes, projectTypes, taskTypes } = require('./types')

const typeDefs = [query, mutation, userTypes, projectTypes, taskTypes]

module.exports = {
  typeDefs
}
