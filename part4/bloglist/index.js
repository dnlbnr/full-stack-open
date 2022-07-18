const mongoose = require('mongoose')
const { MONGODB_URI, PORT } = require('./utils/config')
const logger = require('./utils/logger')
const app = require('./app')

mongoose.connect(MONGODB_URI)
  .then(() => logger.info('Connected to database'))
  .catch(() => logger.error('Error while connecting to database'))

const server = app
server.listen(PORT, () => logger.info(`Server is running on port ${PORT}`))