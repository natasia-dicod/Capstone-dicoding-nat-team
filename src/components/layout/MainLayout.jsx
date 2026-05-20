import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import Sidebar from './Sidebar';
import { useTheme } from '../../context/ThemeContext';

export default function MainLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex h-screen bg-surface-dark overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Hidden on mobile unless toggled */}
      <div className={`
        fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 h-full
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar onCloseMobile={() => setMobileMenuOpen(false)} />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar for mobile and Theme Toggle */}
        <header className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-white/5 bg-surface md:px-8">
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -ml-2 text-text-secondary hover:text-text-primary rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
            >
              <Menu size={24} />
            </button>
            <div className="ml-2 w-8 h-8 rounded-lg bg-white p-1 flex items-center justify-center shadow-sm">
              <img src="/favicon.png" alt="Aplikasi Pintar Logo" className="w-full h-full object-contain" />
            </div>
            <span className="ml-2 font-bold gradient-text">Aplikasi Pintar</span>
          </div>
          
          {/* Spacer for md screens */}
          <div className="hidden md:block"></div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-text-secondary hover:text-text-primary bg-surface-light hover:bg-surface-lighter transition-colors"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-8 max-w-7xl mx-auto h-full">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}