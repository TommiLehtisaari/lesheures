const mongoose = require('mongoose')
const config = require('config')
const logger = require('../utils/logger')

const UserMongo = require('./userMongo')
const ProjectMongo = require('./projectMongo')

mongoose.set('useFindAndModify', false)
const env = process.env.NODE_ENV

const databaseDefiner = env => {
  switch (env) {
    case 'test':
      return config.get('db').toString()
    case 'production':
      return config.get('atlas_uri').toString()
    default:
      return config.get('db').toString()
  }
}

const MONGODB_URI = databaseDefiner(env)

logger.log(`connecting to ${MONGODB_URI}`)

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    logger.log('connected to MongoDB')
  })
  .catch(error => {
    logger.log('error connection to MongoDB:', error.message)
  })

module.exports = { UserDatabase: UserMongo, ProjectDatabase: ProjectMongo }
