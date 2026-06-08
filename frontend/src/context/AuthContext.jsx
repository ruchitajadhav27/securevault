import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [encryptionKeyBase64, setEncryptionKeyBase64] = useState(null);

  const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, { username, password });
    setToken(response.data.token);
    setEncryptionKeyBase64(response.data.encryptionKeyBase64);
    return response.data;
  };

  const register = async (username, password) => {
    const response = await axios.post(`${API_URL}/auth/register`, { username, password });
    return response.data;
  };

  const logout = () => {
    setToken(null);
    setEncryptionKeyBase64(null);
  };

  return (
    <AuthContext.Provider value={{ token, encryptionKeyBase64, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
