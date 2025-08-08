// Authentication utilities

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

// Local storage keys
const AUTH_TOKEN_KEY = 'authToken';
const USER_DATA_KEY = 'userData';

// Get auth token from localStorage
export const getAuthToken = (): string | null => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

// Set auth token in localStorage
export const setAuthToken = (token: string): void => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
};

// Remove auth token from localStorage
export const removeAuthToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(USER_DATA_KEY);
};

// Get user data from localStorage
export const getUserData = (): User | null => {
  const userData = localStorage.getItem(USER_DATA_KEY);
  return userData ? JSON.parse(userData) : null;
};

// Set user data in localStorage
export const setUserData = (user: User): void => {
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const token = getAuthToken();
  const userData = getUserData();
  return !!(token && userData);
};

// Get current auth state
export const getAuthState = (): AuthState => {
  return {
    isAuthenticated: isAuthenticated(),
    user: getUserData(),
    token: getAuthToken(),
  };
};

// Login function
export const login = async (email: string, password: string): Promise<User> => {
  try {
    // This would typically call your API
    // For now, using mock authentication
    if (email === 'demo@youthgovtrack.ng' && password === 'demo123') {
      const user: User = {
        id: '1',
        email,
        name: 'Demo User',
      };
      
      const token = 'mock-jwt-token-' + Date.now();
      
      setAuthToken(token);
      setUserData(user);
      
      return user;
    }
    
    throw new Error('Invalid credentials');
  } catch (error) {
    throw error;
  }
};

// Logout function
export const logout = (): void => {
  removeAuthToken();
  // Redirect to login page
  window.location.href = '/login';
};

// Token validation (mock implementation)
export const validateToken = async (token: string): Promise<boolean> => {
  try {
    // In a real app, you'd validate the token with your API
    // For now, just check if it exists and is not expired
    return token.startsWith('mock-jwt-token');
  } catch (error) {
    return false;
  }
};

// Refresh token (mock implementation)
export const refreshToken = async (): Promise<string | null> => {
  try {
    const currentToken = getAuthToken();
    if (!currentToken) return null;
    
    // In a real app, you'd call your refresh token endpoint
    const newToken = 'mock-jwt-token-refreshed-' + Date.now();
    setAuthToken(newToken);
    
    return newToken;
  } catch (error) {
    logout();
    return null;
  }
};

// Check if token is expired (mock implementation)
export const isTokenExpired = (token: string): boolean => {
  try {
    // In a real app, you'd decode the JWT and check the expiration
    // For mock purposes, assume tokens don't expire
    return false;
  } catch (error) {
    return true;
  }
};

// Format user display name
export const formatUserName = (user: User): string => {
  return user.name || user.email.split('@')[0];
};

// Get user initials for avatar
export const getUserInitials = (user: User): string => {
  if (user.name) {
    return user.name
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
  
  return user.email.charAt(0).toUpperCase();
};
