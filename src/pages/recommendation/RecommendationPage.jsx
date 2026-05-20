import { mockRecommendations } from '../../mock/data';
import { Lightbulb, ArrowRight, Sparkles, Clock, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RecommendationPage() {
  const getDiffColor = (d) => {
    if (d === 'Mudah') return 'badge-success';
    if (d === 'Menengah') return 'badge-warning';
    return 'badge-danger';
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Rekomendasi Materi 💡</h1>
        <p className="page-subtitle">Rekomendasi personal berdasarkan performa dan pola belajar Anda</p>
      </div>

      <div className="glass-card p-5 mb-6 gradient-bg-subtle border border-primary/10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/10"><Sparkles size={20} className="text-primary" /></div>
          <div>
            <p className="text-sm font-medium text-text-primary">Rekomendasi AI</p>
            <p className="text-xs text-text-secondary">Materi dipilih berdasarkan analisis performa, kebiasaan belajar, dan area yang perlu ditingkatkan.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockRecommendations.map((rec, i) => (
          <div key={rec.id} className="glass-card-hover p-5" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{rec.icon}</span>
                <div>
                  <h3 className="font-semibold text-text-primary">{rec.title}</h3>
                  <p className="text-xs text-text-muted">{rec.subject}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-accent/10 text-accent text-xs font-bold">
                <BarChart3 size={12} /> {rec.matchScore}%
              </div>
            </div>

            <p className="text-sm text-text-secondary mb-4">{rec.reason}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-text-muted">
                <span className={getDiffColor(rec.difficulty)}>{rec.difficulty}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {rec.duration}</span>
              </div>
              <button className="btn-secondary text-xs py-2 px-4 flex items-center gap-1.5">
                Mulai <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link to="/chat" className="btn-primary inline-flex items-center gap-2">
          <Sparkles size={16} /> Minta Rekomendasi Lain dari AI
        </Link>
      </div>
    </div>
  );
}
