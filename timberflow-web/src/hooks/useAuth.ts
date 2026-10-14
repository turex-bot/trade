import { useState, useEffect } from 'react';
import { authService } from '../services/auth.service';
import { User } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = authService.getToken();
      if (token) {
        try {
          const response = await authService.getProfile();
          if (response.code === 200 && response.data) {
            setUser(response.data);
          }
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
          authService.logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authService.login({ email, password });
    if (response.code === 200 && response.data) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setUser(response.data.user);
      return { success: true };
    }
    return { success: false, message: response.message };
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!user;
  };

  const hasRole = (role: string) => {
    return user?.role === role;
  };

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated,
    hasRole,
  };
};
