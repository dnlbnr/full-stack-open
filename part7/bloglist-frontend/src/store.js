import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notification.reducer'
import blogReducer from './reducers/blog.reducer'
import userReducer from './reducers/user.reducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
  },
})

export default store
