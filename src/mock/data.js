// Mock Users Database
export const mockUsers = [
  {
    id: 1,
    name: 'Dr. Rina Sari',
    email: 'rina@edumind.ai',
    password: 'guru123',
    role: 'guru',
    avatar: null,
    subject: 'Matematika',
    createdAt: '2026-01-15',
  },
  {
    id: 2,
    name: 'Budi Santoso',
    email: 'budi@edumind.ai',
    password: 'siswa123',
    role: 'siswa',
    avatar: null,
    class: 'XII-IPA-1',
    createdAt: '2026-02-01',
  },
  {
    id: 3,
    name: 'Admin Utama',
    email: 'admin@edumind.ai',
    password: 'admin123',
    role: 'admin',
    avatar: null,
    createdAt: '2026-01-01',
  },
];

// Dashboard Stats
export const mockDashboardStats = {
  guru: {
    totalStudents: 156,
    activeToday: 89,
    averageScore: 76.5,
    atRiskStudents: 12,
    completionRate: 68,
    recentActivities: [
      { id: 1, student: 'Budi Santoso', action: 'Mengirim jawaban essay', subject: 'Matematika', time: '5 menit lalu' },
      { id: 2, student: 'Ani Wulandari', action: 'Menyelesaikan materi', subject: 'Fisika', time: '12 menit lalu' },
      { id: 3, student: 'Candra Dewi', action: 'Memulai quiz', subject: 'Kimia', time: '20 menit lalu' },
      { id: 4, student: 'Dimas Prasetyo', action: 'Bertanya ke AI', subject: 'Biologi', time: '25 menit lalu' },
    ],
    performanceChart: [
      { month: 'Jan', score: 72 },
      { month: 'Feb', score: 74 },
      { month: 'Mar', score: 71 },
      { month: 'Apr', score: 76 },
    ],
  },
  siswa: {
    totalCompleted: 24,
    totalMaterials: 40,
    currentScore: 82,
    rank: 5,
    streak: 7,
    recentActivities: [
      { id: 1, action: 'Menyelesaikan materi Aljabar', time: '1 jam lalu', score: 85 },
      { id: 2, action: 'Mengirim essay Fisika Kuantum', time: '3 jam lalu', score: null },
      { id: 3, action: 'Quiz Kimia Organik', time: 'Kemarin', score: 90 },
    ],
    weeklyProgress: [
      { day: 'Sen', minutes: 45 },
      { day: 'Sel', minutes: 60 },
      { day: 'Rab', minutes: 30 },
      { day: 'Kam', minutes: 75 },
      { day: 'Jum', minutes: 50 },
      { day: 'Sab', minutes: 20 },
      { day: 'Min', minutes: 0 },
    ],
  },
};

// Chat Messages
export const mockChatConversations = [
  { id: 1, title: 'Bantuan Matematika', lastMessage: 'Terima kasih, saya sudah paham!', time: '5m lalu', unread: 0 },
  { id: 2, title: 'Penjelasan Fisika Kuantum', lastMessage: 'Bisa jelaskan tentang superposisi?', time: '1h lalu', unread: 2 },
  { id: 3, title: 'Essay Writing Tips', lastMessage: 'Berikut contoh paragraf pembuka...', time: 'Kemarin', unread: 0 },
];

export const mockChatMessages = [
  {
    id: 1,
    role: 'assistant',
    content: 'Halo! 👋 Saya SALC, asisten virtual pembelajaran Anda. Saya bisa membantu Anda dengan:\n\n🔍 **Mencari informasi** tentang materi pelajaran\n📝 **Menjawab pertanyaan** essay atau soal\n🖼️ **Membuat gambar** ilustrasi untuk belajar\n📊 **Menganalisis performa** belajar Anda\n\nApa yang bisa saya bantu hari ini?',
    time: '10:00',
  },
  {
    id: 2,
    role: 'user',
    content: 'Bisa jelaskan tentang integral dalam kalkulus?',
    time: '10:01',
  },
  {
    id: 3,
    role: 'assistant',
    content: 'Tentu! **Integral** adalah salah satu konsep fundamental dalam kalkulus. Ada dua jenis integral:\n\n**1. Integral Tak Tentu (Indefinite Integral)**\nMerupakan kebalikan dari turunan (anti-derivatif).\n∫ f(x) dx = F(x) + C\n\n**2. Integral Tentu (Definite Integral)**\nMenghitung luas di bawah kurva antara dua batas.\n∫ₐᵇ f(x) dx = F(b) - F(a)\n\n💡 **Contoh sederhana:**\n∫ 2x dx = x² + C\n\nApakah Anda ingin saya berikan latihan soal atau penjelasan lebih detail tentang salah satu jenisnya?',
    time: '10:01',
  },
];

// Learning Materials
export const mockMaterials = [
  {
    id: 1,
    title: 'Aljabar Linear',
    subject: 'Matematika',
    description: 'Pelajari konsep dasar aljabar linear termasuk matriks, vektor, dan transformasi linear.',
    difficulty: 'Menengah',
    duration: '45 menit',
    progress: 75,
    totalLessons: 8,
    completedLessons: 6,
    icon: '📐',
  },
  {
    id: 2,
    title: 'Fisika Kuantum Dasar',
    subject: 'Fisika',
    description: 'Memahami prinsip dasar mekanika kuantum, superposisi, dan dualitas gelombang-partikel.',
    difficulty: 'Sulit',
    duration: '60 menit',
    progress: 30,
    totalLessons: 12,
    completedLessons: 4,
    icon: '⚛️',
  },
  {
    id: 3,
    title: 'Kimia Organik',
    subject: 'Kimia',
    description: 'Mempelajari struktur, sifat, dan reaksi senyawa organik berbasis karbon.',
    difficulty: 'Menengah',
    duration: '50 menit',
    progress: 100,
    totalLessons: 10,
    completedLessons: 10,
    icon: '🧪',
  },
  {
    id: 4,
    title: 'Biologi Sel',
    subject: 'Biologi',
    description: 'Eksplorasi struktur dan fungsi sel, organel, dan proses seluler.',
    difficulty: 'Mudah',
    duration: '35 menit',
    progress: 50,
    totalLessons: 6,
    completedLessons: 3,
    icon: '🔬',
  },
  {
    id: 5,
    title: 'Kalkulus Diferensial',
    subject: 'Matematika',
    description: 'Turunan, limit, dan aplikasinya dalam pemecahan masalah.',
    difficulty: 'Sulit',
    duration: '55 menit',
    progress: 0,
    totalLessons: 10,
    completedLessons: 0,
    icon: '📊',
  },
  {
    id: 6,
    title: 'Bahasa Inggris Akademik',
    subject: 'Bahasa',
    description: 'Menulis esai akademik, struktur argumentasi, dan referensi.',
    difficulty: 'Menengah',
    duration: '40 menit',
    progress: 60,
    totalLessons: 8,
    completedLessons: 5,
    icon: '📝',
  },
];

// Student Answers
export const mockAnswerHistory = [
  {
    id: 1,
    subject: 'Matematika',
    topic: 'Integral Tentu',
    question: 'Hitunglah ∫₀² (3x² + 2x) dx dan jelaskan langkah-langkahnya.',
    answer: 'Langkah 1: Anti-turunan dari 3x² adalah x³, dan anti-turunan dari 2x adalah x²...',
    submittedAt: '2026-04-27 09:30',
    status: 'reviewed',
    score: 85,
    feedback: 'Jawaban cukup baik! Langkah-langkah perhitungan sudah benar. Namun, perlu ditambahkan penjelasan tentang Teorema Fundamental Kalkulus.',
  },
  {
    id: 2,
    subject: 'Fisika',
    topic: 'Hukum Newton',
    question: 'Jelaskan penerapan Hukum Newton III dalam kehidupan sehari-hari.',
    answer: 'Hukum Newton III menyatakan bahwa setiap aksi memiliki reaksi yang sama besar...',
    submittedAt: '2026-04-26 14:15',
    status: 'pending',
    score: null,
    feedback: null,
  },
  {
    id: 3,
    subject: 'Kimia',
    topic: 'Reaksi Redoks',
    question: 'Analisis reaksi redoks pada proses korosi besi.',
    answer: 'Korosi besi terjadi karena reaksi oksidasi dimana besi (Fe) kehilangan elektron...',
    submittedAt: '2026-04-25 11:00',
    status: 'reviewed',
    score: 92,
    feedback: 'Excellent! Penjelasan sangat detail dan komprehensif. Diagram reaksi juga sudah tepat.',
  },
];

// Early Warning Data
export const mockEarlyWarningStudents = [
  { id: 1, name: 'Ahmad Fauzi', class: 'XII-IPA-1', score: 45, attendance: 60, status: 'high-risk', trend: 'down', lastActive: '3 hari lalu' },
  { id: 2, name: 'Siti Nurhaliza', class: 'XII-IPA-1', score: 55, attendance: 75, status: 'medium-risk', trend: 'stable', lastActive: '1 hari lalu' },
  { id: 3, name: 'Reza Mahendra', class: 'XII-IPA-2', score: 48, attendance: 65, status: 'high-risk', trend: 'down', lastActive: '5 hari lalu' },
  { id: 4, name: 'Dewi Lestari', class: 'XII-IPA-1', score: 62, attendance: 80, status: 'low-risk', trend: 'up', lastActive: '2 jam lalu' },
  { id: 5, name: 'Farhan Maulana', class: 'XII-IPA-2', score: 38, attendance: 50, status: 'high-risk', trend: 'down', lastActive: '1 minggu lalu' },
  { id: 6, name: 'Aisyah Putri', class: 'XII-IPA-1', score: 58, attendance: 70, status: 'medium-risk', trend: 'stable', lastActive: 'Hari ini' },
  { id: 7, name: 'Yoga Pratama', class: 'XII-IPA-2', score: 72, attendance: 90, status: 'safe', trend: 'up', lastActive: 'Hari ini' },
  { id: 8, name: 'Nurul Hidayah', class: 'XII-IPA-1', score: 85, attendance: 95, status: 'safe', trend: 'up', lastActive: 'Hari ini' },
];

export const mockAlerts = [
  { id: 1, type: 'danger', message: 'Farhan Maulana tidak aktif selama 1 minggu', time: 'Hari ini' },
  { id: 2, type: 'warning', message: '3 siswa memiliki skor di bawah 50', time: 'Hari ini' },
  { id: 3, type: 'info', message: 'Dewi Lestari menunjukkan peningkatan performa', time: 'Kemarin' },
];

// Recommendations
export const mockRecommendations = [
  {
    id: 1,
    title: 'Latihan Integral Tentu',
    subject: 'Matematika',
    reason: 'Berdasarkan skor quiz terakhir, Anda perlu penguatan di topik ini.',
    difficulty: 'Menengah',
    duration: '30 menit',
    matchScore: 95,
    icon: '📐',
  },
  {
    id: 2,
    title: 'Review Hukum Newton',
    subject: 'Fisika',
    reason: 'Jawaban essay terakhir menunjukkan kesalahan konsep pada Hukum Newton III.',
    difficulty: 'Mudah',
    duration: '20 menit',
    matchScore: 88,
    icon: '🚀',
  },
  {
    id: 3,
    title: 'Praktikum Virtual: Titrasi',
    subject: 'Kimia',
    reason: 'Materi lanjutan dari Kimia Organik yang sudah Anda selesaikan.',
    difficulty: 'Menengah',
    duration: '45 menit',
    matchScore: 82,
    icon: '🧪',
  },
  {
    id: 4,
    title: 'Essay Writing: Argumentative',
    subject: 'Bahasa Inggris',
    reason: 'Skill yang dibutuhkan untuk tugas akhir semester.',
    difficulty: 'Sulit',
    duration: '40 menit',
    matchScore: 75,
    icon: '✍️',
  },
];

// AI Quick Actions
export const aiQuickActions = [
  { id: 1, icon: '🔍', label: 'Cari Informasi', prompt: 'Bantu saya mencari informasi tentang ' },
  { id: 2, icon: '🖼️', label: 'Buat Gambar', prompt: 'Buatkan gambar ilustrasi tentang ' },
  { id: 3, icon: '📝', label: 'Bantu Essay', prompt: 'Bantu saya menulis essay tentang ' },
  { id: 4, icon: '📊', label: 'Analisis Performa', prompt: 'Analisis performa belajar saya di ' },
  { id: 5, icon: '💡', label: 'Jelaskan Konsep', prompt: 'Jelaskan konsep tentang ' },
  { id: 6, icon: '✏️', label: 'Edit Foto', prompt: 'Bantu saya mengedit foto ini: ' },
];

// Suggested Prompts for Chat
export const suggestedPrompts = [
  'Jelaskan integral dalam kalkulus dengan contoh',
  'Apa perbedaan mitosis dan meiosis?',
  'Bantu saya memahami Hukum Termodinamika',
  'Buat ringkasan materi Kimia Organik',
];
