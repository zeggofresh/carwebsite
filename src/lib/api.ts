import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 30000, // 30 seconds timeout
});

// Request interceptor with logging
api.interceptors.request.use((config) => {
  console.log('API Request:', {
    method: config.method?.toUpperCase(),
    url: config.url,
    baseURL: config.baseURL,
    hasToken: !!config.headers.Authorization,
    hasBranchId: !!config.headers['x-branch-id']
  });
  
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  const branchId = localStorage.getItem('selectedBranchId');
  if (branchId) {
    config.headers['x-branch-id'] = branchId;
  }
  return config;
}, (error) => {
  console.error('Request interceptor error:', error);
  return Promise.reject(error);
});

// Response interceptor with detailed logging
api.interceptors.response.use(
  (response) => {
    console.log('API Response Success:', {
      status: response.status,
      url: response.config.url
    });
    return response;
  },
  (error) => {
    console.error('=== API ERROR ===');
    console.error('Error type:', error.code);
    console.error('Error message:', error.message);
    console.error('Response status:', error.response?.status);
    console.error('Response data:', error.response?.data);
    console.error('Request URL:', error.config?.url);
    
    if (error.response?.status === 401) {
      // Token expired or invalid - but don't redirect on login page
      const currentPath = window.location.pathname;
      if (currentPath !== '/login' && currentPath !== '/admin/login') {
        console.error('Authentication error - redirecting to login');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        window.location.href = '/login';
      } else {
        console.error('Auth error on login page - showing error message instead');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
