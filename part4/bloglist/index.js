const { PORT } = require('./utils/config')
const { connectDb } = require('./utils/db')
const logger = require('./utils/logger')
const app = require('./app')

// app.listen(PORT, () => logger.info(`Server is running on port ${PORT}`))

const setup = async () => {
  try {
    await connectDb()
    app.listen(PORT, () => logger.info(`Server is running on port ${PORT}`))
  } catch (error) {
    logger.error(error)
  }
}

setup()