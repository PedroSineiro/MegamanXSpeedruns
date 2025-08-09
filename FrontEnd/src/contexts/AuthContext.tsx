import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

interface User {
  id: string;
  username: string;
  email: string;
  isReviewer: boolean;
}

type AuthContextType = {
  user: User | null;
  register: (username: string, password: string, confirmPassword: string, email: string, isReviewer: boolean) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

type LoginResponse = {
    token: string,
    user: User
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post<LoginResponse>('/user/login', { email, password });

      const data = response.data;
      console.log(data);
      localStorage.setItem('token', data.token);
      setUser(data.user);
      navigate('/'); // redireciona para a página inicial
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const register = async (username: string, password: string, confirmPassword: string, email: string, isReviewer: boolean) => {
    try {
      const response = await api.post<LoginResponse>('/user', { username, email, password, confirmPassword, isReviewer });

      const data = response.data;
      console.log(data);
      localStorage.setItem('token', data.token);
      setUser(data.user);
      navigate('/'); // redireciona para a página inicial
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, register, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
