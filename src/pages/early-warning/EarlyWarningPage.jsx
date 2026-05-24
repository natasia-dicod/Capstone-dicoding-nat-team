import { useState, useEffect } from 'react';
import { mockEarlyWarningStudents, mockAlerts } from '../../mock/data';
import api from '../../services/api';
import { AlertTriangle, TrendingUp, TrendingDown, Minus, Search, Bell, Users, ShieldAlert, ShieldCheck, Clock } from 'lucide-react';

export default function EarlyWarningPage() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [studentsData, setStudentsData] = useState([]);
  const [alertsData, setAlertsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWarnings = async () => {
      try {
        const response = await api.get('/api/early-warning');
        if (response.data.data && response.data.data.length > 0) {
          // Map backend warnings to UI format
          const apiStudents = response.data.data.map(w => ({
            id: w.id,
            name: w.user_name || 'Siswa',
            class: 'Kelas API',
            score: w.risk_score ? 100 - w.risk_score : 50,
            attendance: 80,
            trend: 'down',
            status: w.risk_level === 'high' ? 'high-risk' : (w.risk_level === 'medium' ? 'medium-risk' : 'low-risk'),
            lastActive: 'Baru saja'
          }));
          setStudentsData(apiStudents);
          setAlertsData(mockAlerts); // Keep mock alerts if backend doesn't provide them
        } else {
          setStudentsData(mockEarlyWarningStudents);
          setAlertsData(mockAlerts);
        }
      } catch (error) {
        console.warn('Failed to fetch early warnings', error);
        setStudentsData(mockEarlyWarningStudents);
        setAlertsData(mockAlerts);
      } finally {
        setLoading(false);
      }
    };
    fetchWarnings();
  }, []);

  const students = studentsData.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || s.status === filter;
    return matchSearch && matchFilter;
  });

  const stats = {
    total: studentsData.length,
    highRisk: studentsData.filter((s) => s.status === 'high-risk').length,
    mediumRisk: studentsData.filter((s) => s.status === 'medium-risk').length,
    safe: studentsData.filter((s) => s.status === 'safe' || s.status === 'low-risk').length,
  };

  const getStatusBadge = (status) => {
    const m = { 'high-risk': ['badge-danger','Berisiko Tinggi'], 'medium-risk': ['badge-warning','Perlu Perhatian'], 'low-risk': ['badge-info','Risiko Rendah'], 'safe': ['badge-success','Aman'] };
    const [cls, lbl] = m[status] || m['safe'];
    return <span className={cls}>{lbl}</span>;
  };

  const getTrendIcon = (t) => {
    if (t === 'up') return <TrendingUp size={14} className="text-accent" />;
    if (t === 'down') return <TrendingDown size={14} className="text-danger" />;
    return <Minus size={14} className="text-text-muted" />;
  };

  const getStatusBg = (status) => {
    const m = { 'high-risk': 'bg-danger/10', 'medium-risk': 'bg-warning/10', 'low-risk': 'bg-primary/10', 'safe': 'bg-accent/10' };
    return m[status] || 'bg-accent/10';
  };

  if (loading) {
    return <div className="p-8 text-center text-text-muted">Loading early warnings...</div>;
  }

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Early Warning System ⚠️</h1>
        <p className="page-subtitle">Pantau siswa berisiko dan ambil tindakan pencegahan</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="stat-card"><div className="p-2 rounded-xl bg-primary/10 text-primary w-fit"><Users size={18}/></div><p className="text-2xl font-bold">{stats.total}</p><p className="text-sm text-text-secondary">Total Siswa</p></div>
        <div className="stat-card"><div className="p-2 rounded-xl bg-danger/10 text-danger w-fit"><ShieldAlert size={18}/></div><p className="text-2xl font-bold text-danger">{stats.highRisk}</p><p className="text-sm text-text-secondary">Risiko Tinggi</p></div>
        <div className="stat-card"><div className="p-2 rounded-xl bg-warning/10 text-warning w-fit"><AlertTriangle size={18}/></div><p className="text-2xl font-bold text-warning">{stats.mediumRisk}</p><p className="text-sm text-text-secondary">Perlu Perhatian</p></div>
        <div className="stat-card"><div className="p-2 rounded-xl bg-accent/10 text-accent w-fit"><ShieldCheck size={18}/></div><p className="text-2xl font-bold text-accent">{stats.safe}</p><p className="text-sm text-text-secondary">Aman</p></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
              <input type="text" placeholder="Cari nama siswa..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-field pl-11" />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {[['all','Semua',stats.total],['high-risk','Risiko Tinggi',stats.highRisk],['medium-risk','Perlu Perhatian',stats.mediumRisk],['safe','Aman',stats.safe]].map(([v,l,c]) => (
                <button key={v} onClick={() => setFilter(v)} className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${filter===v?'bg-primary/10 text-primary border border-primary/20':'bg-surface-light/30 text-text-secondary border border-gray-200 dark:border-white/5 hover:bg-surface-light/50'}`}>
                  {l} <span className="ml-1 px-1.5 py-0.5 rounded-md bg-black/5 dark:bg-white/5 text-[10px]">{c}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead><tr className="border-b border-gray-200 dark:border-white/5">
                  {['Siswa','Kelas','Skor','Kehadiran','Trend','Status','Terakhir Aktif'].map(h => (
                    <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-text-muted uppercase tracking-wider">{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {students.map((s) => (
                    <tr key={s.id} className="border-b border-gray-200 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-4"><div className="flex items-center gap-3"><div className={`w-8 h-8 rounded-lg ${getStatusBg(s.status)} flex items-center justify-center text-xs font-bold`}>{s.name.charAt(0)}</div><span className="text-sm font-medium text-text-primary">{s.name}</span></div></td>
                      <td className="px-5 py-4 text-sm text-text-secondary">{s.class}</td>
                      <td className="px-5 py-4"><span className={`text-sm font-bold ${s.score<50?'text-danger':s.score<70?'text-warning':'text-accent'}`}>{s.score}</span></td>
                      <td className="px-5 py-4 text-sm text-text-secondary">{s.attendance}%</td>
                      <td className="px-5 py-4">{getTrendIcon(s.trend)}</td>
                      <td className="px-5 py-4">{getStatusBadge(s.status)}</td>
                      <td className="px-5 py-4 text-xs text-text-muted">{s.lastActive}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="glass-card p-5">
            <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2"><Bell size={16} className="text-warning" /> Notifikasi</h3>
            <div className="space-y-3">
              {alertsData.map((a) => (
                <div key={a.id} className={`p-3 rounded-xl border text-sm ${a.type==='danger'?'bg-danger/5 border-danger/20 text-danger':a.type==='warning'?'bg-warning/5 border-warning/20 text-warning':'bg-primary/5 border-primary/20 text-primary'}`}>
                  <p className="text-xs font-medium">{a.message}</p>
                  <p className="text-[10px] opacity-60 mt-1 flex items-center gap-1"><Clock size={10}/> {a.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
