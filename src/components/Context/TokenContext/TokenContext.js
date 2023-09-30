import React, { createContext, useState, useEffect } from 'react';

const TokenContext = createContext();

const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);


  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      
        setToken(storedToken);
    }
  }, []);

  const updateToken = (newToken) => {
      setToken(newToken);
      localStorage.setItem('token', newToken);
  };

    const deleteToken = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <TokenContext.Provider value={{ token, updateToken, deleteToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export default TokenContext;
export { TokenProvider };
