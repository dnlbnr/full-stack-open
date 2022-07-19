const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')

router.post('/', async (request, response) => {
  const { username, name, password } = request.body
  const existing = await User.findOne({ username })
  if (existing) {
    return response.status(400).json({ message: 'Username already taken' })
  }
  const passwordHash = await bcrypt.hash(password, 10)
  const user = await new User({ username, name, passwordHash }).save()
  response.status(201).json(user)
})

module.exports = router