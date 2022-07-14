import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getAll = () => axios.get(baseUrl).then(({ data }) => data);

const create = (person) => axios.post(baseUrl, person).then(({ data }) => data);

const remove = (id) => {
  const url = `${baseUrl}/${id}`;
  return axios.delete(url);
};

const update = (id, data) => {
  const url = `${baseUrl}/${id}`;
  return axios.put(url, data).then(({ data }) => data);
};
export default { getAll, create, remove, update };
