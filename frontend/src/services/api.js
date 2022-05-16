import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
});

export const createSession = async (email, password) => {
  const response = await api.post('/login', { email, password });
  return response.data;
};

export const getDays = async () => {
    const response = await api.get('/me');
    return response.data.days;
}
