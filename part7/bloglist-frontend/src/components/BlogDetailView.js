import { useParams } from 'react-router-dom'
import useBlog from '../hooks/useBlog'
import NewBlogComment from './NewBlogComment'

const BlogDetailView = () => {
  const id = useParams().id
  const { blog, like, remove, comment, loading } = useBlog(id)

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.url}</p>
      <p>
        {blog.likes} likes{' '}
        <button type="button" onClick={() => like()}>
          Like
        </button>
      </p>
      <p>Added by {blog.user.name}</p>
      <p>
        <button type="button" onClick={() => remove()}>
          Delete
        </button>
      </p>
      <NewBlogComment comment={comment} />
      {blog.comments.length > 0 && (
        <div>
          <h3>comments</h3>
          <ul>
            {blog.comments.map((comment, i) => (
              <li key={i}>{comment}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default BlogDetailView
