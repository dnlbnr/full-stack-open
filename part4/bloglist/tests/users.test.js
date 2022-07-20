const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const User = require('../models/user')
const { connectDb } = require('../utils/db')

const api = supertest(app)

const initialUsers = [
  { username: 'TestUsername', name: 'Max Mustermann', passwordHash: '123' },
  { username: 'TestUsername2', name: 'Monika Mustermann', passwordHash: '123' }
]

beforeAll(async () => {
  await connectDb()
}, 25000)

beforeEach(async () => {
  await User.deleteMany({})
  for (const user of initialUsers) {
    await new User(user).save()
  }
})

// describe('When accessing all users', () => {
//   test('the users attributes are displayed correctly', async () => {
//     const users = await api.get('/api/users').expect(200)
//     users.forEach((user) => expect(user))
//   })
// })

describe('When adding a user', () => {
  const newUser = { username: 'NewUsername', password:'123123', name: 'Nasti' }
  test('valid users are saved and returned correctly without password', async () => {
    const expectedUser = { username: 'NewUsername', name: 'Nasti', blogs: [] }
    const { body: userFromDb } = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
    expect(userFromDb).toMatchObject(expectedUser)
    expect(userFromDb.password).toBe(undefined)
    expect(userFromDb.passwordHash).toBe(undefined)
  })
  test('missing password leads to 400', async () => {
    const { username, name } = newUser
    await api
      .post('/api/users')
      .send({ username, name })
      .expect(400)
  })
  test('short password leads to 400', async () => {
    const { username, name } = newUser
    await api
      .post('/api/users')
      .send({ username, name, password: '12' })
      .expect(400)
  })
  test('missing username leads to 400', async () => {
    const { password, name } = newUser
    await api
      .post('/api/users')
      .send({ password, name })
      .expect(400)
  })
  test('short username leads to 400', async () => {
    const { password, name } = newUser
    await api
      .post('/api/users')
      .send({ password, name, username: '12' })
      .expect(400)
  })
  test('existing username leads 400', async () => {
    const { username } = initialUsers[0]
    await api
      .post('/api/users')
      .send({ username, name: 'Existing User', password: '123' })
      .expect(400)
  })
})

afterAll((done) => {
  mongoose.connection.close()
  done()
})