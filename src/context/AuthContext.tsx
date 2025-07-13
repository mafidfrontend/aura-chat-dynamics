import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  memberSince: string;
  accountStatus: 'Active' | 'Inactive';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing session
  useEffect(() => {
    const savedUser = localStorage.getItem('chat-user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem('chat-user');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, accept any email/password
    if (email && password) {
      const userData: User = {
        id: '1',
        name: email.split('@')[0],
        email,
        memberSince: '2025-07-13',
        accountStatus: 'Active'
      };
      
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('chat-user', JSON.stringify(userData));
      return true;
    }
    
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, accept any valid input
    if (name && email && password) {
      const userData: User = {
        id: Date.now().toString(),
        name,
        email,
        memberSince: new Date().toISOString().split('T')[0],
        accountStatus: 'Active'
      };
      
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('chat-user', JSON.stringify(userData));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('chat-user');
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('chat-user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      register,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};