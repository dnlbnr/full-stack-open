const Blog = require('../models/blog')
const router = require('express').Router()

router.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.status(200).json(blogs)
})

router.get('/:id', async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id)
  if (!blog) {
    return response.status(400).json({ message: 'Id not in database' })
  }
  response.status(200).json(blog)
})

router.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  if (!blog.url && !blog.title) {
    return response.status(400).json({ message: 'Please provide either title or URL' })
  }
  const result = await blog.save()
  response.status(201).json(result)
})

router.put('/:id', async (request, response) => {
  const id = request.params.id
  const data = request.body
  const blog = await Blog.findByIdAndUpdate(id, data, { new:true, runValidators: true, context:'query' })
  if (!blog) {
    return response.status(400).json({ message: 'Id not in database' })
  }
  response.status(200).json(blog)
})

router.delete('/:id', async (request, response) => {
  const id = request.params.id
  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

module.exports = router