import axios from 'axios'

const baseUrl = '/api/blogs'
let authHeader = window.localStorage.getItem('loggedInUser')
  ? 'Bearer ' + JSON.parse(window.localStorage.getItem('loggedInUser')).token
  : ''

export const setAuthHeader = (token) => {
  authHeader = `Bearer ${token}`
}

export const getAll = async () => {
  const { data: blogs } = await axios.get(baseUrl, {
    headers: { Authorization: authHeader },
  })
  return blogs
}

export const get = async (id) => {
  const { data: blog } = await axios.get(`${baseUrl}/${id}`, {
    headers: { Authorization: authHeader },
  })
  return blog
}

export const create = async (values) => {
  const { data: created } = await axios.post(baseUrl, values, {
    headers: { Authorization: authHeader },
  })
  return created
}

export const remove = async (id) => {
  const { data: result } = await axios.delete(`${baseUrl}/${id}`, {
    headers: { Authorization: authHeader },
  })
  return result
}

export const like = async ({ id, ...blog }) => {
  const likedBlog = { ...blog, likes: blog.likes + 1 }
  const { data } = await axios.put(`${baseUrl}/${id}`, likedBlog, {
    headers: { Authorization: authHeader },
  })
  return data
}

export const comment = async (id, comment) => {
  const body = { comment }
  const { data } = await axios.post(`${baseUrl}/${id}/comments`, body, {
    headers: { Authorization: authHeader },
  })
  return data
}
