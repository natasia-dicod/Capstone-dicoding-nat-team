import { useState } from 'react';
import { mockMaterials } from '../../mock/data';
import { BookOpen, Clock, Search, Filter, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LearningPage() {
  const [search, setSearch] = useState('');
  const [filterSubject, setFilterSubject] = useState('Semua');

  const subjects = ['Semua', ...new Set(mockMaterials.map((m) => m.subject))];

  const filtered = mockMaterials.filter((m) => {
    const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterSubject === 'Semua' || m.subject === filterSubject;
    return matchesSearch && matchesFilter;
  });

  const getDifficultyColor = (d) => {
    if (d === 'Mudah') return 'badge-success';
    if (d === 'Menengah') return 'badge-warning';
    return 'badge-danger';
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Materi Belajar 📚</h1>
        <p className="page-subtitle">Jelajahi dan pelajari materi sesuai kebutuhan Anda</p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            id="learning-search"
            type="text"
            placeholder="Cari materi..."
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
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((material, i) => (
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
                <span className="font-medium text-text-primary">{material.progress}%</span>
              </div>
              <div className="h-2 bg-surface-light rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    material.progress === 100 ? 'bg-accent' : 'gradient-bg'
                  }`}
                  style={{ width: `${material.progress}%` }}
                />
              </div>
              <p className="text-[10px] text-text-muted mt-1">
                {material.completedLessons}/{material.totalLessons} pelajaran
              </p>
            </div>

            <div className="mt-auto">
              {material.progress === 100 ? (
                <div className="flex items-center gap-2 text-accent text-sm font-medium">
                  <CheckCircle2 size={16} /> Selesai
                </div>
              ) : (
                <button className="btn-secondary w-full flex items-center justify-center gap-2 text-sm py-2">
                  {material.progress > 0 ? 'Lanjutkan' : 'Mulai Belajar'}
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-text-muted text-lg">Tidak ada materi yang ditemukan</p>
        </div>
      )}
    </div>
  );
}
