import { useState, useEffect, useRef } from 'react';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import login from './services/login';
import {
  setAuthHeader, create, getAll, like, remove,
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
      const sortedByLikes = blogsFromBackend.sort((a, b) => a.likes < b.likes);
      setBlogs(sortedByLikes);
    };
    if (user) {
      try {
        getBlogs();
      } catch (error) {
        showNotification.error('Something went wrong while receiving the blogs');
      }
    }
  }, [user]);

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

  const handleCreateBlog = async (values) => {
    try {
      const newBlog = await create(values);
      setBlogs([...blogs, newBlog]);
      collapisbleForm.current.toggleVisible();
      showNotification.success('Blog created successfully');
    } catch (error) {
      showNotification.error('Something went wrong while creating the blog');
    }
  };

  const handleLikeBlog = async (toBeLiked) => {
    try {
      const likedBlog = await like(toBeLiked);
      setBlogs(blogs.map((blog) => (blog.id === likedBlog.id ? likedBlog : blog)));
    } catch (error) {
      showError('Something went wrong while liking the blog');
    }
  };

  const handleDeleteBlog = async (toBeDeleted) => {
    if (window.confirm(`Do you really want to delete ${toBeDeleted.title}?`)) {
      try {
        await remove(toBeDeleted);
        setBlogs(blogs.filter((blog) => blog.id !== toBeDeleted.id));
      } catch (error) {
        showError('Something went wrong while deleting the blog');
      }
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
              <NewBlog createNewBlog={handleCreateBlog} showNotification={showNotification} />
            </Collapsible>
            <BlogList
              blogs={blogs}
              user={user}
              showNotification={showNotification}
              likeBlog={handleLikeBlog}
              deleteBlog={handleDeleteBlog}
            />
          </div>
        )}
    </div>
  );
}

export default App;
