import axios from 'axios';

const baseUrl = '/api/login';

const login = async (username, password) => {
  const result = await axios.post(baseUrl, { username, password });
  const { data: user } = result;
  return user;
};

export default login;
