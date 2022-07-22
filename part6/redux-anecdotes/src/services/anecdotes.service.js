import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export async function getAll() {
  const { data } = await axios.get(baseUrl)
  return data
}

export async function create(content) {
  const anecdote = { content, votes: 0 }
  const { data } = await axios.post(baseUrl, anecdote)
  return data
}

export async function update({ id, ...anecdote }) {
  const { data } = await axios.put(`${baseUrl}/${id}`, anecdote)
  return data
}
