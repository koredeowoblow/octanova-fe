import axios from 'axios';

// Ensure all API calls go over HTTPS only (assuming APP_URL or similar environment var)
const baseURL = import.meta.env.VITE_API_URL || 'https://api.octanova.finance';
if (baseURL.startsWith('http://')) {
  console.warn('SECURITY VIOLATION: HTTP endpoint detected. Enforcing HTTPS.');
}

const api = axios.create({
  baseURL: baseURL.replace(/^http:\/\//i, 'https://'), // Strict HTTPS
  timeout: 30000, // 30 seconds request timeout
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    // Check for valid JWT token in localStorage
    const token = localStorage.getItem('jwt_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Retry logic only on network errors (no response from server), max 2 retries
    if (!error.response && (!originalRequest._retryCount || originalRequest._retryCount < 2)) {
      originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;
      return api(originalRequest);
    }

    // On 401 response from any API call, clear localStorage and redirect to /login immediately.
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('jwt_token');
      // Additional sensitive keys to clear
      localStorage.removeItem('user_data');
      
      // Force redirect avoiding React Router context if needed, or dispatch event
      window.location.href = '/login';
    }

    // Never expose raw API error messages to the user. Map them.
    const customError = new Error('An unexpected network error occurred. Please try again.');
    (customError as any).originalMessage = error.message;

    return Promise.reject(customError);
  }
);

export default api;
