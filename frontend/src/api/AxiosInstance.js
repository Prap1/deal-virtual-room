import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',  // Adjust the base URL based on your backend
});

// Interceptor to attach the token to every request
AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Attach token to headers
    }
    return config;
  },
  (error) => Promise.reject(error)  // Forward the error if token handling fails
);

// Optional: Interceptor for handling errors globally
AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific error cases globally (e.g., token expiry)
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access here, like redirecting to login page
      localStorage.removeItem('token'); // Remove invalid token
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;
