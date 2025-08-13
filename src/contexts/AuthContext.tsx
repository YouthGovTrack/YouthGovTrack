import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  state: string;
  lga: string;
  role: 'citizen' | 'champion' | 'admin';
  joinDate: string;
  isVerified: boolean;
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  state: string;
  lga: string;
  password: string;
  profileImage?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing user session on app load
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock login - in real app, this would validate credentials
    const mockUser: User = {
      id: Date.now().toString(),
      firstName: 'John',
      lastName: 'Doe',
      email: email,
      phone: '+234 801 234 5678',
      state: 'Lagos',
      lga: 'Lagos Island',
      role: 'citizen',
      joinDate: new Date().toISOString(),
      isVerified: true,
      profileImage: '/citizen1.png' // Default profile image
    };
    
    localStorage.setItem('currentUser', JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const register = async (userData: RegisterData): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newUser: User = {
      id: Date.now().toString(),
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      state: userData.state,
      lga: userData.lga,
      role: 'citizen',
      joinDate: new Date().toISOString(),
      isVerified: false,
      profileImage: userData.profileImage || '/citizen1.png' // Use uploaded image or default
    };

    localStorage.setItem('currentUser', JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = (): void => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  const updateProfile = (updates: Partial<User>): void => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
