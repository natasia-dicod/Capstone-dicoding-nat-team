import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  // MessageCircle,
  BookOpen,
  PenTool,
  AlertTriangle,
  Lightbulb,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  // Sparkles,
  Sun,
  Moon,
  Globe,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

const menuItems = {
  common: [
    { path: '/dashboard', key: 'nav.dashboard', icon: LayoutDashboard },
    { path: '/learning', key: 'nav.learning', icon: BookOpen },
    { path: '/recommendations', key: 'nav.recommendations', icon: Lightbulb },
  ],
  siswa: [
    { path: '/early-warning', key: 'nav.earlyWarning', icon: AlertTriangle },
    { path: '/answer-input', key: 'nav.answerInput', icon: PenTool },
  ],
  guru: [
    { path: '/early-warning', key: 'nav.earlyWarning', icon: AlertTriangle },
  ],
  admin: [
    { path: '/early-warning', key: 'nav.earlyWarning', icon: AlertTriangle },
  ],
  bottom: [
    { path: '/profile', key: 'nav.profile', icon: User },
  ],
};

export default function Sidebar({ onCloseMobile }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout, isGuru, isAdmin } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
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
    
    // Hapus duplikat menu berdasarkan path (misal jika Admin punya akses guru & siswa)
    return items.filter((item, index, self) => 
      index === self.findIndex((t) => t.path === item.path)
    );
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
            title={collapsed ? t(item.key) : undefined}
          >
            <item.icon size={20} className="flex-shrink-0" />
            {!collapsed && (
              <>
                <span className="flex-1">{t(item.key)}</span>
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
            title={collapsed ? t(item.key) : undefined}
          >
            <item.icon size={20} className="flex-shrink-0" />
            {!collapsed && <span>{t(item.key)}</span>}
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
              <p className="text-xs text-text-muted capitalize">{t('role.' + user.role)}</p>
            </div>
          </div>
        )}

        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="nav-item w-full" title={collapsed ? (theme === 'dark' ? t('nav.lightMode') : t('nav.darkMode')) : undefined}>
          {theme === 'dark' ? <Sun size={20} className="flex-shrink-0" /> : <Moon size={20} className="flex-shrink-0" />}
          {!collapsed && <span>{theme === 'dark' ? t('nav.lightMode') : t('nav.darkMode')}</span>}
        </button>

        {/* Language Toggle - Modern Styleku */}
        <div
          className="lang-toggle"
          onClick={toggleLanguage}
          title={collapsed ? `${t('nav.language')}: ${language === 'id' ? 'Indonesia' : 'English'}` : undefined}
        >
          <Globe size={20} className="flex-shrink-0 text-text-secondary" />
          {!collapsed && (
            <>
              <span className="flex-1 text-sm font-medium text-text-secondary">{t('nav.language')}</span>
              <div className="lang-switch">
                {/* Text label - opposite side of flag */}
                <span className={`lang-switch-text ${language === 'id' ? 'right' : 'left'}`}>
                  {language === 'id' ? 'ID' : 'EN'}
                </span>
                {/* Flag thumb - slides left/right */}
                <div className={`lang-switch-thumb ${language === 'en' ? 'en' : ''}`}>
                  {language === 'id' ? (
                    <svg viewBox="0 0 40 40" className="lang-flag">
                      <circle cx="20" cy="20" r="19" fill="#fff" stroke="#e0e0e0" strokeWidth="1"/>
                      <clipPath id="flagClipId"><circle cx="20" cy="20" r="18"/></clipPath>
                      <g clipPath="url(#flagClipId)">
                        <rect x="0" y="0" width="40" height="20" fill="#FF0000"/>
                        <rect x="0" y="20" width="40" height="20" fill="#FFFFFF"/>
                      </g>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 40 40" className="lang-flag">
                      <circle cx="20" cy="20" r="19" fill="#fff" stroke="#e0e0e0" strokeWidth="1"/>
                      <clipPath id="flagClipEn"><circle cx="20" cy="20" r="18"/></clipPath>
                      <g clipPath="url(#flagClipEn)">
                        <rect x="0" y="0" width="40" height="40" fill="#012169"/>
                        <path d="M0,0 L40,40 M40,0 L0,40" stroke="#fff" strokeWidth="6"/>
                        <path d="M0,0 L40,40 M40,0 L0,40" stroke="#C8102E" strokeWidth="3"/>
                        <path d="M20,0 V40 M0,20 H40" stroke="#fff" strokeWidth="8"/>
                        <path d="M20,0 V40 M0,20 H40" stroke="#C8102E" strokeWidth="4.5"/>
                      </g>
                    </svg>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Logout */}
        <button onClick={handleLogout} className="nav-item w-full text-danger hover:bg-danger/5 hover:text-danger" title={collapsed ? t('nav.logout') : undefined}>
          <LogOut size={20} className="flex-shrink-0" />
          {!collapsed && <span>{t('nav.logout')}</span>}
        </button>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="nav-item w-full justify-center"
          title={collapsed ? t('nav.collapse') : t('nav.collapse')}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          {!collapsed && <span className="text-sm">{t('nav.collapse')}</span>}
        </button>
      </div>
    </aside>
  );
}
