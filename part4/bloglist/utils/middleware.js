const logger = require('./logger')

const errorHandler = (error, req, res, next) => {
  logger.error(error)
  logger.error(req)
  if (error.name === 'ValidationError') {
    return res.status(400).json({ message: 'Wrong format' })
  }
  next(error)
}

module.exports = { errorHandler }