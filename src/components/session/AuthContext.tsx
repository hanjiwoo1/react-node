import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// AuthContext의 타입 선언
interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  login: (credentials: { userId: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  user: string;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);
// AuthProvider 컴포넌트
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState('');
  const navigate = useNavigate();
  
  const temp = import.meta.env.VITE_API_URL
  console.log('temp : ', temp)

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/authCheck`, { withCredentials: true });
        setIsAuthenticated(response.data.isLogin);
        // console.log('response.data : ', response.data)
        setUser(response.data.userId);
      } catch (error) {
        setIsAuthenticated(false);
        setUser('');
      } finally {
        setLoading(false);
      }
    };
    checkLoginStatus();
  }, []);

  const login = async (credentials: { userId: string; password: string }) => {
    try {
      const loginResult = await axios.post(`${import.meta.env.VITE_API_URL}/login`, credentials, { withCredentials: true });
      setIsAuthenticated(true);
      setUser(loginResult.data.userId);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/logout`, {}, { withCredentials: true });
      setIsAuthenticated(false);
      setUser('');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

// 커스텀 훅으로 AuthContext 접근
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
