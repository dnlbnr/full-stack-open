const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')

router.get('/', async(request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1 })
  response.status(200).json(users)
})

router.post('/', async (request, response) => {
  const { username, name, password } = request.body
  if (!username || !password) {
    return response.status(400).json({ message: 'Please provide a username and password' })
  }
  if (password.length < 3) {
    return response.status(400).json({ message: 'Password must be at least 3 characters long' })
  }
  const passwordHash = await bcrypt.hash(password, 10)
  const user = await new User({ username, name, passwordHash }).save()
  response.status(201).json(user)
})

module.exports = router