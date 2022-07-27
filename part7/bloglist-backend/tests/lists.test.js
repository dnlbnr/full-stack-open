const listHelper = require('../utils/list_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const app = require('../app')
const { connectDb } = require('../utils/db')
const supertest = require('supertest')
const mongoose = require('mongoose')
const { initialBlogs, oneBlog, initialUser, getAuthHeader, getNewBlog } = require('./test_helper')

const api = supertest(app)

beforeAll(async () => {
  await connectDb()
}, 25000)

beforeEach(async () => {
  const blogsToBeAdded = initialBlogs
  const notFromUser = new Blog({ title: 'Not from user', author: 'Not user', url: 'test.de', likes: 0, user: mongoose.Types.ObjectId(123) })
  const userToBeAdded = initialUser

  await User.deleteMany({})
  const { id } = await new User(userToBeAdded).save()

  await Blog.deleteMany({})
  for (const blog of blogsToBeAdded) {
    await new Blog({ ...blog, user: id }).save()
  }
  await notFromUser.save()
})

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
    const authHeader = await getAuthHeader()
    await api
      .get('/api/blogs')
      .set('Authorization', authHeader)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('length matches length of initial dataset without the additional blog not from user', async () => {
    const authHeader = await getAuthHeader()
    const { body } = await api
      .get('/api/blogs')
      .set('Authorization', authHeader)
      .expect(200)
    expect(body).toHaveLength(initialBlogs.length)
  })

  test('returned objects have an id property', async () => {
    const authHeader = await getAuthHeader()
    const { body } = await api
      .get('/api/blogs')
      .set('Authorization', authHeader)
      .expect(200)

    body.forEach((blog) => {
      expect(blog.id).toBeDefined()
    })
  })

  test('missing auth header produces 401', async () => {
    await api
      .get('/api/blogs')
      .expect(401)
  })
})

describe('when viewing one blog', () => {

  test('the content is received correctly', async () => {
    const authHeader = await getAuthHeader()

    const { body: blogs } = await api
      .get('/api/blogs')
      .set('Authorization', authHeader)

    const expected = blogs[0]

    const { body: blog } = await api
      .get(`/api/blogs/${expected.id}`)
      .set('Authorization', authHeader)
    expect(blog).toMatchObject(expected)
  })
})

describe('when adding new blogs via POST /api/blogs', () => {

  test('total number of blogs increases by one', async () => {
    const authHeader = await getAuthHeader()
    const newBlog = await getNewBlog()

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', authHeader)
      .expect(201)

    const { body } = await api
      .get('/api/blogs')
      .set('Authorization', authHeader)
    expect(body).toHaveLength(initialBlogs.length + 1)
  })

  test('blog content saved correctly', async () => {
    const authHeader = await getAuthHeader()
    const newBlog = await getNewBlog()

    const { body } = await api
      .post('/api/blogs')
      .set('Authorization', authHeader)
      .send(newBlog)
    expect(body).toMatchObject(newBlog)
  })

  test('likes is 0 if not given in request', async () => {
    const authHeader = await getAuthHeader()
    const newBlog = await getNewBlog()
    const { title, author, url } = newBlog

    const { body } = await api
      .post('/api/blogs')
      .set('Authorization', authHeader)
      .send({ title, author, url })
    expect(body.likes).toBe(0)
  })

  test('400 if title and url are missing', async () => {
    const authHeader = await getAuthHeader()
    const newBlog = await getNewBlog()
    const { author, likes } = newBlog

    await api
      .post('/api/blogs')
      .set('Authorization', authHeader)
      .send({ author, likes })
      .expect(400)
  })

  test('missing auth header produces 401', async () => {
    const newBlog = await getNewBlog()
    const { author, likes } = newBlog
    await api
      .post('/api/blogs')
      .send({ author, likes })
      .expect(401)
  })
})

describe('when deleting blogs', () => {

  test('total number of blogs decreases by one', async () => {
    const authHeader = await getAuthHeader()
    const { body: blogs } = await api
      .get('/api/blogs')
      .set('Authorization', authHeader)
    const toBeDeleted = blogs[0]

    await api
      .delete(`/api/blogs/${toBeDeleted.id}`)
      .set('Authorization', authHeader)
      .expect(204)

    const { body } = await api
      .get('/api/blogs')
      .set('Authorization', authHeader)
    expect(body).toHaveLength(initialBlogs.length - 1)
  })

  test('deleted id is not accessible anymore', async () => {
    const authHeader = await getAuthHeader()
    const { body: blogs } = await api
      .get('/api/blogs')
      .set('Authorization', authHeader)
    const toBeDeleted = blogs[0]

    await api
      .delete(`/api/blogs/${toBeDeleted.id}`)
      .set('Authorization', authHeader)
      .expect(204)

    await api
      .get(`/api/blogs/${toBeDeleted.id}`)
      .set('Authorization', authHeader)
      .expect(400)
  })
})

describe('when updating blogs', () => {

  test('blog has new fields after update', async () => {
    const authHeader = await getAuthHeader()
    const updateData = { author: 'Update Author', title: 'Update Title', url: 'Update URL', likes: 1000 }

    const { body: blogs } = await api
      .get('/api/blogs')
      .set('Authorization', authHeader)
      .expect(200)
    const toBeUpdated = blogs[0]

    await api
      .put(`/api/blogs/${toBeUpdated.id}`)
      .set('Authorization', authHeader)
      .send(updateData)
      .expect(200)

    const { body } = await api
      .get(`/api/blogs/${toBeUpdated.id}`)
      .set('Authorization', authHeader)
      .expect(200)

    expect(body).toMatchObject(updateData)
  })

  test('updating a blog with a wrong id doesnt work', async () => {
    const authHeader = await getAuthHeader()
    await api
      .put('/api/blogs/123')
      .set('Authorization', authHeader)
      .expect(400)
  })

  test('updating a deleted blog doesnt work', async () => {
    const authHeader = await getAuthHeader()
    const { body: blogs } = await api
      .get('/api/blogs')
      .set('Authorization', authHeader)
    const toBeUpdated = blogs[0]

    await api
      .delete(`/api/blogs/${toBeUpdated.id}`)
      .set('Authorization', authHeader)
    await api
      .put(`/api/blogs/${toBeUpdated.id}`).expect(400)
      .set('Authorization', authHeader)
  })
})

afterAll((done) => {
  mongoose.connection.close()
  done()
})