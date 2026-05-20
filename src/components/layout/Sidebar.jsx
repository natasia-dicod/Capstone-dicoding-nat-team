import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  MessageCircle,
  BookOpen,
  PenTool,
  AlertTriangle,
  Lightbulb,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Sun,
  Moon,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const menuItems = {
  common: [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/chat', label: 'AI Chat', icon: MessageCircle, badge: 'AI' },
    { path: '/learning', label: 'Materi Belajar', icon: BookOpen },
    { path: '/recommendations', label: 'Rekomendasi', icon: Lightbulb },
  ],
  siswa: [
    { path: '/answer-input', label: 'Jawab Soal', icon: PenTool },
  ],
  guru: [
    { path: '/early-warning', label: 'Early Warning', icon: AlertTriangle },
  ],
  admin: [
    { path: '/early-warning', label: 'Early Warning', icon: AlertTriangle },
  ],
  bottom: [
    { path: '/profile', label: 'Profil', icon: User },
  ],
};

export default function Sidebar({ onCloseMobile }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout, isGuru, isAdmin } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getMenuItems = () => {
    let items = [...menuItems.common];
    if (isGuru) items = [...items, ...menuItems.guru];
    else if (isAdmin) items = [...items, ...menuItems.guru, ...menuItems.siswa];
    else items = [...items, ...menuItems.siswa];
    return items;
  };

  return (
    <aside
      className={`h-full bg-surface border-r border-gray-200 dark:border-white/5 flex flex-col transition-all duration-300 ${
        collapsed ? 'w-[72px]' : 'w-[260px]'
      }`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-gray-200 dark:border-white/5">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-white p-1">
            <img src="/favicon.png" alt="Aplikasi Pintar Logo" className="w-full h-full object-contain" />
          </div>
          {!collapsed && (
            <span className="text-lg font-bold gradient-text whitespace-nowrap">
              Aplikasi Pintar
            </span>
          )}
        </div>
      </div>

      {/* Main Menu */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {getMenuItems().map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onCloseMobile}
            className={({ isActive }) =>
              isActive ? 'nav-item-active' : 'nav-item'
            }
            title={collapsed ? item.label : undefined}
          >
            <item.icon size={20} className="flex-shrink-0" />
            {!collapsed && (
              <>
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-md gradient-bg text-white">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="px-3 pb-3 space-y-1 border-t border-gray-200 dark:border-white/5 pt-3">
        {menuItems.bottom.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onCloseMobile}
            className={({ isActive }) =>
              isActive ? 'nav-item-active' : 'nav-item'
            }
          >
            <item.icon size={20} className="flex-shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}

        {/* User Info */}
        {!collapsed && user && (
          <div className="flex items-center gap-3 px-4 py-3 mt-2 bg-surface-light/30 rounded-xl">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
              {user.name?.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">{user.name}</p>
              <p className="text-xs text-text-muted capitalize">{user.role}</p>
            </div>
          </div>
        )}

        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="nav-item w-full">
          {theme === 'dark' ? <Sun size={20} className="flex-shrink-0" /> : <Moon size={20} className="flex-shrink-0" />}
          {!collapsed && <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>

        {/* Logout */}
        <button onClick={handleLogout} className="nav-item w-full text-danger hover:bg-danger/5 hover:text-danger">
          <LogOut size={20} className="flex-shrink-0" />
          {!collapsed && <span>Keluar</span>}
        </button>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="nav-item w-full justify-center"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          {!collapsed && <span className="text-sm">Perkecil</span>}
        </button>
      </div>
    </aside>
  );
}
