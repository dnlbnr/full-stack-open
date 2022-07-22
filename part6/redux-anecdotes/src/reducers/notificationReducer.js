import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: '', timeoutId: null },
  reducers: {
    add(state, action) {
      return action.payload
    },
    clear() {
      return { message: '', timeoutId: null }
    },
  },
})

const { add, clear } = notificationSlice.actions

export const show = (message, displayTime) => {
  return async (dispatch, getState) => {
    const currentNotification = getState().notification
    if (currentNotification.message) {
      clearTimeout(currentNotification.timeoutId)
    }
    const timeoutId = setTimeout(() => {
      dispatch(clear())
    }, displayTime)
    dispatch(add({ message, timeoutId }))
  }
}

export default notificationSlice.reducer
