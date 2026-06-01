import { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers } from '../mock/data';
import api from '../services/api';

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
    try {
      // Try real API first
      const response = await api.post('/api/auth/login', { email, password });
      const { token, user: safeUser } = response.data.data;
      setUser(safeUser);
      localStorage.setItem('edumind_user', JSON.stringify(safeUser));
      localStorage.setItem('token', token);
      return safeUser;
    } catch (error) {
      console.warn('Real API failed, falling back to mock login', error);
      // Fallback to Mock authentication
      const foundUser = mockUsers.find(
        (u) => u.email === email && u.password === password
      );
      if (!foundUser) {
        throw new Error('Email atau password salah');
      }
      const { password: _, ...safeUser } = foundUser;
      setUser(safeUser);
      localStorage.setItem('edumind_user', JSON.stringify(safeUser));
      // Mock token
      localStorage.setItem('token', 'mock_token_123');
      return safeUser;
    }
  };

  const register = async (name, email, password, role) => {
    try {
      // Map Indonesian role names to database enum values ('student' or 'teacher')
      const apiRole = role === 'siswa' ? 'student' : role === 'guru' ? 'teacher' : role;
      
      // Register dulu
      await api.post('/api/auth/register', { name, email, password, role: apiRole });

      // Lalu auto-login agar token tersimpan (backend register tidak mengembalikan token)
      const loginRes = await api.post('/api/auth/login', { email, password });
      const { token, user: safeUser } = loginRes.data.data;
      setUser(safeUser);
      localStorage.setItem('edumind_user', JSON.stringify(safeUser));
      localStorage.setItem('token', token);
      return safeUser;
    } catch (error) {
      console.warn('Real API failed, falling back to mock register', error);
      // Mock registration fallback
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
      localStorage.setItem('token', 'mock_token_123');
      return newUser;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('edumind_user');
    localStorage.removeItem('token');
  };

  const isGuru = user?.role === 'guru' || user?.role === 'teacher';
  const isSiswa = user?.role === 'siswa' || user?.role === 'student';
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
