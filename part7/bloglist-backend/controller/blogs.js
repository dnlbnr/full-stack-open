const Blog = require('../models/blog')
const User = require('../models/user')
const router = require('express').Router()

router.get('/', async (request, response) => {
  const userId = request.user.id

  if (!userId) {
    return response.status(401).end()
  }

  const blogs = await Blog.find({ user: userId }).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  })
  response.status(200).json(blogs)
})

router.get('/:id', async (request, response) => {
  const userId = request.user.id
  const id = request.params.id
  if (!userId) {
    return response.status(401).end()
  }

  const blog = await Blog.findOne({ _id: id, user: userId }).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  })
  if (!blog) {
    return response.status(400).json({ message: 'Not found' })
  }
  response.status(200).json(blog)
})

router.post('/', async (request, response) => {
  const userId = request.user.id
  const blog = request.body

  if (!userId) {
    return response.status(401).end()
  }
  if (!blog.url && !blog.title) {
    return response
      .status(400)
      .json({ message: 'Please provide either title or URL' })
  }

  const result = await new Blog({ ...blog, user: userId }).save()
  await User.findByIdAndUpdate(userId, { $push: { blogs: result._id } })
  response.status(201).json(result)
})

router.put('/:id', async (request, response) => {
  const userId = request.user.id
  const id = request.params.id
  const blog = await Blog.findById(id)
  const { author, likes, title, url } = request.body
  const data = { author, likes, title, url }

  if (!userId) {
    return response.status(401).end()
  }
  if (!blog || blog.user.toString() !== userId) {
    return response.status(400).json({ message: 'Not found' })
  }

  const result = await Blog.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
    context: 'query',
  }).populate('user', { username: 1, name: 1, id: 1 })
  response.status(200).json(result)
})

router.delete('/:id', async (request, response) => {
  const userId = request.user.id
  const blogId = request.params.id

  if (!userId) {
    return response.status(401).end()
  }

  const toBeDeleted = await Blog.findById(blogId)
  if (!toBeDeleted) {
    return response.status(400).json({ message: 'Blog not found' })
  }
  if (toBeDeleted.user.toString() !== userId) {
    return response.status(401).end()
  }

  await Blog.findByIdAndDelete(blogId)
  response.status(204).end()
})

router.post('/:id/comments', async (request, response) => {
  const userId = request.user.id
  const id = request.params.id
  const comment = request.body.comment
  const blog = await Blog.findById(id)

  if (!userId) {
    return response.status(401).end()
  }

  if (!blog || blog.user.toString() !== userId) {
    return response.status(400).json({ message: 'Not found' })
  }

  const commented = await Blog.findByIdAndUpdate(
    id,
    { $push: { comments: comment } },
    { runValidators: true, context: 'query', new: true }
  )
  response.status(200).json(commented)
})

module.exports = router
