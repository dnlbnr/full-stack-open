import { createSlice } from '@reduxjs/toolkit'
import { getAll, create, update } from '../services/anecdotes.service'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateState(state, action) {
      const id = action.payload.id
      const anecdote = state.find((anecdote) => anecdote.id === id)
      const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
      return state.map((existingAnecdote) =>
        existingAnecdote.id === id ? votedAnecdote : existingAnecdote,
      )
    },
    addToState(state, action) {
      const anecdote = action.payload
      return [...state, anecdote]
    },
    setState(state, action) {
      return action.payload
    },
  },
})

const { updateState, setState, addToState } = anecdoteSlice.actions

export const initialize = () => {
  return async (dispatch) => {
    const anecdotes = await getAll()
    dispatch(setState(anecdotes))
  }
}

export const add = (anecdote) => {
  return async (dispatch) => {
    const created = await create(anecdote)
    dispatch(addToState(created))
  }
}

export const vote = (id) => {
  return async (dispatch, getState) => {
    const anecdotes = getState().anecdotes
    const toBeUpdated = anecdotes.find((anecdote) => anecdote.id === id)
    const votedAnecdote = { ...toBeUpdated, votes: toBeUpdated.votes + 1 }
    const updated = await update(votedAnecdote)
    dispatch(updateState(updated))
  }
}

export default anecdoteSlice.reducer
