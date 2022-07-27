import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import useNotification from './hooks/useNotification'
import useLogin from './hooks/useLogin'
import Users from './components/Users'
import User from './components/User'
import BlogDetailView from './components/BlogDetailView'

function App() {
  const { user } = useLogin()
  const { notification } = useNotification()

  return (
    <div className="container">
      {!user ? (
        <LoginForm />
      ) : (
        <div>
          <Navigation />
          <div className="content-area">
            <Routes>
              <Route path="/" element={<BlogList />} />
              <Route path="/blogs" element={<BlogList />} />
              <Route path="/blogs/:id" element={<BlogDetailView />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<User />} />
            </Routes>
          </div>
        </div>
      )}
      {notification && notification.type === 'success' && (
        <Notification text={notification.message} success />
      )}
      {notification && notification.type === 'error' && (
        <Notification text={notification.message} error />
      )}
    </div>
  )
}

export default App
