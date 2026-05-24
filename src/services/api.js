import axios from 'axios';

// Get base URL from environment or fallback to localhost
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Add a reasonable timeout so fallbacks trigger quickly if backend is down
  timeout: 5000,
});

// Add a request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle global errors (like 401 Unauthorized)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Hanya redirect ke login jika 401 BUKAN berasal dari endpoint login itu sendiri
    if (error.response && error.response.status === 401) {
      const isLoginRequest = error.config.url.includes('/api/auth/login');
      if (!isLoginRequest) {
        localStorage.removeItem('token');
        localStorage.removeItem('edumind_user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
