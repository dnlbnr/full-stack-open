import { useState, useEffect } from 'react'
import { get } from '../services/user'
import useNotification from '../hooks/useNotification'

const useUser = (id) => {
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)
  const { setError } = useNotification()

  useEffect(() => {
    const initializeUser = async () => {
      setLoading(true)
      try {
        const user = await get(id)
        setUser(user)
        setLoading(false)
      } catch (error) {
        setError('Error while loading user')
      }
    }
    initializeUser()
  }, [setError, id])

  return { user, loading }
}

export default useUser
