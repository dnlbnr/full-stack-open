import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { comment, get, like, remove } from '../services/blogs'
import useNotification from './useNotification'

const useBlog = (id) => {
  const [blog, setBlog] = useState({})
  const [loading, setLoading] = useState(true)
  const { setSuccess, setError } = useNotification()
  const naviate = useNavigate()

  useEffect(() => {
    const initializeBlog = async () => {
      try {
        setLoading(true)
        const initialBlog = await get(id)
        setBlog(initialBlog)
        setLoading(false)
      } catch (error) {
        setError('Error while loading blog')
      }
    }
    initializeBlog()
  }, [id, setError])

  const likeBlog = async () => {
    try {
      const likedBlog = await like(blog)
      setBlog(likedBlog)
    } catch (error) {
      console.log(error)
      setError('Error while liking blog')
    }
  }

  const deleteBlog = async () => {
    try {
      await remove(id)
      naviate('/')
      setSuccess(`Blog deleted successfully`)
    } catch (error) {
      console.log(error)
      setError('Error while deleting blog')
    }
  }

  const commentOnBlog = async (commentText) => {
    try {
      const commented = await comment(id, commentText)
      setBlog(commented)
    } catch (error) {
      console.log(error)
      setError('Error while commenting')
    }
  }

  return {
    blog,
    loading,
    like: likeBlog,
    remove: deleteBlog,
    comment: commentOnBlog,
  }
}

export default useBlog
