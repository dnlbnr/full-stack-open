const logger = require('./logger')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ message: 'not found' })
}

const errorHandler = (error, req, res, next) => {
  logger.error(error)
  logger.error(req)
  if (error.name === 'ValidationError') {
    return res.status(400).json({ message: 'Wrong format' })
  }
  if (error.name === 'ValueError') {
    return res.status(400).json({ message: 'Invalid data' })
  }
  if (error.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid id' })
  }
  next(error)
}

module.exports = { errorHandler, unknownEndpoint }