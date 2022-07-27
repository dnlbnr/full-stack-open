import BlogListEntry from './BlogListEntry'
import useBlogs from '../hooks/useBlogs'
import useLogin from '../hooks/useLogin'
import Collapsible from './Collapsible'
import NewBlog from './NewBlog'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

function BlogList() {
  const { blogs, likeBlog, deleteBlog } = useBlogs()
  const { user } = useLogin()
  const collapisbleForm = useRef()

  const handleDeleteBlog = async (toBeDeleted) => {
    if (window.confirm(`Do you really want to delete ${toBeDeleted.title}?`)) {
      console.log('in app, handle delete of blog', toBeDeleted)
      console.log('with id', toBeDeleted.id)
      deleteBlog(toBeDeleted.id)
    }
  }

  const handleLikeBlog = async (toBeLiked) => {
    likeBlog(toBeLiked)
  }

  return (
    <div>
      <Collapsible ref={collapisbleForm} text="New Blog">
        <NewBlog />
      </Collapsible>
      <h2>blogs for {user.username}</h2>

      {blogs.map((blog) => (
        <Link key={blog.id} to={`/blogs/${blog.id}`}>
          <BlogListEntry
            blog={blog}
            likeBlog={handleLikeBlog}
            deleteBlog={handleDeleteBlog}
          />
        </Link>
      ))}
    </div>
  )
}

export default BlogList
