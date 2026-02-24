import React,
       { createContext,
         useState,
         useEffect,
         useCallback
       } from 'react';

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user,
         setUser
        ] = useState(null);
  const [notification,
         setNotification
        ] = useState(null);
  const [showNotificationFlag,
         setShowNotificationFlag
        ] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  },
  []);

  const showNotification = useCallback((message, type) => {
    setNotification({ message,
                      type
                    });
    setShowNotificationFlag(true);
    const timer = setTimeout(() => {
      setShowNotificationFlag(false);
      setTimeout(() => {
        setNotification(null);
      },
      500);
    },
    3000);
    return () => clearTimeout(timer);
  },
  []);

  const login = useCallback((username, password) => {
    // Mock authentication
    if (username === 'testuser' && password === 'password123') {
      const mockUser = { username: username };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      showNotification('Login successful!', 'success');
      return true;
    }
    showNotification('Invalid credentials', 'error');
    return false;
  },
  [showNotification]);

  const register = useCallback((username, password) => {
    // Mock registration
    // For this demo, any new username/password combination is valid
    // In a real app, this would involve backend checks
    const mockUser = { username: username };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    showNotification('Registration successful! You are now logged in.', 'success');
    return true;
  },
  [showNotification]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
    showNotification('Logged out successfully', 'success');
  },
  [showNotification]);

  const value = {
    user,
    notification,
    showNotificationFlag,
    login,
    logout,
    register,
    showNotification
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
