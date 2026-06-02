import { useState, useEffect } from 'react';
import { mockMaterials } from '../../mock/data';
import api from '../../services/api';
import {
  BookOpen, Clock, Search, ArrowRight, CheckCircle2,
  PlusCircle, X, Loader2, Save
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

// ── Add Material Modal (Guru/Admin) ───────────────────────────────────────────
function AddMaterialModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({ title: '', subject: '', content: '', difficulty: 'medium' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.subject.trim()) {
      setError('Judul dan mata pelajaran wajib diisi.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await api.post('/api/materials', form);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menambahkan materi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="glass-card w-full max-w-lg p-6 animate-fade-in">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-semibold text-text-primary flex items-center gap-2">
            <PlusCircle size={18} className="text-primary" /> Tambah Materi Baru
          </h2>
          <button onClick={onClose} className="text-text-muted hover:text-text-primary transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Judul Materi <span className="text-danger">*</span>
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="input-field"
              placeholder="Contoh: Pengenalan Machine Learning"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Mata Pelajaran <span className="text-danger">*</span>
            </label>
            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="input-field"
              placeholder="Contoh: AI & ML"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Tingkat Kesulitan
            </label>
            <select
              name="difficulty"
              value={form.difficulty}
              onChange={handleChange}
              className="input-field"
            >
              <option value="easy">Mudah</option>
              <option value="medium">Menengah</option>
              <option value="hard">Sulit</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Konten / Deskripsi Materi
            </label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              className="input-field resize-none"
              rows={4}
              placeholder="Tuliskan deskripsi atau isi materi..."
            />
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">
              Batal
            </button>
            <button type="submit" disabled={loading} className="btn-primary flex-1 flex items-center justify-center gap-2">
              {loading ? (
                <><Loader2 size={16} className="animate-spin" /> Menyimpan...</>
              ) : (
                <><Save size={16} /> Simpan Materi</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function LearningPage() {
  const { t } = useLanguage();
  const { isGuru, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [filterSubject, setFilterSubject] = useState('Semua');
  const [materials, setMaterials] = useState([]);
  const [progressMap, setProgressMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchMaterials = async () => {
    try {
      const [matRes, progRes] = await Promise.allSettled([
        api.get('/api/materials'),
        api.get('/api/progress'),
      ]);

      let mats = [];
      if (matRes.status === 'fulfilled' && matRes.value.data.data?.length > 0) {
        mats = matRes.value.data.data.map((m) => ({
          id: m.id,
          title: m.title,
          subject: m.subject,
          difficulty: m.difficulty === 'easy' ? 'Mudah' : m.difficulty === 'hard' ? 'Sulit' : 'Menengah',
          description: m.content || 'Materi pembelajaran dari database.',
          icon: '📚',
          totalLessons: 3,
          duration: '30-60 mnt',
        }));
      } else {
        mats = mockMaterials;
      }
      setMaterials(mats);

      // Build progress map { materialId: progressObj }
      if (progRes.status === 'fulfilled') {
        const map = {};
        (progRes.value.data.data || []).forEach((p) => {
          map[String(p.material_id)] = p;
        });
        setProgressMap(map);
      }
    } catch {
      setMaterials(mockMaterials);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const subjects = ['Semua', ...new Set(materials.map((m) => m.subject))];

  const filtered = materials.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterSubject === 'Semua' || m.subject === filterSubject;
    return matchesSearch && matchesFilter;
  });

  const getDifficultyColor = (d) => {
    if (d === 'Mudah') return 'badge-success';
    if (d === 'Menengah') return 'badge-warning';
    return 'badge-danger';
  };

  const getProgress = (id) => {
    const p = progressMap[String(id)];
    if (!p) return { pct: 0, status: null };
    const pct = Math.min(100, Math.round(p.score || 0));
    return { pct, status: p.status };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-text-muted text-sm">Memuat materi...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">{t('learn.title')}</h1>
          <p className="page-subtitle">{t('learn.subtitle')}</p>
        </div>
        {/* Tombol tambah materi hanya untuk guru/admin */}
        {(isGuru || isAdmin) && (
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary flex items-center gap-2 shrink-0"
          >
            <PlusCircle size={16} /> Tambah Materi
          </button>
        )}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            id="learning-search"
            type="text"
            placeholder={t('learn.searchPlaceholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-11"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {subjects.map((s) => (
            <button
              key={s}
              onClick={() => setFilterSubject(s)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                filterSubject === s
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'bg-surface-light/30 text-text-secondary border border-gray-200 dark:border-white/5 hover:bg-surface-light/50'
              }`}
            >
              {s === 'Semua' ? t('learn.all') : s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((material, i) => {
          const { pct, status } = getProgress(material.id);
          const isCompleted = status === 'completed';

          return (
            <div
              key={material.id}
              className="glass-card-hover p-5 flex flex-col"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">{material.icon}</span>
                <span className={getDifficultyColor(material.difficulty)}>{material.difficulty}</span>
              </div>

              <h3 className="font-semibold text-text-primary mb-1">{material.title}</h3>
              <p className="text-sm text-text-secondary mb-3 line-clamp-2">{material.description}</p>

              <div className="flex items-center gap-3 text-xs text-text-muted mb-4">
                <span className="flex items-center gap-1"><BookOpen size={12} /> {material.subject}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {material.duration}</span>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-text-secondary">Progress</span>
                  <span className={`font-medium ${isCompleted ? 'text-accent' : 'text-text-primary'}`}>
                    {isCompleted ? '✅ Selesai' : `${pct}%`}
                  </span>
                </div>
                <div className="h-2 bg-surface-light rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${isCompleted ? 'bg-accent' : 'gradient-bg'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="text-[10px] text-text-muted mt-1">
                  {isCompleted ? 'Semua soal selesai' : `${material.totalLessons} soal kuis tersedia`}
                </p>
              </div>

              <div className="mt-auto">
                {isCompleted ? (
                  <div className="flex items-center gap-2 text-accent text-sm font-medium">
                    <CheckCircle2 size={16} /> {t('learn.completed')}
                  </div>
                ) : (
                  <button
                    onClick={() => navigate(`/learning/${material.id}`)}
                    className="btn-secondary w-full flex items-center justify-center gap-2 text-sm py-2"
                  >
                    {pct > 0 ? t('learn.continue') : t('learn.startLearning')}
                    <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-text-muted text-lg">{t('learn.noResults')}</p>
        </div>
      )}

      {/* Add Material Modal */}
      {showAddModal && (
        <AddMaterialModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            setShowAddModal(false);
            setLoading(true);
            fetchMaterials();
          }}
        />
      )}
    </div>
  );
}
