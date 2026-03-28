import React, { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    if (!saved) return null;
    try {
      const parsed = JSON.parse(saved);
      // Jika data bersarang { token, user }, ambil bagian user-nya saja
      return parsed.user || parsed;
    } catch (e) {
      return null;
    }
  });

  const login = (userData) => {
    // Simpan data lengkap ke localStorage (untuk token dll)
    localStorage.setItem('user', JSON.stringify(userData));
    // Simpan hanya profil user ke state agar role dll mudah diakses
    setUser(userData.user || userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
