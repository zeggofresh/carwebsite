import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 30000, // 30 seconds timeout
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  const branchId = localStorage.getItem('selectedBranchId');
  if (branchId) {
    config.headers['x-branch-id'] = branchId;
  }
  return config;
});

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      console.error('Authentication error - redirecting to login');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
