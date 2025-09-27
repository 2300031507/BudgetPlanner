import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        // Handle specific error cases based on status code or error message
        if (response.status === 401) {
          // Authentication failed
          return { 
            success: false, 
            error: data.error || 'Incorrect email or password',
            status: 'unauthorized'
          };
        } else if (response.status === 400) {
          // Bad request - likely missing fields
          return { 
            success: false, 
            error: data.error || 'Please provide both email and password',
            status: 'bad_request'
          };
        } else {
          // Other errors
          return { 
            success: false, 
            error: data.error || 'Login failed. Please try again later.',
            status: 'error'
          };
        }
      }

      // Successful login
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userData', JSON.stringify(data.user));

      setUser(data.user);
      setIsAuthenticated(true);

      return { 
        success: true, 
        user: data.user,
        message: data.message || 'Login successful'
      };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: 'Failed to connect to server. Please check your internet connection and try again.',
        status: 'network_error'
      };
    }
  };

  const checkEmailAvailability = async (email) => {
    try {
      const response = await fetch(
        `/api/auth/check-email?email=${encodeURIComponent(email)}`,
        { method: 'GET', headers: { 'Content-Type': 'application/json' } }
      );

      if (!response.ok) {
        throw new Error('Failed to check email availability');
      }

      return await response.json();
    } catch (error) {
      console.error('Email check error:', error);
      return { 
        exists: false, 
        message: 'Could not verify email availability',
        status: 'error'
      };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const emailCheck = await checkEmailAvailability(email);

      if (emailCheck.exists) {
        return { 
          success: false, 
          error: emailCheck.message || 'Email is already registered', 
          status: 'email_exists'
        };
      }

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        // Handle specific error cases
        if (response.status === 400) {
          // Bad request - likely validation error
          return { 
            success: false, 
            error: data.error || 'Invalid information provided',
            status: 'validation_error'
          };
        } else {
          // Other errors
          return { 
            success: false, 
            error: data.error || 'Signup failed. Please try again later.',
            status: 'error'
          };
        }
      }

      // Successful signup
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userData', JSON.stringify(data.user));

      setUser(data.user);
      setIsAuthenticated(true);

      return { 
        success: true, 
        user: data.user, 
        status: 'user_created',
        message: data.message || 'User registered successfully'
      };
    } catch (error) {
      console.error('Signup error:', error);
      return { 
        success: false, 
        error: 'Failed to connect to server. Please check your internet connection and try again.',
        status: 'network_error'
      };
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('authToken');
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
    }
  };

  const getCurrentUser = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/auth/me', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch current user');
      }

      return await response.json();
    } catch (error) {
      console.error('Get user error:', error);
      return null;
    }
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    signup,
    logout,
    getCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
