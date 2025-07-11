import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: import.meta.env.REACT_APP_API_BASE_URL || 'http://localhost:3000',
});
