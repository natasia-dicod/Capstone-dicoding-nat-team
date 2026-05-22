import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  id: {
    // Sidebar / Navigation
    'nav.dashboard': 'Dashboard',
    'nav.learning': 'Materi Belajar',
    'nav.recommendations': 'Rekomendasi',
    'nav.answerInput': 'Jawab Soal',
    'nav.earlyWarning': 'Early Warning',
    'nav.profile': 'Profil',
    'nav.logout': 'Keluar',
    'nav.lightMode': 'Mode Terang',
    'nav.darkMode': 'Mode Gelap',
    'nav.collapse': 'Perkecil',
    'nav.language': 'Bahasa',

    // Roles
    'role.siswa': 'Siswa',
    'role.guru': 'Guru',
    'role.admin': 'Admin',

    // Dashboard
    'dash.welcome': 'Selamat Datang,',
    'dash.subtitle.guru': 'Pantau performa siswa dan kelola pembelajaran.',
    'dash.subtitle.siswa': 'Lihat progress belajar dan lanjutkan materi.',
    'dash.stats.totalStudents': 'Total Siswa',
    'dash.stats.activeToday': 'Aktif Hari Ini',
    'dash.stats.averageScore': 'Rata-rata Skor',
    'dash.stats.atRiskStudents': 'Siswa Berisiko',
    'dash.classPerformance': 'Performa Kelas',
    'dash.monthlyAvgScore': 'Rata-rata skor bulanan',
    'dash.upwardTrend': 'Trend naik',
    'dash.quickActions': 'Aksi Cepat',
    'dash.recentActivities': 'Aktivitas Terbaru',
    'dash.earlyWarning': 'Early Warning',
    'dash.studentsAtRisk': 'siswa berisiko',
    'dash.stats.materialsCompleted': 'Materi Selesai',
    'dash.stats.currentScore': 'Skor Saat Ini',
    'dash.stats.rank': 'Peringkat',
    'dash.stats.learningStreak': 'Streak Belajar',
    'dash.weeklyProgress': 'Progress Mingguan',
    'dash.studyTimeMinutes': 'Waktu belajar (menit)',
    'dash.startLearning': 'Mulai Belajar',
    'dash.continueLearning': 'Lanjut Belajar',
    'dash.materialsLeft': 'materi tersisa',
    'dash.score': 'Skor',
    'unit.days': 'hari',

    // Learning Page
    'learn.title': 'Materi Belajar 📚',
    'learn.subtitle': 'Jelajahi dan pelajari materi sesuai kebutuhan Anda',
    'learn.searchPlaceholder': 'Cari materi...',
    'learn.all': 'Semua',
    'learn.progress': 'Progress',
    'learn.lessons': 'pelajaran',
    'learn.completed': 'Selesai',
    'learn.continue': 'Lanjutkan',
    'learn.startLearning': 'Mulai Belajar',
    'learn.noResults': 'Tidak ada materi yang ditemukan',

    // Answer Input Page
    'answer.title': 'Jawab Soal ✍️',
    'answer.subtitle': 'Kirim jawaban essay Anda untuk mendapatkan feedback AI',
    'answer.newForm': 'Form Jawaban Baru',
    'answer.successMsg': 'Jawaban berhasil dikirim! AI sedang menganalisis...',
    'answer.subject': 'Mata Pelajaran',
    'answer.selectSubject': 'Pilih mata pelajaran',
    'answer.topic': 'Topik',
    'answer.topicPlaceholder': 'Contoh: Integral Tentu',
    'answer.question': 'Soal / Pertanyaan',
    'answer.questionPlaceholder': 'Tuliskan soal yang ingin Anda jawab...',
    'answer.yourAnswer': 'Jawaban Anda',
    'answer.answerPlaceholder': 'Tuliskan jawaban essay Anda di sini...',
    'answer.characters': 'karakter',
    'answer.submitting': 'Mengirim...',
    'answer.submit': 'Kirim Jawaban',
    'answer.history': 'Riwayat Jawaban',
    'answer.aiFeedback': 'AI Feedback',

    // Early Warning Page
    'ew.title': 'Early Warning System ⚠️',
    'ew.subtitle': 'Pantau siswa berisiko dan ambil tindakan pencegahan',
    'ew.totalStudents': 'Total Siswa',
    'ew.highRisk': 'Risiko Tinggi',
    'ew.needsAttention': 'Perlu Perhatian',
    'ew.safe': 'Aman',
    'ew.lowRisk': 'Risiko Rendah',
    'ew.searchPlaceholder': 'Cari nama siswa...',
    'ew.all': 'Semua',
    'ew.notifications': 'Notifikasi',
    'ew.table.student': 'Siswa',
    'ew.table.class': 'Kelas',
    'ew.table.score': 'Skor',
    'ew.table.attendance': 'Kehadiran',
    'ew.table.trend': 'Trend',
    'ew.table.status': 'Status',
    'ew.table.lastActive': 'Terakhir Aktif',

    // Recommendation Page
    'rec.title': 'Rekomendasi Materi 💡',
    'rec.subtitle': 'Rekomendasi personal berdasarkan performa dan pola belajar Anda',
    'rec.aiTitle': 'Rekomendasi AI',
    'rec.aiDesc': 'Materi dipilih berdasarkan analisis performa, kebiasaan belajar, dan area yang perlu ditingkatkan.',
    'rec.start': 'Mulai',

    // Profile Page
    'profile.title': 'Profil 👤',
    'profile.subtitle': 'Kelola informasi akun Anda',
    'profile.accountInfo': 'Informasi Akun',
    'profile.savedSuccess': 'Profil berhasil disimpan',
    'profile.fullName': 'Nama Lengkap',
    'profile.email': 'Email',
    'profile.role': 'Role',
    'profile.joinDate': 'Bergabung',
    'profile.saving': 'Menyimpan...',
    'profile.saveChanges': 'Simpan Perubahan',
    'profile.security': 'Keamanan',
    'profile.changePassword': 'Ubah Password',
    'profile.roleGuru': '👨‍🏫 Guru',
    'profile.roleSiswa': '🎓 Siswa',
    'profile.roleAdmin': '⚙️ Admin',

    // Login Page
    'login.tagline': 'Platform Pembelajaran Adaptif dengan AI',
    'login.heading': 'Masuk ke Akun',
    'login.email': 'Email',
    'login.emailPlaceholder': 'nama@edumind.ai',
    'login.password': 'Password',
    'login.passwordPlaceholder': 'Masukkan password',
    'login.submit': 'Masuk',
    'login.noAccount': 'Belum punya akun?',
    'login.register': 'Daftar sekarang',
    'login.demoAccounts': 'Akun Demo',
    'login.roleGuru': 'Guru',
    'login.roleSiswa': 'Siswa',
    'login.roleAdmin': 'Admin',

    // Register Page
    'register.heading': 'Daftar Akun',
    'register.tagline': 'Mulai perjalanan belajar Anda dengan AI',
    'register.fullName': 'Nama Lengkap',
    'register.namePlaceholder': 'Nama lengkap Anda',
    'register.email': 'Email',
    'register.emailPlaceholder': 'nama@email.com',
    'register.password': 'Password',
    'register.passwordPlaceholder': 'Minimal 6 karakter',
    'register.role': 'Role',
    'register.submit': 'Daftar',
    'register.hasAccount': 'Sudah punya akun?',
    'register.login': 'Masuk',
    'register.roleSiswa': '🎓 Siswa',
    'register.roleGuru': '👨‍🏫 Guru',

    // Common / Shared
    'common.loading': 'Memuat...',
  },
  en: {
    // Sidebar / Navigation
    'nav.dashboard': 'Dashboard',
    'nav.learning': 'Learning Materials',
    'nav.recommendations': 'Recommendations',
    'nav.answerInput': 'Answer Questions',
    'nav.earlyWarning': 'Early Warning',
    'nav.profile': 'Profile',
    'nav.logout': 'Logout',
    'nav.lightMode': 'Light Mode',
    'nav.darkMode': 'Dark Mode',
    'nav.collapse': 'Collapse',
    'nav.language': 'Language',

    // Roles
    'role.siswa': 'Student',
    'role.guru': 'Teacher',
    'role.admin': 'Admin',

    // Dashboard
    'dash.welcome': 'Welcome,',
    'dash.subtitle.guru': 'Monitor student performance and manage learning.',
    'dash.subtitle.siswa': 'View learning progress and continue materials.',
    'dash.stats.totalStudents': 'Total Students',
    'dash.stats.activeToday': 'Active Today',
    'dash.stats.averageScore': 'Average Score',
    'dash.stats.atRiskStudents': 'At-Risk Students',
    'dash.classPerformance': 'Class Performance',
    'dash.monthlyAvgScore': 'Monthly average score',
    'dash.upwardTrend': 'Upward trend',
    'dash.quickActions': 'Quick Actions',
    'dash.recentActivities': 'Recent Activities',
    'dash.earlyWarning': 'Early Warning',
    'dash.studentsAtRisk': 'students at risk',
    'dash.stats.materialsCompleted': 'Materials Completed',
    'dash.stats.currentScore': 'Current Score',
    'dash.stats.rank': 'Rank',
    'dash.stats.learningStreak': 'Learning Streak',
    'dash.weeklyProgress': 'Weekly Progress',
    'dash.studyTimeMinutes': 'Study time (minutes)',
    'dash.startLearning': 'Start Learning',
    'dash.continueLearning': 'Continue Learning',
    'dash.materialsLeft': 'materials left',
    'dash.score': 'Score',
    'unit.days': 'days',

    // Learning Page
    'learn.title': 'Learning Materials 📚',
    'learn.subtitle': 'Explore and study materials that suit your needs',
    'learn.searchPlaceholder': 'Search materials...',
    'learn.all': 'All',
    'learn.progress': 'Progress',
    'learn.lessons': 'lessons',
    'learn.completed': 'Completed',
    'learn.continue': 'Continue',
    'learn.startLearning': 'Start Learning',
    'learn.noResults': 'No materials found',

    // Answer Input Page
    'answer.title': 'Answer Questions ✍️',
    'answer.subtitle': 'Submit your essay answers to get AI feedback',
    'answer.newForm': 'New Answer Form',
    'answer.successMsg': 'Answer submitted successfully! AI is analyzing...',
    'answer.subject': 'Subject',
    'answer.selectSubject': 'Select subject',
    'answer.topic': 'Topic',
    'answer.topicPlaceholder': 'Example: Definite Integral',
    'answer.question': 'Question',
    'answer.questionPlaceholder': 'Write the question you want to answer...',
    'answer.yourAnswer': 'Your Answer',
    'answer.answerPlaceholder': 'Write your essay answer here...',
    'answer.characters': 'characters',
    'answer.submitting': 'Submitting...',
    'answer.submit': 'Submit Answer',
    'answer.history': 'Answer History',
    'answer.aiFeedback': 'AI Feedback',

    // Early Warning Page
    'ew.title': 'Early Warning System ⚠️',
    'ew.subtitle': 'Monitor at-risk students and take preventive action',
    'ew.totalStudents': 'Total Students',
    'ew.highRisk': 'High Risk',
    'ew.needsAttention': 'Needs Attention',
    'ew.safe': 'Safe',
    'ew.lowRisk': 'Low Risk',
    'ew.searchPlaceholder': 'Search student name...',
    'ew.all': 'All',
    'ew.notifications': 'Notifications',
    'ew.table.student': 'Student',
    'ew.table.class': 'Class',
    'ew.table.score': 'Score',
    'ew.table.attendance': 'Attendance',
    'ew.table.trend': 'Trend',
    'ew.table.status': 'Status',
    'ew.table.lastActive': 'Last Active',

    // Recommendation Page
    'rec.title': 'Material Recommendations 💡',
    'rec.subtitle': 'Personal recommendations based on your performance and learning patterns',
    'rec.aiTitle': 'AI Recommendations',
    'rec.aiDesc': 'Materials selected based on performance analysis, learning habits, and areas for improvement.',
    'rec.start': 'Start',

    // Profile Page
    'profile.title': 'Profile 👤',
    'profile.subtitle': 'Manage your account information',
    'profile.accountInfo': 'Account Information',
    'profile.savedSuccess': 'Profile saved successfully',
    'profile.fullName': 'Full Name',
    'profile.email': 'Email',
    'profile.role': 'Role',
    'profile.joinDate': 'Joined',
    'profile.saving': 'Saving...',
    'profile.saveChanges': 'Save Changes',
    'profile.security': 'Security',
    'profile.changePassword': 'Change Password',
    'profile.roleGuru': '👨‍🏫 Teacher',
    'profile.roleSiswa': '🎓 Student',
    'profile.roleAdmin': '⚙️ Admin',

    // Login Page
    'login.tagline': 'Adaptive Learning Platform with AI',
    'login.heading': 'Sign In',
    'login.email': 'Email',
    'login.emailPlaceholder': 'name@edumind.ai',
    'login.password': 'Password',
    'login.passwordPlaceholder': 'Enter password',
    'login.submit': 'Sign In',
    'login.noAccount': "Don't have an account?",
    'login.register': 'Register now',
    'login.demoAccounts': 'Demo Accounts',
    'login.roleGuru': 'Teacher',
    'login.roleSiswa': 'Student',
    'login.roleAdmin': 'Admin',

    // Register Page
    'register.heading': 'Create Account',
    'register.tagline': 'Start your learning journey with AI',
    'register.fullName': 'Full Name',
    'register.namePlaceholder': 'Your full name',
    'register.email': 'Email',
    'register.emailPlaceholder': 'name@email.com',
    'register.password': 'Password',
    'register.passwordPlaceholder': 'Minimum 6 characters',
    'register.role': 'Role',
    'register.submit': 'Register',
    'register.hasAccount': 'Already have an account?',
    'register.login': 'Sign In',
    'register.roleSiswa': '🎓 Student',
    'register.roleGuru': '👨‍🏫 Teacher',

    // Common / Shared
    'common.loading': 'Loading...',
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try {
      return localStorage.getItem('edumind_language') || 'id';
    } catch {
      return 'id';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('edumind_language', language);
    } catch {
      // localStorage not available
    }
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'id' ? 'en' : 'id'));
  };

  const t = (key) => {
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
