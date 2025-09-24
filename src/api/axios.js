import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000', // cambia a la URL de tu backend
  withCredentials: true,            // permite cookies si tu backend las usa
});

export default api;
