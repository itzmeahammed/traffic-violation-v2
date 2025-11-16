import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for existing session
    const token = Cookies.get('auth_token');
    const userData = localStorage.getItem('user_data');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing user data:', error);
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      setLoading(true);
      
      // Simulate API call - replace with actual API endpoint
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          if (credentials.email === 'admin@traffic.gov' && credentials.password === 'admin123') {
            resolve({
              success: true,
              user: {
                id: '1',
                name: 'Traffic Admin',
                email: 'admin@traffic.gov',
                role: 'government',
                avatar: null
              },
              token: 'mock_jwt_token_admin'
            });
          } else if (credentials.email && credentials.password) {
            resolve({
              success: true,
              user: {
                id: '2',
                name: 'Ahammed',
                email: credentials.email,
                role: 'citizen',
                avatar: null,
                vehicleNumber: 'MH12AB1234'
              },
              token: 'mock_jwt_token_user'
            });
          } else {
            resolve({ success: false, message: 'Invalid credentials' });
          }
        }, 1000);
      });

      if (response.success) {
        setUser(response.user);
        setIsAuthenticated(true);
        Cookies.set('auth_token', response.token, { expires: 7 });
        localStorage.setItem('user_data', JSON.stringify(response.user));
        return { success: true };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      return { success: false, message: 'Login failed. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      
      // Simulate API call - replace with actual API endpoint
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            user: {
              id: Date.now().toString(),
              name: userData.name,
              email: userData.email,
              role: 'citizen',
              avatar: null,
              vehicleNumber: userData.vehicleNumber,
              phone: userData.phone
            },
            token: 'mock_jwt_token_new_user'
          });
        }, 1500);
      });

      if (response.success) {
        setUser(response.user);
        setIsAuthenticated(true);
        Cookies.set('auth_token', response.token, { expires: 7 });
        localStorage.setItem('user_data', JSON.stringify(response.user));
        return { success: true };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      return { success: false, message: 'Registration failed. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    Cookies.remove('auth_token');
    localStorage.removeItem('user_data');
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
