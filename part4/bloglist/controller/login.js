const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')

router.post('/', async (request, response) => {
  const { username, password } = request.body
  const user = await User.findOne({ username })
  if (!user) {
    return response.status(401).json({ message: 'Invalid combination of username and password' })
  }
  const pwCorrect = await bcrypt.compare(password, user.passwordHash)
  if (!pwCorrect) {
    return response.status(401).json({ message: 'Invalid combination of username and password' })
  }
  const tokenPayload = { id: user._id, username: user.username }
  const token = jwt.sign(tokenPayload, process.env.TOKEN_SECRET)
  response.status(200).json({ token, username: user.username, id: user._id })
})

module.exports = router