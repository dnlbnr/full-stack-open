import { useState, useEffect, useRef } from 'react';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import login from './services/login';
import {
  setAuthHeader, create, getAll, like,
} from './services/blogs';
import NewBlog from './components/NewBlog';
import Notification from './components/Notification';
import Collapsible from './components/Collapsible';

function App() {
  const [user, setUser] = useState();
  const [blogs, setBlogs] = useState([]);
  const [successNotification, setSuccessNotification] = useState('');
  const [errorNotification, setErrorNotification] = useState('');
  const collapisbleForm = useRef();

  const showSuccess = (text) => {
    setSuccessNotification(text);
    setTimeout(() => {
      setSuccessNotification('');
    }, 5000);
  };

  const showError = (text) => {
    setErrorNotification(text);
    setTimeout(() => {
      setErrorNotification('');
    }, 5000);
  };

  const showNotification = {
    success: showSuccess,
    error: showError,
  };

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser');
    if (loggedInUserJSON) {
      const loggedInUser = JSON.parse(loggedInUserJSON);
      setUser(loggedInUser);
      setAuthHeader(loggedInUser.token);
    }
  }, []);

  useEffect(() => {
    const getBlogs = async () => {
      const blogsFromBackend = await getAll();
      setBlogs(blogsFromBackend);
    };
    try {
      getBlogs();
    } catch (error) {
      showNotification.error('Something went wrong while receiving the blogs');
    }
  }, []);

  const handleLogin = async (formValues) => {
    const { username, password } = formValues;
    try {
      const loggedInUser = await login(username, password);
      setAuthHeader(loggedInUser.token);
      setUser(loggedInUser);
      window.localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    } catch (error) {
      showError('Wrong username or password');
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser');
    setUser(null);
  };

  const createNewBlog = async (values) => {
    try {
      const newBlog = await create(values);
      setBlogs([...blogs, newBlog]);
      console.log('Before visibility toggle');
      collapisbleForm.current.toggleVisible();
      console.log('After visibility toggle');
      showNotification.success('Blog created successfully');
    } catch (error) {
      showNotification.error('Something went wrong while creating the blog');
    }
  };

  const likeBlog = async (toBeLiked) => {
    try {
      const likedBlog = await like(toBeLiked);
      setBlogs(blogs.map((blog) => (blog.id === likedBlog.id ? likedBlog : blog)));
    } catch (error) {
      showError('Something went wrong while liking the blog');
    }
  };

  return (
    <div>
      {successNotification !== '' && <Notification text={successNotification} success />}
      {errorNotification !== '' && <Notification text={errorNotification} error />}

      {!user
        ? <LoginForm onSubmit={handleLogin} />
        : (
          <div>
            <h1>Blog App</h1>
            <p>
              Logged in user:
              {' '}
              {user.username}
              {' '}
              <button type="button" onClick={handleLogout}>Logout</button>
            </p>
            <Collapsible ref={collapisbleForm} text="New Blog">
              <NewBlog createNewBlog={createNewBlog} showNotification={showNotification} />
            </Collapsible>
            <BlogList
              blogs={blogs}
              user={user}
              showNotification={showNotification}
              likeBlog={likeBlog}
            />
          </div>
        )}
    </div>
  );
}

export default App;
