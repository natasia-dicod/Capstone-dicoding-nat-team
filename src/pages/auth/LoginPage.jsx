import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Sparkles, Eye, EyeOff, ArrowRight, Sun, Moon } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-dark relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-accent/10 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full bg-primary/5 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="w-full max-w-md px-6 animate-fade-in relative z-10">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="absolute top-0 right-6 p-2 rounded-xl text-text-secondary hover:text-text-primary bg-surface-light hover:bg-surface-lighter transition-colors z-20"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Logo */}
        <div className="text-center mb-8 relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white p-2 mb-4 animate-pulse-glow shadow-md">
            <img src="/favicon.png" alt="SLAC Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-3xl font-bold gradient-text">SLAC</h1>
          <p className="text-text-secondary mt-2">Platform Pembelajaran Adaptif dengan AI</p>
        </div>

        {/* Login Card */}
        <div className="glass-card p-8">
          <h2 className="text-xl font-semibold text-text-primary mb-6">Masuk ke Akun</h2>

          {error && (
            <div className="mb-4 px-4 py-3 bg-danger/10 border border-danger/20 rounded-xl text-danger text-sm animate-fade-in">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Email</label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="nama@edumind.ai"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Password</label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pr-12"
                  placeholder="Masukkan password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Masuk <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-text-secondary">
            Belum punya akun?{' '}
            <Link to="/register" className="text-primary hover:text-primary-light font-medium">
              Daftar sekarang
            </Link>
          </div>
        </div>

        {/* Demo Accounts */}
        {/* <div className="mt-6 glass-card p-5">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Akun Demo</p>
          <div className="space-y-2">
            {[
              { role: 'Guru', email: 'rina@edumind.ai', pass: 'guru123' },
              { role: 'Siswa', email: 'budi@edumind.ai', pass: 'siswa123' },
              { role: 'Admin', email: 'admin@edumind.ai', pass: 'admin123' },
            ].map((acc) => (
              <button
                key={acc.role}
                onClick={() => { setEmail(acc.email); setPassword(acc.pass); }}
                className="w-full text-left px-3 py-2 rounded-lg bg-surface-light/30 hover:bg-surface-light/50 transition-colors text-sm flex justify-between items-center group"
              >
                <span className="text-text-secondary group-hover:text-text-primary transition-colors">
                  <span className="font-medium text-text-primary">{acc.role}</span> — {acc.email}
                </span>
                <ArrowRight size={14} className="text-text-muted group-hover:text-primary transition-colors" />
              </button>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
}
