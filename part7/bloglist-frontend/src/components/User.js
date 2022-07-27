import { useParams } from 'react-router-dom'
import useUser from '../hooks/useUser'

const User = () => {
  const id = useParams().id
  const { user, loading } = useUser(id)

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
