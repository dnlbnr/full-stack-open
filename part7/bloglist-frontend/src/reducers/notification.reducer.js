import { createSlice } from '@reduxjs/toolkit'

const displayTime = 5000

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: '',
    type: '',
    timeoutId: null,
  },
  reducers: {
    addSuccess(state, action) {
      if (state.timeoutId) clearTimeout(state.timeoutId)
      const { message, timeoutId } = action.payload
      return { message, timeoutId, type: 'success' }
    },
    addError(state, action) {
      if (state.timeoutId) clearTimeout(state.timeoutId)
      const { message, timeoutId } = action.payload
      return { message, timeoutId, type: 'error' }
    },
    clear(state, action) {
      return { message: '', timeoutId: null, type: '' }
    },
  },
})

const { addSuccess, addError, clear } = notificationSlice.actions

export const processSuccess = (message) => {
  return async (dispatch, getState) => {
    const timeoutId = setTimeout(() => {
      dispatch(clear())
    }, displayTime)
    dispatch(addSuccess({ message, timeoutId }))
  }
}

export const processError = (message) => {
  return async (dispatch, getState) => {
    const timeoutId = setTimeout(() => {
      dispatch(clear())
    }, displayTime)
    dispatch(addError({ message, timeoutId }))
  }
}

export default notificationSlice.reducer
