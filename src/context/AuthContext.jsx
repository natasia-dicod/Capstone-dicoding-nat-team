import { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers } from '../mock/data';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for persisted session
    const savedUser = localStorage.getItem('edumind_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock authentication
    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (!foundUser) {
      throw new Error('Email atau password salah');
    }
    const { password: _, ...safeUser } = foundUser;
    setUser(safeUser);
    localStorage.setItem('edumind_user', JSON.stringify(safeUser));
    return safeUser;
  };

  const register = async (name, email, password, role) => {
    // Mock registration
    const exists = mockUsers.find((u) => u.email === email);
    if (exists) {
      throw new Error('Email sudah terdaftar');
    }
    const newUser = {
      id: Date.now(),
      name,
      email,
      role,
      avatar: null,
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    localStorage.setItem('edumind_user', JSON.stringify(newUser));
    return newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('edumind_user');
  };

  const isGuru = user?.role === 'guru';
  const isSiswa = user?.role === 'siswa';
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, isGuru, isSiswa, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
