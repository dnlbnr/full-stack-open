import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useNotification from './useNotification'
import { set, add } from '../reducers/blog.reducer'
import { getAll, create } from '../services/blogs'

const useBlogs = () => {
  const dispatch = useDispatch()
  const { setError, setSuccess } = useNotification()
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    const initializeBlogs = async () => {
      const blogs = await getAll()
      const sortedByLikes = blogs.sort((a, b) => a.likes < b.likes)
      dispatch(set(sortedByLikes))
    }
    initializeBlogs()
  }, [dispatch])

  const addBlog = async ({ title, author, url }) => {
    try {
      const created = await create({ title, author, url })
      dispatch(add(created))
      setSuccess(`Blog ${title} created successfully`)
    } catch (error) {
      console.log(error)
      setError('Error while adding blog')
    }
  }

  return { blogs, addBlog }
}

export default useBlogs
