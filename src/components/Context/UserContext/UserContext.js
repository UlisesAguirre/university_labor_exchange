import React, { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");

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
      id: decodedToken.sub,
      email: decodedToken.email,
      username: decodedToken.username,
      userType: decodedToken.role,
      state: decodedToken.state,
      viewOffer: false
    }

    setUser(userData);

    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const viewOffer = () => {
    setUser({
      ...user,
      viewOffer: true
    })
    localStorage.setItem('user', JSON.stringify(user));
  }


  return (
    <UserContext.Provider value={{ user, login, logout, viewOffer }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
export { UserProvider };