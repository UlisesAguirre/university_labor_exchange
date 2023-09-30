import React, { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = () => {
    const storedToken = localStorage.getItem('token');
    const decodedToken = jwt_decode(storedToken);

    const userData = {
      email: decodedToken.email,
      username: decodedToken.username,
      userType: decodedToken.role
    }

    setUser(userData);

    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
export { UserProvider };