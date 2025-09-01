import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Types
export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request?: any;
}

// Create axios instance with base configuration
const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for cookies, authorization headers with HTTPS
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers = config.headers || {};
      (config.headers as any).Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    // Handle request error
    console.error('Request Error:', error.message);
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const apiEndpoints = {
  // Authentication
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  
  register: (userData: { email: string; password: string; name: string }) =>
    api.post('/auth/register', userData),
  
  // Projects
  getProjects: () => api.get('/projects'),
  
  getProject: (id: string) => api.get(`/projects/${id}`),
  
  // Reports
  submitReport: (reportData: any) => api.post('/reports', reportData),
  
  getReports: () => api.get('/reports'),
  
  // User profile
  getProfile: () => api.get('/user/profile'),
  
  updateProfile: (profileData: any) => api.put('/user/profile', profileData),
};

// Mock API calls for development
export const mockApi = {
  login: async (credentials: { email: string; password: string }) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (credentials.email === 'demo@localgovtrack.ng' && credentials.password === 'demo123') {
      return {
        data: {
          token: 'mock-jwt-token',
          user: {
            id: '1',
            email: credentials.email,
            name: 'Demo User',
          },
        },
      };
    }
    
    throw new Error('Invalid credentials');
  },
  
  getProjects: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      data: [
        {
          id: '1',
          title: 'Ikeja Primary Healthcare Center',
          location: 'Ikeja LGA, Lagos',
          category: 'Healthcare',
          progress: 85,
          budget: 85000000,
          endDate: '2023-12-31',
        },
        {
          id: '2',
          title: 'Surulere Road Rehabilitation',
          location: 'Surulere LGA, Lagos',
          category: 'Infrastructure',
          progress: 45,
          budget: 120000000,
          endDate: '2024-03-31',
        },
        {
          id: '3',
          title: 'Alimosho Public School Renovation',
          location: 'Alimosho LGA, Lagos',
          category: 'Education',
          progress: 92,
          budget: 65000000,
          endDate: '2023-11-30',
        },
      ],
    };
  },
};

export default api;
