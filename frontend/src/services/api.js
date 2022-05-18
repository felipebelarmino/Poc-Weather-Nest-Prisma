import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
});

export const createSession = async (email, password) => {
  const response = await api.post('/login', { email, password });
  return response.data;
};

export const getMyFavoriteDays = async () => {
  const response = await api.get('/me');
  return response.data.days;
};

export const getDays = async (city, state) => {
  const response = await api.get('/weather', {
    params: { city: city, state: state },
  });
  
  return response.data.results.forecast;
};
