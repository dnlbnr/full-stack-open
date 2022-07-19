const listHelper = require('../utils/list_helper')
const Blog = require('../models/blog')
const app = require('../app')
const { connectDb } = require('../utils/db')
const supertest = require('supertest')
const mongoose = require('mongoose')
const { initialBlogs } = require('./test_helper')

const api = supertest(app)

const oneBlog = [initialBlogs[0]]

beforeEach(async () => {
  await connectDb()
  await Blog.deleteMany({})
  for (const blog of initialBlogs) {
    await new Blog(blog).save()
  }
}, 25000)

test('dummy returns one', () => {
  const result = listHelper.dummy([])
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })
  test('when the list contains only one blog equals the likes of that blog', () => {
    expect(listHelper.totalLikes(oneBlog)).toBe(7)
  })
  test('of a bigger list is calculated right', () => {
    expect(listHelper.totalLikes(initialBlogs)).toBe(36)
  })
})

describe('favorite blog', () => {
  test('of empty list is null', () => {
    expect(listHelper.favoriteBlog([])).toBe(null)
  })
  test('of one blog is that blog', () => {
    const fav = listHelper.favoriteBlog(oneBlog)
    const { title, author, likes } = oneBlog[0]
    expect(fav).toEqual({ title, author, likes })
  })
  test('of list of blogs is the blog with the most likes', () => {
    const fav = listHelper.favoriteBlog(initialBlogs)
    const expected = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    }
    expect(fav).toEqual(expected)
  })
})

describe('most blogs', () => {
  test('of empty list is null', () => {
    expect(listHelper.mostBlogs([])).toBe(null)
  })
  test('of one blog is the author of that blog', () => {
    const expected = { author: oneBlog[0].author, blogs: 1 }
    expect(listHelper.mostBlogs(oneBlog)).toEqual(expected)
  })
  test('of list of blogs is the author with the most blogs', () => {
    const expected = { author: 'Robert C. Martin', blogs: 3 }
    expect(listHelper.mostBlogs(initialBlogs)).toEqual(expected)
  })
})

describe('most likes', () => {
  test('of empty list is null', () => {
    expect(listHelper.mostLikes([])).toBe(null)
  })
  test('of one blog is the author of that blog with the number of likes of that blog', () => {
    const expected = { author: oneBlog[0].author, likes: oneBlog[0].likes }
    expect(listHelper.mostLikes(oneBlog)).toEqual(expected)
  })
  test('of list of blogs is the author with the most likes', () => {
    const expected = { author: 'Edsger W. Dijkstra', likes: 17 }
    expect(listHelper.mostLikes(initialBlogs)).toEqual(expected)
  })
})

describe('when viewing existing blogs', () => {
  test('content type is JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('length matches length of initial dataset', async () => {
    const { body } = await api.get('/api/blogs')
    expect(body).toHaveLength(initialBlogs.length)
  })
  test('returned objects have an id property', async () => {
    const { body } = await api.get('/api/blogs')
    body.forEach((blog) => {
      expect(blog.id).toBeDefined()
    })
  })
})

describe('when viewing one blog', () => {
  test('the content is received correctly', async () => {
    const { body: blogs } = await api.get('/api/blogs')
    const expected = blogs[0]
    const { body: blog } = await api.get(`/api/blogs/${expected.id}`)
    expect(blog).toMatchObject(expected)
  })
})

describe('when adding new blogs via POST /api/blogs', () => {
  const newBlog = {
    title: 'New Blog Post',
    author: 'Max Mustermann',
    url: 'http://www.test.de',
    likes: 5
  }
  test('total number of blogs increases by one', async () => {
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
    const { body } = await api.get('/api/blogs')
    expect(body).toHaveLength(initialBlogs.length + 1)
  })
  test('blog content saved correctly', async () => {
    const { body } = await api
      .post('/api/blogs')
      .send(newBlog)
    expect(body).toMatchObject(newBlog)
  })
  test('likes is 0 if not given in request', async () => {
    const { title, author, url } = newBlog
    const { body } = await api
      .post('/api/blogs')
      .send({ title, author, url })
    expect(body.likes).toBe(0)
  })
  test('400 if title and url are missing', async () => {
    const { author, likes }= newBlog
    await api
      .post('/api/blogs')
      .send({ author, likes })
      .expect(400)
  })
})

describe('when deleting blogs', () => {
  test('total number of blogs decreases by one', async () => {
    const { body: blogs } = await api.get('/api/blogs')
    const toBeDeleted = blogs[0]
    await api
      .delete(`/api/blogs/${toBeDeleted.id}`)
      .expect(204)
    const { body } = await api.get('/api/blogs')
    expect(body).toHaveLength(initialBlogs.length - 1)
  })
  test('deleted id is not accessible anymore', async () => {
    const { body: blogs } = await api.get('/api/blogs')
    const toBeDeleted = blogs[0]
    await api
      .delete(`/api/blogs/${toBeDeleted.id}`)
      .expect(204)
    await api
      .get(`/api/blogs/${toBeDeleted.id}`)
      .expect(400)
  })
})

describe('when updating blogs', () => {
  test('blog has new fields after update', async () => {
    const { body: blogs } = await api.get('/api/blogs')
    const toBeUpdated = blogs[0]
    const updateData = { author: 'Update Author', title: 'Update Title', url: 'Update URL' }
    await api
      .put(`/api/blogs/${toBeUpdated.id}`)
      .send(updateData)
      .expect(200)
    const { body } = await api.get(`/api/blogs/${toBeUpdated.id}`)
    expect(body).toMatchObject(updateData)
  })
  test('updating a blog with a wrong id doesnt work', async () => {
    await api
      .put('/api/blogs/123')
      .expect(400)
  })
  test('updating a deleted blog doesnt work', async () => {
    const { body: blogs } = await api.get('/api/blogs')
    const toBeUpdated = blogs[0]
    await api.delete(`/api/blogs/${toBeUpdated.id}`)
    await api.put(`/api/blogs/${toBeUpdated.id}`).expect(400)
  })
})

afterAll((done) => {
  mongoose.connection.close()
  done()
})