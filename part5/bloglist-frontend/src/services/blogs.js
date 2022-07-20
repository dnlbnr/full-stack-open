import axios from 'axios';

const baseUrl = '/api/blogs';
let authHeader = window.localStorage.getItem('loggedInUser') || '';

// const config = { headers: { Authorization: authHeader } };

const setAuthHeader = (token) => {
  authHeader = `Bearer ${token}`;
};

const getAll = async () => {
  const { data: blogs } = await axios.get(baseUrl, { headers: { Authorization: authHeader } });
  return blogs;
};

const create = async (values) => {
  const { data: created } = await axios
    .post(baseUrl, values, { headers: { Authorization: authHeader } });
  return created;
};

const remove = async ({ id }) => {
  const { data: result } = await axios.delete(`${baseUrl}/${id}`, { headers: { Authorization: authHeader } });
  return result;
};

const like = async ({ id, ...blog }) => {
  const likedBlog = { ...blog, likes: blog.likes + 1 };
  const { data } = await axios.put(`${baseUrl}/${id}`, likedBlog, { headers: { Authorization: authHeader } });
  return data;
};

export {
  getAll, setAuthHeader, create, like, remove,
};
