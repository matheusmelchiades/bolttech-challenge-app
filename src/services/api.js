import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.applyToken = token => {
  api.defaults.headers.common['Authorization'] = token;
};

export default api;
