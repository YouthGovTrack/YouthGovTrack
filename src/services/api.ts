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
});

// Response interceptor to handle errors
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    console.error('API Error:', error.message);
    return Promise.reject(error);
  }
);

// API endpoints
export const apiEndpoints = {
  // Projects
  getProjects: () => api.get('/projects'),
  
  getProject: (id: string) => api.get(`/projects/${id}`),
  
  // Reports
  submitReport: (reportData: any) => api.post('/reports', reportData),
  
  getReports: () => api.get('/reports'),
};

// Mock API calls for development
export const mockApi = {
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
