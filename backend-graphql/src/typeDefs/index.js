const { query } = require('./query')
const { mutation } = require('./mutation')
const { userTypes, projectTypes } = require('./types')

const typeDefs = [query, mutation, userTypes, projectTypes]

module.exports = {
  typeDefs
}
