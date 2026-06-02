import { useState, useEffect } from 'react';
import api from '../../services/api';
import {
  ShieldCheck, ShieldAlert, AlertTriangle, CheckCircle2,
  Loader2, Activity, GraduationCap, ChevronRight, RefreshCw,
  TrendingUp, TrendingDown, Minus, Info
} from 'lucide-react';

// ── Tab 1: Cek Risiko dari Aktivitas Belajar ──────────────────────────────────
function ActivityRiskTab() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const checkRisk = async () => {
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await api.get('/api/early-warning/me');
      setResult(res.data.data);
    } catch (err) {
      setError('Gagal memeriksa risiko. Pastikan kamu sudah memiliki data progress belajar.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkRisk();
  }, []);

  const getRiskStyle = (level) => {
    const lc = String(level || '').toUpperCase();
    if (lc === 'KRITIS' || lc === 'HIGH') return { color: 'text-danger', bg: 'bg-danger/10 border-danger/20', icon: ShieldAlert };
    if (lc === 'PERHATIAN' || lc === 'SEDANG' || lc === 'MEDIUM') return { color: 'text-warning', bg: 'bg-warning/10 border-warning/20', icon: AlertTriangle };
    return { color: 'text-accent', bg: 'bg-accent/10 border-accent/20', icon: ShieldCheck };
  };

  return (
    <div className="space-y-5">
      <div className="glass-card p-5">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 rounded-xl bg-primary/10">
            <Activity size={18} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">Analisis Risiko Aktivitas Belajar</h3>
            <p className="text-xs text-text-muted mt-0.5">
              Berdasarkan data progress dan aktivitas belajar kamu
            </p>
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-10 gap-3">
            <Loader2 size={24} className="animate-spin text-primary" />
            <span className="text-text-muted text-sm">Menganalisis data belajar kamu...</span>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm">
            {error}
          </div>
        )}

        {result && !loading && (() => {
          const style = getRiskStyle(result.risk_level);
          const Icon = style.icon;
          return (
            <div>
              {/* Status Card */}
              <div className={`p-5 rounded-xl border ${style.bg} text-center mb-4`}>
                <Icon size={40} className={`mx-auto mb-2 ${style.color}`} />
                <p className={`text-xl font-bold ${style.color}`}>
                  {String(result.risk_level || 'Aman').toUpperCase()}
                </p>
                <p className="text-sm text-text-secondary mt-1">{result.message}</p>
                {result.risk_score != null && (
                  <p className="text-xs text-text-muted mt-1">
                    Confidence: {Math.round(result.risk_score * 100)}%
                  </p>
                )}
              </div>

              {/* Recommendations */}
              {result.recommendations && result.recommendations.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
                    Rekomendasi
                  </p>
                  <div className="space-y-2">
                    {result.recommendations.map((r, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                        <ChevronRight size={14} className="text-primary mt-0.5 shrink-0" />
                        <span>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Plan */}
              {result.action_plan && result.action_plan.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
                    Rencana Tindakan
                  </p>
                  <div className="space-y-2">
                    {result.action_plan.map((a, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                        <CheckCircle2 size={14} className="text-accent mt-0.5 shrink-0" />
                        <span>{a}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })()}

        <button
          onClick={checkRisk}
          disabled={loading}
          className="btn-secondary flex items-center gap-2 text-sm mt-2"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          Periksa Ulang
        </button>
      </div>

      {/* Info Banner */}
      <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex items-start gap-3">
        <Info size={16} className="text-primary mt-0.5 shrink-0" />
        <p className="text-xs text-text-secondary">
          Analisis ini menggunakan AI berdasarkan data progress belajar kamu.
          Semakin banyak materi yang kamu kerjakan, semakin akurat hasil analisisnya.
        </p>
      </div>
    </div>
  );
}

// ── Tab 2: Cek Performa Akademik ──────────────────────────────────────────────
function PerformanceCheckTab() {
  const [form, setForm] = useState({
    gender: '',
    reading_score: '',
    writing_score: '',
    race_ethnicity: '2',
    parental_education: '2',
    lunch: '1',
    test_preparation: '0',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const payload = {
        gender: parseInt(form.gender),
        reading_score: parseFloat(form.reading_score),
        writing_score: parseFloat(form.writing_score),
        race_ethnicity: parseInt(form.race_ethnicity),
        parental_education: parseInt(form.parental_education),
        lunch: parseInt(form.lunch),
        test_preparation: parseInt(form.test_preparation),
      };
      const res = await api.post('/api/early-warning/performance', payload);
      setResult(res.data.data);
    } catch (err) {
      const msg = err.response?.data?.message || 'Gagal menganalisis performa. Coba lagi nanti.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const getRiskStyle = (level) => {
    const lc = String(level || '').toUpperCase();
    if (lc === 'KRITIS' || lc === 'HIGH') return { color: 'text-danger', bg: 'bg-danger/10 border-danger/20', icon: ShieldAlert, emoji: '🚨' };
    if (lc === 'SEDANG' || lc === 'PERHATIAN' || lc === 'MEDIUM') return { color: 'text-warning', bg: 'bg-warning/10 border-warning/20', icon: AlertTriangle, emoji: '⚠️' };
    return { color: 'text-accent', bg: 'bg-accent/10 border-accent/20', icon: ShieldCheck, emoji: '✅' };
  };

  const getScoreIcon = (score) => {
    const n = parseFloat(score);
    if (n >= 70) return <TrendingUp size={14} className="text-accent" />;
    if (n >= 50) return <Minus size={14} className="text-warning" />;
    return <TrendingDown size={14} className="text-danger" />;
  };

  return (
    <div className="space-y-5">
      <div className="glass-card p-5">
        <div className="flex items-start gap-3 mb-5">
          <div className="p-2 rounded-xl bg-accent/10">
            <GraduationCap size={18} className="text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">Cek Performa Akademik</h3>
            <p className="text-xs text-text-muted mt-0.5">
              Masukkan nilai baca dan tulis untuk analisis AI
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">
                Jenis Kelamin
              </label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">Pilih...</option>
                <option value="1">Laki-laki</option>
                <option value="0">Perempuan</option>
              </select>
            </div>

            {/* Test Preparation */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">
                Persiapan Ujian
              </label>
              <select
                name="test_preparation"
                value={form.test_preparation}
                onChange={handleChange}
                className="input-field"
              >
                <option value="0">Tidak ada kursus persiapan</option>
                <option value="1">Sudah ikut kursus persiapan</option>
              </select>
            </div>

            {/* Reading Score */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">
                Nilai Membaca (0-100)
              </label>
              <div className="relative">
                {form.reading_score && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2">
                    {getScoreIcon(form.reading_score)}
                  </span>
                )}
                <input
                  type="number"
                  name="reading_score"
                  value={form.reading_score}
                  onChange={handleChange}
                  min={0} max={100} step={1}
                  className="input-field pr-8"
                  placeholder="Contoh: 75"
                  required
                />
              </div>
            </div>

            {/* Writing Score */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">
                Nilai Menulis (0-100)
              </label>
              <div className="relative">
                {form.writing_score && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2">
                    {getScoreIcon(form.writing_score)}
                  </span>
                )}
                <input
                  type="number"
                  name="writing_score"
                  value={form.writing_score}
                  onChange={handleChange}
                  min={0} max={100} step={1}
                  className="input-field pr-8"
                  placeholder="Contoh: 68"
                  required
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex items-center gap-2"
          >
            {loading ? (
              <><Loader2 size={16} className="animate-spin" /> Menganalisis...</>
            ) : (
              <><Activity size={16} /> Analisis Performa</>
            )}
          </button>
        </form>
      </div>

      {/* Result */}
      {result && (() => {
        const style = getRiskStyle(result.risk_level);
        const Icon = style.icon;
        return (
          <div className="glass-card p-5 animate-fade-in">
            <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
              <CheckCircle2 size={16} className="text-accent" /> Hasil Analisis
            </h3>

            <div className={`p-5 rounded-xl border ${style.bg} text-center mb-4`}>
              <div className="text-3xl mb-2">{style.emoji}</div>
              <Icon size={32} className={`mx-auto mb-2 ${style.color}`} />
              <p className={`text-lg font-bold ${style.color}`}>
                {String(result.risk_level || 'AMAN').toUpperCase()}
              </p>
              <p className="text-sm text-text-secondary mt-1">{result.message}</p>
            </div>

            {result.recommendations && result.recommendations.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Rekomendasi
                </p>
                {result.recommendations.map((r, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-text-secondary p-2 rounded-lg bg-surface-light/20">
                    <ChevronRight size={14} className="text-primary mt-0.5 shrink-0" />
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })()}

      {/* Info */}
      <div className="p-4 rounded-xl bg-accent/5 border border-accent/10 flex items-start gap-3">
        <Info size={16} className="text-accent mt-0.5 shrink-0" />
        <p className="text-xs text-text-secondary">
          Nilai membaca dan menulis diambil dari tugas atau ujian terakhir kamu.
          Analisis ini menggunakan model AI untuk memprediksikan potensi risiko akademik.
        </p>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function StudentEarlyWarningPage() {
  const [activeTab, setActiveTab] = useState('activity');

  const tabs = [
    { key: 'activity', label: 'Risiko Aktivitas', icon: Activity },
    { key: 'performance', label: 'Performa Akademik', icon: GraduationCap },
  ];

  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      <div className="page-header">
        <h1 className="page-title">Cek Risikomu ⚠️</h1>
        <p className="page-subtitle">
          Analisis AI untuk membantu kamu memahami kondisi belajarmu saat ini
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-1 p-1 bg-surface-light/30 rounded-xl mb-6">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
              activeTab === key
                ? 'bg-surface shadow-sm text-text-primary'
                : 'text-text-muted hover:text-text-secondary'
            }`}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'activity' ? <ActivityRiskTab /> : <PerformanceCheckTab />}
    </div>
  );
}
