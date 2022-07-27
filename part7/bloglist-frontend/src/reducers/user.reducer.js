import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    set(state, action) {
      return action.payload
    },
    clear(state, action) {
      return null
    },
  },
})

export const { set, clear } = userSlice.actions

export default userSlice.reducer
