import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Sparkles, Eye, EyeOff, ArrowRight, UserPlus } from 'lucide-react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('siswa');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(name, email, password, role);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-dark relative overflow-hidden">
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="w-full max-w-md px-6 animate-fade-in relative z-10">
        <div className="text-center mb-8 relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white p-2 mb-4 animate-pulse-glow shadow-md">
            <img src="/favicon.png" alt="Aplikasi Pintar Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-3xl font-bold gradient-text">Daftar Akun</h1>
          <p className="text-text-secondary mt-2">Mulai perjalanan belajar Anda dengan AI</p>
        </div>

        <div className="glass-card p-8">
          {error && (
            <div className="mb-4 px-4 py-3 bg-danger/10 border border-danger/20 rounded-xl text-danger text-sm animate-fade-in">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Nama Lengkap</label>
              <input
                id="register-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
                placeholder="Nama lengkap Anda"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Email</label>
              <input
                id="register-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="nama@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Password</label>
              <div className="relative">
                <input
                  id="register-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pr-12"
                  placeholder="Minimal 6 karakter"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Role</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'siswa', label: '🎓 Siswa' },
                  { value: 'guru', label: '👨‍🏫 Guru' },
                ].map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setRole(r.value)}
                    className={`py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 border ${
                      role === r.value
                        ? 'bg-primary/10 border-primary/30 text-primary'
                        : 'bg-surface-light/30 border-gray-200 dark:border-white/5 text-text-secondary hover:bg-surface-light/50'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              id="register-submit"
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <UserPlus size={18} /> Daftar
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-text-secondary">
            Sudah punya akun?{' '}
            <Link to="/login" className="text-primary hover:text-primary-light font-medium">
              Masuk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
