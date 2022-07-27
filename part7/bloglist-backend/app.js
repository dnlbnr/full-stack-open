const express = require('express')
require('express-async-errors')
const cors = require('cors')
const morgan = require('morgan')
const blogRouter = require('./controller/blogs')
const userRouter = require('./controller/users')
const loginRouter = require('./controller/login')
const dbRouter = require('./controller/db')
const {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
} = require('./utils/middleware')

const app = express()

app.use(cors())
app.use(express.json())
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('tiny'))
}
app.use(tokenExtractor)

if (process.env.NODE_ENV === 'test') app.use('/api/testing/reset', dbRouter)
app.use('/api/blogs', userExtractor, blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
