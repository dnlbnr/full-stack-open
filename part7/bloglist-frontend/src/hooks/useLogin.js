import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { set, clear } from '../reducers/user.reducer'
import useNotification from './useNotification'
import login from '../services/login'
import { setAuthHeader } from '../services/blogs'

const useLogin = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const { setError } = useNotification()

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const loggedInUser = JSON.parse(loggedInUserJSON)
      dispatch(set(loggedInUser))
      setAuthHeader(loggedInUser.token)
    }
  }, [dispatch])

  const handleLogin = async (username, password) => {
    try {
      const loggedInUser = await login(username, password)
      setAuthHeader(loggedInUser.token)
      dispatch(set(loggedInUser))
      window.localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser))
    } catch (error) {
      setError('Failed to login')
    }
  }

  const handleLogout = () => {
    dispatch(clear())
    window.localStorage.removeItem('loggedInUser')
  }

  return { user, login: handleLogin, logout: handleLogout }
}

export default useLogin
