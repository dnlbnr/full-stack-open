import { Link } from 'react-router-dom'
import useLogin from '../hooks/useLogin'

const Navigation = () => {
  const { user, logout } = useLogin()

  return (
    <div className="navbar">
      <span className="navbar__product">Blog App</span>
      <span className="navbar__links">
        <Link className="navItem" to="/">
          Blogs
        </Link>{' '}
        <Link className="navItem" to="/users">
          Users
        </Link>{' '}
      </span>
      <span className="navbar__user">
        Logged in user: {user.username}{' '}
        <button type="button" onClick={() => logout()}>
          Logout
        </button>
      </span>
    </div>
  )
}

export default Navigation
