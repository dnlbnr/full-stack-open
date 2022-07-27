import { useEffect } from 'react'
import { useState } from 'react'
import { getAll } from '../services/user'
import useNotification from './useNotification'

const useUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const { setError } = useNotification()

  useEffect(() => {
    const initializeUsers = async () => {
      setLoading(true)
      const users = await getAll()
      setLoading(false)
      setUsers(users)
    }
    try {
      initializeUsers()
    } catch (error) {
      setError('error while loading users')
    }
  }, [setError])

  return { users, loading }
}

export default useUsers
