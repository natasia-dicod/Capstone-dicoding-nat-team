import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import {
  ArrowLeft, BookOpen, Clock, CheckCircle2, AlertCircle,
  Send, Trophy, BarChart3, ChevronRight, Loader2, PlusCircle
} from 'lucide-react';

// Soal kuis per materi (keyed by material title keywords)
const quizBank = {
  default: [
    { id: 1, question: 'Apa konsep utama yang dipelajari dalam materi ini?', options: ['Konsep A', 'Konsep B', 'Konsep C', 'Konsep D'], correct: 0 },
    { id: 2, question: 'Manakah pernyataan yang paling benar?', options: ['Pernyataan 1', 'Pernyataan 2', 'Pernyataan 3', 'Pernyataan 4'], correct: 1 },
    { id: 3, question: 'Apa hasil dari penerapan konsep ini?', options: ['Hasil A', 'Hasil B', 'Hasil C', 'Hasil D'], correct: 2 },
  ],
  algoritma: [
    { id: 1, question: 'Apa yang dimaksud dengan algoritma?', options: ['Program komputer', 'Langkah-langkah sistematis untuk menyelesaikan masalah', 'Bahasa pemrograman', 'Database'], correct: 1 },
    { id: 2, question: 'Manakah yang bukan karakteristik algoritma yang baik?', options: ['Finite (terbatas)', 'Jelas dan tidak ambigu', 'Tidak memiliki output', 'Efektif'], correct: 2 },
    { id: 3, question: 'Apa kompleksitas waktu dari pencarian linear (linear search)?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], correct: 2 },
  ],
  variabel: [
    { id: 1, question: 'Apa itu variabel dalam pemrograman?', options: ['Fungsi yang bisa dipanggil', 'Tempat menyimpan data sementara', 'Loop pengulangan', 'Kondisi percabangan'], correct: 1 },
    { id: 2, question: 'Tipe data mana yang digunakan untuk menyimpan angka desimal?', options: ['int', 'string', 'boolean', 'float'], correct: 3 },
    { id: 3, question: 'Apa output dari: x = 5; y = 3; print(x + y)?', options: ['53', '8', 'xy', 'Error'], correct: 1 },
  ],
  array: [
    { id: 1, question: 'Apa itu array (larik)?', options: ['Satu variabel tunggal', 'Kumpulan data bertipe sama dalam satu variabel', 'Sebuah fungsi', 'Kondisi if-else'], correct: 1 },
    { id: 2, question: 'Indeks array biasanya dimulai dari?', options: ['1', '0', '-1', 'Tergantung bahasa'], correct: 1 },
    { id: 3, question: 'Berapa panjang array [10, 20, 30, 40, 50]?', options: ['4', '5', '6', '50'], correct: 1 },
  ],
  'machine learning': [
    { id: 1, question: 'Apa yang dimaksud dengan Machine Learning?', options: ['Mengajar mesin secara manual', 'Sistem yang belajar dari data tanpa diprogram eksplisit', 'Pembuatan robot', 'Pemrograman web'], correct: 1 },
    { id: 2, question: 'Manakah yang termasuk supervised learning?', options: ['K-Means Clustering', 'Regresi Linear', 'Principal Component Analysis', 'DBSCAN'], correct: 1 },
    { id: 3, question: 'Apa fungsi training data dalam ML?', options: ['Menghapus data lama', 'Melatih model agar bisa membuat prediksi', 'Membuat tampilan UI', 'Koneksi database'], correct: 1 },
  ],
  neural: [
    { id: 1, question: 'Apa inspirasi utama dari Neural Network?', options: ['Jaringan komputer', 'Cara kerja otak manusia', 'Algoritma sorting', 'Database relasional'], correct: 1 },
    { id: 2, question: 'Lapisan apa yang ada di antara input dan output layer?', options: ['Outer layer', 'Hidden layer', 'Middle layer', 'Core layer'], correct: 1 },
    { id: 3, question: 'Apa fungsi activation function dalam neural network?', options: ['Menyimpan data', 'Menghubungkan ke database', 'Menentukan apakah neuron aktif atau tidak', 'Membuat tampilan'], correct: 2 },
  ],
};

function getQuiz(title = '') {
  const lc = title.toLowerCase();
  for (const key of Object.keys(quizBank)) {
    if (key !== 'default' && lc.includes(key)) return quizBank[key];
  }
  return quizBank.default;
}

const DIFFICULTY_COLORS = {
  easy: 'badge-success', Mudah: 'badge-success',
  medium: 'badge-warning', Menengah: 'badge-warning',
  hard: 'badge-danger', Sulit: 'badge-danger',
};

const DIFFICULTY_LABELS = { easy: 'Mudah', medium: 'Menengah', hard: 'Sulit' };

export default function MaterialDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isSiswa } = useAuth();

  const [material, setMaterial] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Quiz state
  const [quizStarted, setQuizStarted] = useState(false);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [quizResult, setQuizResult] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [matRes, progRes] = await Promise.allSettled([
          api.get(`/api/materials/${id}`),
          api.get('/api/progress'),
        ]);

        if (matRes.status === 'fulfilled') {
          setMaterial(matRes.value.data.data);
        } else {
          setError('Materi tidak ditemukan.');
        }

        if (progRes.status === 'fulfilled') {
          const myProgress = progRes.value.data.data?.find(
            (p) => String(p.material_id) === String(id)
          );
          setProgress(myProgress || null);
        }
      } catch {
        setError('Gagal memuat materi.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const questions = material ? getQuiz(material.title) : [];

  const handleSelectAnswer = (qId, optIdx) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleSubmitQuiz = async () => {
    if (Object.keys(answers).length < questions.length) {
      alert('Harap jawab semua pertanyaan terlebih dahulu!');
      return;
    }
    setSubmitting(true);
    try {
      const answersPayload = questions.map((q) => ({
        question: q.question,
        answer: q.options[answers[q.id]],
        isCorrect: answers[q.id] === q.correct,
        score: answers[q.id] === q.correct ? 100 : 0,
      }));

      const correct = answersPayload.filter((a) => a.isCorrect).length;
      const avgScore = Math.round((correct / questions.length) * 100);

      await api.post('/api/quiz/bulk', {
        materialId: parseInt(id),
        answers: answersPayload,
      });

      setQuizResult({ correct, total: questions.length, score: avgScore });
      setSubmitted(true);

      // Refresh progress
      const progRes = await api.get('/api/progress');
      const myProgress = progRes.data.data?.find(
        (p) => String(p.material_id) === String(id)
      );
      setProgress(myProgress || { score: avgScore, status: avgScore >= 70 ? 'completed' : 'in_progress' });
    } catch (err) {
      console.error('Quiz submit error:', err);
      // Even if API fails, show local result
      const correct = questions.filter((q) => answers[q.id] === q.correct).length;
      const avgScore = Math.round((correct / questions.length) * 100);
      setQuizResult({ correct, total: questions.length, score: avgScore });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
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

  if (error || !material) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <AlertCircle size={48} className="text-danger" />
        <p className="text-text-muted">{error || 'Materi tidak ditemukan.'}</p>
        <button onClick={() => navigate('/learning')} className="btn-secondary flex items-center gap-2">
          <ArrowLeft size={16} /> Kembali ke Daftar Materi
        </button>
      </div>
    );
  }

  const diffLabel = DIFFICULTY_LABELS[material.difficulty] || material.difficulty;
  const diffClass = DIFFICULTY_COLORS[material.difficulty] || DIFFICULTY_COLORS[diffLabel] || 'badge-info';
  const progressScore = progress?.score ?? 0;
  const progressPct = Math.min(100, Math.round(progressScore));
  const isCompleted = progress?.status === 'completed';

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-text-muted mb-6">
        <Link to="/learning" className="hover:text-primary transition-colors flex items-center gap-1">
          <ArrowLeft size={14} /> Materi Belajar
        </Link>
        <ChevronRight size={14} />
        <span className="text-text-primary font-medium">{material.title}</span>
      </div>

      {/* Header Card */}
      <div className="glass-card p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl">📚</span>
              <div>
                <h1 className="text-xl font-bold text-text-primary">{material.title}</h1>
                <p className="text-sm text-text-muted">{material.subject}</p>
              </div>
            </div>
            <p className="text-text-secondary mt-3 leading-relaxed">
              {material.content || 'Pelajari materi ini dan kerjakan kuis untuk mengukur pemahamanmu.'}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <span className={diffClass}>{diffLabel}</span>
            <div className="flex items-center gap-1 text-xs text-text-muted">
              <Clock size={12} /> Est. 30-60 menit
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        {isSiswa && (
          <div className="mt-5 pt-4 border-t border-gray-200 dark:border-white/5">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-text-secondary font-medium">Progress Kamu</span>
              <span className={`font-bold ${isCompleted ? 'text-accent' : 'text-primary'}`}>
                {isCompleted ? '✅ Selesai' : `${progressPct}%`}
              </span>
            </div>
            <div className="h-2 bg-surface-light rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${isCompleted ? 'bg-accent' : 'gradient-bg'}`}
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="glass-card p-6 mb-6">
        <h2 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
          <BookOpen size={18} className="text-primary" /> Materi Pembelajaran
        </h2>
        <div className="prose prose-sm max-w-none text-text-secondary leading-relaxed space-y-3">
          {material.content ? (
            <p>{material.content}</p>
          ) : (
            <>
              <p>
                Selamat datang di materi <strong className="text-text-primary">{material.title}</strong>.
                Materi ini dirancang untuk membantu kamu memahami konsep-konsep dasar yang penting.
              </p>
              <p>
                Pelajari materi ini dengan seksama, kemudian kerjakan kuis di bawah untuk mengukur
                pemahaman kamu. Kamu bisa mengerjakan kuis berkali-kali untuk meningkatkan skor.
              </p>
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                <p className="text-sm font-medium text-primary mb-1">💡 Tips Belajar</p>
                <p className="text-sm">
                  Fokus pada konsep inti, buat catatan singkat, dan jangan ragu untuk mengulang
                  jika ada yang kurang dipahami.
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Quiz Section — only for siswa */}
      {isSiswa && (
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-text-primary flex items-center gap-2">
              <PlusCircle size={18} className="text-accent" /> Kuis Pemahaman
            </h2>
            <span className="text-xs text-text-muted">{questions.length} soal</span>
          </div>

          {/* Result Screen */}
          {submitted && quizResult && (
            <div className={`p-5 rounded-xl mb-6 text-center border ${
              quizResult.score >= 70
                ? 'bg-accent/10 border-accent/20'
                : 'bg-warning/10 border-warning/20'
            }`}>
              <div className="text-4xl mb-2">{quizResult.score >= 70 ? '🎉' : '📚'}</div>
              <p className="text-2xl font-bold text-text-primary">{quizResult.score}/100</p>
              <p className="text-sm text-text-secondary mt-1">
                {quizResult.correct} dari {quizResult.total} soal benar
              </p>
              <p className={`text-sm font-medium mt-2 ${quizResult.score >= 70 ? 'text-accent' : 'text-warning'}`}>
                {quizResult.score >= 70
                  ? '✅ Selamat! Materi ini sudah selesai!'
                  : '📖 Pelajari kembali materi di atas dan coba lagi.'}
              </p>
              <button
                onClick={() => { setSubmitted(false); setAnswers({}); setQuizResult(null); }}
                className="mt-4 btn-secondary text-sm"
              >
                Ulangi Kuis
              </button>
            </div>
          )}

          {/* Quiz Questions */}
          {!quizStarted ? (
            <div className="text-center py-6">
              <Trophy size={48} className="mx-auto mb-3 text-accent opacity-50" />
              <p className="text-text-secondary mb-1">Siap mengerjakan kuis?</p>
              <p className="text-xs text-text-muted mb-4">
                Kuis ini terdiri dari {questions.length} soal pilihan ganda.
                Skor ≥ 70 untuk menyelesaikan materi.
              </p>
              <button onClick={() => setQuizStarted(true)} className="btn-primary">
                Mulai Kuis
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-5">
                {questions.map((q, qi) => {
                  const selected = answers[q.id];
                  return (
                    <div key={q.id} className="p-4 rounded-xl bg-surface-light/20">
                      <p className="text-sm font-medium text-text-primary mb-3">
                        <span className="inline-flex w-6 h-6 rounded-full bg-primary/10 text-primary text-xs items-center justify-center mr-2 font-bold">
                          {qi + 1}
                        </span>
                        {q.question}
                      </p>
                      <div className="space-y-2">
                        {q.options.map((opt, oi) => {
                          let cls = 'border border-gray-200 dark:border-white/10 bg-surface-light/20 text-text-secondary hover:bg-primary/5 hover:border-primary/30';
                          if (submitted) {
                            if (oi === q.correct) cls = 'border border-accent/40 bg-accent/10 text-accent font-medium';
                            else if (selected === oi && oi !== q.correct) cls = 'border border-danger/40 bg-danger/10 text-danger';
                          } else if (selected === oi) {
                            cls = 'border border-primary/40 bg-primary/10 text-primary font-medium';
                          }
                          return (
                            <button
                              key={oi}
                              onClick={() => handleSelectAnswer(q.id, oi)}
                              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all ${cls}`}
                              disabled={submitted}
                            >
                              <span className="mr-2 font-medium">{String.fromCharCode(65 + oi)}.</span>
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {!submitted && (
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs text-text-muted">
                    {Object.keys(answers).length}/{questions.length} soal dijawab
                  </span>
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={submitting || Object.keys(answers).length < questions.length}
                    className="btn-primary flex items-center gap-2 disabled:opacity-50"
                  >
                    {submitting ? (
                      <><Loader2 size={16} className="animate-spin" /> Mengirim...</>
                    ) : (
                      <><Send size={16} /> Kumpulkan Jawaban</>
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* For teacher/admin — no quiz, show manage hint */}
      {!isSiswa && (
        <div className="glass-card p-6 text-center text-text-muted">
          <BarChart3 size={32} className="mx-auto mb-2 opacity-40" />
          <p className="text-sm">Kuis hanya tersedia untuk siswa.</p>
          <p className="text-xs mt-1">Anda dapat mengedit materi ini dari daftar materi.</p>
        </div>
      )}
    </div>
  );
}
