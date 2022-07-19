const express = require('express')
require('express-async-errors')
const cors = require('cors')
const morgan = require('morgan')
const blogRouter = require('./controller/blogs')
const userRouter = require('./controller/users')
const { unknownEndpoint, errorHandler } = require('./utils/middleware')

const app = express()

// mongoose.connect(MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app