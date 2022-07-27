import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    add(state, action) {
      const newBlog = action.payload
      return [...state, newBlog]
    },
    drop(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
    set(state, action) {
      return action.payload
    },
    replace(state, action) {
      const updatedBlog = action.payload
      return state.map((existing) =>
        existing.id === updatedBlog.id ? updatedBlog : existing
      )
    },
  },
})

export const { add, drop, set, replace } = blogSlice.actions

export default blogSlice.reducer
