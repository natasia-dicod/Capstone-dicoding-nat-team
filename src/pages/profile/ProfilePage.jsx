import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Shield, Calendar, Save, Camera, Key } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 1000);
  };

  const getRoleBadge = (role) => {
    const m = { guru: ['badge-info','👨‍🏫 Guru'], siswa: ['badge-success','🎓 Siswa'], admin: ['badge-warning','⚙️ Admin'] };
    const [cls, lbl] = m[role] || m['siswa'];
    return <span className={`${cls} text-sm`}>{lbl}</span>;
  };

  return (
    <div className="animate-fade-in max-w-2xl">
      <div className="page-header">
        <h1 className="page-title">Profil 👤</h1>
        <p className="page-subtitle">Kelola informasi akun Anda</p>
      </div>

      {/* Avatar Section */}
      <div className="glass-card p-6 mb-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center text-3xl font-bold text-white">
              {user?.name?.charAt(0)}
            </div>
            <button className="absolute -bottom-1 -right-1 p-1.5 rounded-lg bg-surface-light border border-white/10 text-text-muted hover:text-text-primary transition-colors">
              <Camera size={14} />
            </button>
          </div>
          <div>
            <h2 className="text-xl font-bold text-text-primary">{user?.name}</h2>
            <p className="text-sm text-text-secondary">{user?.email}</p>
            <div className="mt-2">{getRoleBadge(user?.role)}</div>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <div className="glass-card p-6 mb-6">
        <h3 className="font-semibold text-text-primary mb-4">Informasi Akun</h3>

        {saved && (
          <div className="mb-4 px-4 py-3 bg-accent/10 border border-accent/20 rounded-xl text-accent text-sm animate-fade-in">
            ✅ Profil berhasil disimpan
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">Nama Lengkap</label>
            <div className="relative">
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input-field pl-11" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
              <input type="email" value={user?.email || ''} className="input-field pl-11 opacity-60" disabled />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Role</label>
              <div className="relative">
                <Shield size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                <input type="text" value={user?.role || ''} className="input-field pl-11 opacity-60 capitalize" disabled />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Bergabung</label>
              <div className="relative">
                <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                <input type="text" value={user?.createdAt || 'N/A'} className="input-field pl-11 opacity-60" disabled />
              </div>
            </div>
          </div>
          <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2">
            {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={16} />}
            {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </form>
      </div>

      {/* Security */}
      <div className="glass-card p-6">
        <h3 className="font-semibold text-text-primary mb-4">Keamanan</h3>
        <button className="btn-secondary flex items-center gap-2"><Key size={16} /> Ubah Password</button>
      </div>
    </div>
  );
}
