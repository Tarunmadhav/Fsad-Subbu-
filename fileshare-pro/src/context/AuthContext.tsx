import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { User, AuthResponse } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = useCallback(async (username: string, _password: string) => {
    try {
      // For frontend-only simulation, we'll create a mock response
      const response: AuthResponse = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            token: 'mock-token-' + Math.random().toString(36).substring(2),
            user: {
              id: '1',
              username,
              displayName: username,
              email: `${username}@example.com`
            }
          });
        }, 1000);
      });

      // Store both token and user data
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      setUser(response.user);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  const register = useCallback(async (userData: Partial<User> & { password: string }) => {
    try {
      // For frontend-only simulation, create a mock response
      const response: AuthResponse = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            token: 'mock-token-' + Math.random().toString(36).substring(2),
            user: {
              id: '1',
              username: userData.username!,
              displayName: userData.displayName || userData.username!,
              email: userData.email!
            }
          });
        }, 1000);
      });

      // Store both token and user data
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      setUser(response.user);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      register
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
