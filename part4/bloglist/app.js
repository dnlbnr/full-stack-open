const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const blogRouter = require('./controller/blogs')
const { errorHandler } = require('./utils/middleware')

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

app.use('/api/blogs', blogRouter)

app.use(errorHandler)

module.exports = app