import axios from 'axios'

const baseUrl = '/api/users'

export const getAll = async () => {
  const result = await axios.get(baseUrl)
  const { data: users } = result
  return users
}

export const get = async (id) => {
  const result = await axios.get(`${baseUrl}/${id}`)
  const { data: user } = result
  return user
}
