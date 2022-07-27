const mongoose = require('mongoose')
const { MONGODB_URI } = require('./config')
const logger = require('./logger')

const connectDb = async () => {
  try {
    await mongoose.connect(MONGODB_URI)
    if (process.env.NODE_ENV !== 'test') {
      logger.info('Database connected')
    }
  } catch (error) {
    logger.error(error)
  }
}

module.exports = { connectDb }