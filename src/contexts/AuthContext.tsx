import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, LoginCredentials, AuthContextType } from '../types';
import { EnhancedPermissionsService } from '../services/enhancedPermissionsService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    // Get demo users from EnhancedPermissionsService
    const demoUsers = EnhancedPermissionsService.getDemoUsers();
    
    const { email, password } = credentials;
    
    // Find user by email and simple password validation
    const foundUser = demoUsers.find(user => {
      const expectedPassword = user.role + '123'; // Simple pattern: admin123, staff123, etc.
      return user.email === email && password === expectedPassword;
    });

    if (foundUser) {
      setUser(foundUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(foundUser));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
