import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [globalResponseData, setGlobalResponseData] = useState(null);

  return (
    <AuthContext.Provider value={{ globalResponseData, setGlobalResponseData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
