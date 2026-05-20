import { useState } from 'react';
import { mockAnswerHistory } from '../../mock/data';
import { PenTool, Send, Clock, CheckCircle2, Loader2, BookOpen, ChevronDown } from 'lucide-react';

export default function AnswerInputPage() {
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setAnswer('');
      setQuestion('');
    }, 2000);
  };

  const getStatusBadge = (status) => {
    if (status === 'reviewed') return <span className="badge-success"><CheckCircle2 size={12} className="mr-1" /> Reviewed</span>;
    return <span className="badge-warning"><Loader2 size={12} className="mr-1 animate-spin" /> Pending</span>;
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Jawab Soal ✍️</h1>
        <p className="page-subtitle">Kirim jawaban essay Anda untuk mendapatkan feedback AI</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Input Form */}
        <div className="lg:col-span-3">
          <div className="glass-card p-6">
            <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
              <PenTool size={18} className="text-primary" /> Form Jawaban Baru
            </h3>

            {submitted && (
              <div className="mb-4 px-4 py-3 bg-accent/10 border border-accent/20 rounded-xl text-accent text-sm animate-fade-in flex items-center gap-2">
                <CheckCircle2 size={16} /> Jawaban berhasil dikirim! AI sedang menganalisis...
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">Mata Pelajaran</label>
                  <select
                    id="answer-subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="input-field appearance-none"
                    required
                  >
                    <option value="">Pilih mata pelajaran</option>
                    <option value="Matematika">Matematika</option>
                    <option value="Fisika">Fisika</option>
                    <option value="Kimia">Kimia</option>
                    <option value="Biologi">Biologi</option>
                    <option value="Bahasa Inggris">Bahasa Inggris</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">Topik</label>
                  <input
                    id="answer-topic"
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="input-field"
                    placeholder="Contoh: Integral Tentu"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1.5">Soal / Pertanyaan</label>
                <textarea
                  id="answer-question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="input-field resize-none"
                  rows={3}
                  placeholder="Tuliskan soal yang ingin Anda jawab..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1.5">Jawaban Anda</label>
                <textarea
                  id="answer-content"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="input-field resize-none"
                  rows={8}
                  placeholder="Tuliskan jawaban essay Anda di sini..."
                  required
                />
                <p className="text-xs text-text-muted mt-1.5">{answer.length} karakter</p>
              </div>

              <button
                id="answer-submit"
                type="submit"
                disabled={submitting}
                className="btn-primary flex items-center gap-2"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  <>
                    <Send size={16} /> Kirim Jawaban
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* History */}
        <div className="lg:col-span-2">
          <div className="glass-card p-6">
            <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
              <Clock size={18} className="text-primary" /> Riwayat Jawaban
            </h3>
            <div className="space-y-3">
              {mockAnswerHistory.map((item) => (
                <div key={item.id} className="p-4 rounded-xl bg-surface-light/20 hover:bg-surface-light/40 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-text-primary">{item.subject}</span>
                    {getStatusBadge(item.status)}
                  </div>
                  <p className="text-xs text-text-secondary mb-2">{item.topic}</p>
                  <p className="text-xs text-text-muted line-clamp-2">{item.question}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-[10px] text-text-muted">{item.submittedAt}</span>
                    {item.score && <span className="text-sm font-bold text-accent">{item.score}/100</span>}
                  </div>
                  {item.feedback && (
                    <div className="mt-3 px-3 py-2 rounded-lg bg-primary/5 border border-primary/10 text-xs text-text-secondary">
                      <span className="font-medium text-primary">AI Feedback:</span> {item.feedback}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
