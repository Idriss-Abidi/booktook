import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,  // 10 seconds
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
    config => {
      // For example, add a token before sending request
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    error => Promise.reject(error)
  );
  
  api.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        console.warn('Unauthorized! Redirecting...');
        // handle logout or redirect here
      }
      return Promise.reject(error);
    }
  );
  

export default api;
