import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { mockDashboardStats } from '../../mock/data';
import {
  Users,
  UserCheck,
  TrendingUp,
  AlertTriangle,
  Trophy,
  BookOpen,
  Flame,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  // MessageCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';

function StatCard({ icon: Icon, label, value, change, changeType, color }) {
  const colorMap = {
    primary: 'text-primary bg-primary/10',
    accent: 'text-accent bg-accent/10',
    warning: 'text-warning bg-warning/10',
    danger: 'text-danger bg-danger/10',
  };

  return (
    <div className="stat-card animate-slide-up">
      <div className="flex items-center justify-between">
        <div className={`p-2.5 rounded-xl ${colorMap[color]}`}>
          <Icon size={20} />
        </div>
        {change && (
          <span className={`flex items-center gap-0.5 text-xs font-semibold ${
            changeType === 'up' ? 'text-accent' : 'text-danger'
          }`}>
            {changeType === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {change}
          </span>
        )}
      </div>
      <div className="mt-2">
        <p className="text-2xl font-bold text-text-primary">{value}</p>
        <p className="text-sm text-text-secondary">{label}</p>
      </div>
    </div>
  );
}

function MiniBarChart({ data, height = 60 }) {
  const maxVal = Math.max(...data.map((d) => d.value));
  return (
    <div className="flex items-end gap-1.5" style={{ height }}>
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full bg-primary/30 rounded-t-md transition-all duration-500 hover:bg-primary/50"
            style={{ height: `${(d.value / maxVal) * 100}%`, minHeight: '4px', animationDelay: `${i * 100}ms` }}
          />
          <span className="text-[10px] text-text-muted">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

function GuruDashboard() {
  const stats = mockDashboardStats.guru;
  const { t } = useLanguage();

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Users} label={t('dash.stats.totalStudents')} value={stats.totalStudents} change="+8" changeType="up" color="primary" />
        <StatCard icon={UserCheck} label={t('dash.stats.activeToday')} value={stats.activeToday} change="+12%" changeType="up" color="accent" />
        <StatCard icon={TrendingUp} label={t('dash.stats.averageScore')} value={stats.averageScore} change="+2.1" changeType="up" color="primary" />
        <StatCard icon={AlertTriangle} label={t('dash.stats.atRiskStudents')} value={stats.atRiskStudents} change="+3" changeType="down" color="danger" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Chart */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-text-primary">{t('dash.classPerformance')}</h3>
              <p className="text-sm text-text-secondary">{t('dash.monthlyAvgScore')}</p>
            </div>
            <div className="badge-info">
              <BarChart3 size={14} className="mr-1" /> {t('dash.upwardTrend')}
            </div>
          </div>
          <MiniBarChart
            data={stats.performanceChart.map((d) => ({ label: d.month, value: d.score }))}
            height={120}
          />
        </div>

        {/* Quick Actions */}
        <div className="glass-card p-6">
          <h3 className="font-semibold text-text-primary mb-4">{t('dash.quickActions')}</h3>
          <div className="space-y-3">
            {/* <Link to="/chat" className="glass-card-hover flex items-center gap-3 px-4 py-3 w-full text-left">
              <div className="p-2 rounded-lg bg-primary/10 text-primary"><MessageCircle size={18} /></div>
              <div>
                <p className="text-sm font-medium text-text-primary">Chat dengan AI</p>
                <p className="text-xs text-text-muted">Tanya apapun</p>
              </div>
            </Link> */}
            <Link to="/early-warning" className="glass-card-hover flex items-center gap-3 px-4 py-3 w-full text-left">
              <div className="p-2 rounded-lg bg-danger/10 text-danger"><AlertTriangle size={18} /></div>
              <div>
                <p className="text-sm font-medium text-text-primary">Early Warning</p>
                <p className="text-xs text-text-muted">{stats.atRiskStudents} {t('dash.stats.atRiskStudents').toLowerCase()}</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="glass-card p-6 mt-6">
        <h3 className="font-semibold text-text-primary mb-4">{t('dash.recentActivities')}</h3>
        <div className="space-y-3">
          {stats.recentActivities.map((act) => (
            <div key={act.id} className="flex items-center gap-4 px-4 py-3 rounded-xl bg-surface-light/20 hover:bg-surface-light/40 transition-colors">
              <div className="w-8 h-8 rounded-lg gradient-bg-subtle flex items-center justify-center text-sm font-bold text-primary">
                {act.student.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text-primary"><span className="font-medium">{act.student}</span> — {act.action}</p>
                <p className="text-xs text-text-muted">{act.subject}</p>
              </div>
              <span className="text-xs text-text-muted whitespace-nowrap flex items-center gap-1">
                <Clock size={12} /> {act.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function SiswaDashboard() {
  const stats = mockDashboardStats.siswa;
  const { t } = useLanguage();

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={BookOpen} label={t('dash.stats.materialsCompleted')} value={`${stats.totalCompleted}/${stats.totalMaterials}`} color="primary" />
        <StatCard icon={Trophy} label={t('dash.stats.currentScore')} value={stats.currentScore} change="+5" changeType="up" color="accent" />
        <StatCard icon={TrendingUp} label={t('dash.stats.rank')} value={`#${stats.rank}`} color="primary" />
        <StatCard icon={Flame} label={t('dash.stats.learningStreak')} value={`${stats.streak} ${t('unit.days')}`} color="warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Progress */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-text-primary">{t('dash.weeklyProgress')}</h3>
              <p className="text-sm text-text-secondary">{t('dash.studyTimeMinutes')}</p>
            </div>
          </div>
          <MiniBarChart
            data={stats.weeklyProgress.map((d) => ({ label: d.day, value: d.minutes }))}
            height={120}
          />
        </div>

        {/* Quick Actions */}
        <div className="glass-card p-6">
          <h3 className="font-semibold text-text-primary mb-4">{t('dash.startLearning')}</h3>
          <div className="space-y-3">
            <Link to="/learning" className="glass-card-hover flex items-center gap-3 px-4 py-3 w-full text-left">
              <div className="p-2 rounded-lg bg-accent/10 text-accent"><BookOpen size={18} /></div>
              <div>
                <p className="text-sm font-medium text-text-primary">{t('dash.continueLearning')}</p>
                <p className="text-xs text-text-muted">{stats.totalMaterials - stats.totalCompleted} {t('dash.materialsLeft')}</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-card p-6 mt-6">
        <h3 className="font-semibold text-text-primary mb-4">{t('dash.recentActivities')}</h3>
        <div className="space-y-3">
          {stats.recentActivities.map((act) => (
            <div key={act.id} className="flex items-center justify-between px-4 py-3 rounded-xl bg-surface-light/20 hover:bg-surface-light/40 transition-colors">
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-text-muted" />
                <div>
                  <p className="text-sm text-text-primary">{act.action}</p>
                  <p className="text-xs text-text-muted">{act.time}</p>
                </div>
              </div>
              {act.score && <span className="badge-success">{t('dash.score')}: {act.score}</span>}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default function DashboardPage() {
  const { user, isGuru, isAdmin } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">
          {t('dash.welcome')} <span className="gradient-text">{user?.name}</span> 👋
        </h1>
        <p className="page-subtitle">
          {isGuru || isAdmin
            ? t('dash.subtitle.guru')
            : t('dash.subtitle.siswa')
          }
        </p>
      </div>

      {isGuru || isAdmin ? <GuruDashboard /> : <SiswaDashboard />}
    </div>
  );
}
