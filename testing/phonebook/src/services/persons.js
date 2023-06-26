import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  const request = axios.get(baseUrl);
  const nonExisting = { name: 'Does Not Exist', number: 'On Server', id: 999 };
  return request.then((response) => response.data.concat(nonExisting));
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const update = (id, updatedObject) => {
  const url = `${baseUrl}/${id}`;
  const request = axios.put(url, updatedObject);
  return request.then((response) => response.data);
};

const personService = {
  getAll, create, remove, update,
};

export default personService;
