import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import MainLayout from './components/layout/MainLayout';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import LearningPage from './pages/learning/LearningPage';
import MaterialDetailPage from './pages/learning/MaterialDetailPage';
import AnswerInputPage from './pages/answer-input/AnswerInputPage';
import EarlyWarningPage from './pages/early-warning/EarlyWarningPage';
import StudentEarlyWarningPage from './pages/early-warning/StudentEarlyWarningPage';
import RecommendationPage from './pages/recommendation/RecommendationPage';
import ProfilePage from './pages/profile/ProfilePage';

function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-surface-dark">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-text-secondary text-sm">Memuat...</p>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to="/dashboard" replace />;
  return children;
}

// Early warning route: render different page based on role
function EarlyWarningRoute() {
  const { isGuru, isAdmin } = useAuth();
  if (isGuru || isAdmin) return <EarlyWarningPage />;
  return <StudentEarlyWarningPage />;
}

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
              <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
                <Route path="/dashboard" element={<DashboardPage />} />

                {/* Materi Belajar */}
                <Route path="/learning" element={<LearningPage />} />
                <Route path="/learning/:id" element={<MaterialDetailPage />} />

                {/* Jawab Soal — hanya siswa */}
                <Route path="/answer-input" element={
                  <ProtectedRoute allowedRoles={['siswa', 'student', 'admin']}>
                    <AnswerInputPage />
                  </ProtectedRoute>
                } />

                {/* Early Warning — semua role, tapi render komponen berbeda */}
                <Route path="/early-warning" element={<EarlyWarningRoute />} />

                <Route path="/recommendations" element={<RecommendationPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>

              {/* Redirect */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </LanguageProvider>
  );
}
