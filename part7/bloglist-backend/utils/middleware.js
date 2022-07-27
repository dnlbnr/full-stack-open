const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const tokenExtractor = (request, response, next) => {
  const authHeader = request.get('authorization')
  if (!authHeader) {
    return next()
  }
  const [bearer, token] = authHeader.split(' ')
  if (bearer.toLowerCase() !== 'bearer') {
    return next()
  }
  request.token = token
  next()
}

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.TOKEN_SECRET)
  const user = await User.findById(decodedToken.id)
  request.user = user
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ message: 'not found' })
}

const errorHandler = (error, req, res, next) => {
  if (process.env.NODE_ENV !== 'test') {
    logger.error(error)
  }
  if (error.name === 'ValidationError') {
    return res.status(400).json({ message: 'Wrong format' })
  }
  if (error.name === 'ValueError') {
    return res.status(400).json({ message: 'Invalid data' })
  }
  if (error.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid id' })
  }
  if (error.code && error.code === 11000) {
    const field = Object.keys(error.keyValue)[0]
    return res.status(400).json({ message: `${field} already exists` })
  }
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ message: 'Invalid Auth Token' })
  }
  next(error)
}

module.exports = {
  errorHandler,
  unknownEndpoint,
  tokenExtractor,
  userExtractor,
}
