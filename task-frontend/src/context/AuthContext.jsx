import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('userEmail');
    const username = localStorage.getItem('username');
    const profilePicture = localStorage.getItem('profilePicture');
    if (token && userEmail && username) {
      setUser({ username, email: userEmail, profilePicture: profilePicture || '', token });
    }
    setLoading(false);
  }, []);

  const register = async (username, email, password, profilePicture = '') => {
    try {
      await axios.post(`${API_URL}/auth/register`, {
        username,
        email,
        password,
        profilePicture,
      });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed',
      };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      const { token, email: userEmail, username: userName, profilePicture } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('userEmail', userEmail);
      localStorage.setItem('username', userName);
      localStorage.setItem('profilePicture', profilePicture || '');
      
      setUser({ username: userName, email: userEmail, profilePicture: profilePicture || '', token });
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('username');
    localStorage.removeItem('profilePicture');
    setUser(null);
  };

  const updateUser = async (userData) => {
    try {
      const response = await axios.put(
        `${API_URL}/auth/profile`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      const { token, email: userEmail, username: userName, profilePicture } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('userEmail', userEmail);
      localStorage.setItem('username', userName);
      localStorage.setItem('profilePicture', profilePicture || '');
      
      setUser({ username: userName, email: userEmail, profilePicture: profilePicture || '', token });
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Update failed',
      };
    }
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;

