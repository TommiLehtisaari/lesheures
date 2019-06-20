const { query } = require('./query')
const { mutation } = require('./mutation')
const { userTypes } = require('./types')

const typeDefs = [query, mutation, userTypes]

module.exports = {
  typeDefs
}
