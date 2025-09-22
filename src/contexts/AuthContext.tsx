import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  state: string;
  lga: string;
  role: 'citizen' | 'admin';
  joinDate: string;
  isVerified: boolean;
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Static default user - no authentication needed
  const [user] = useState<User>({
    id: 'default-user',
    firstName: 'Community',
    lastName: 'Member',
    email: 'user@youthgovtrack.com',
    phone: '+234 801 234 5678',
    state: 'Nigeria',
    lga: 'All Areas',
    role: 'citizen',
    joinDate: new Date().toISOString(),
    isVerified: true,
    profileImage: '/citizen1.png'
  });

  const value: AuthContextType = {
    user
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
