import axios from 'axios';

const api = axios.create({
  baseURL: 'https://chat-app-bb-tai4.onrender.com/api',
});

export default api;