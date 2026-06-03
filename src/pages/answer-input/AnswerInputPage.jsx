import { useState, useEffect } from 'react';
import { mockAnswerHistory } from '../../mock/data';
import api from '../../services/api';
import { PenTool, Send, Clock, CheckCircle2, Loader2, BookOpen, ChevronDown, Info, Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function AnswerInputPage() {
  const { t } = useLanguage();
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get('/api/predictions');
        if (response.data.data && response.data.data.length > 0) {
          const apiHistory = response.data.data.map(h => ({
            id: h.id,
            subject: 'Materi AI',
            topic: t('answer.history'),
            question: h.question || t('answer.history'),
            answer: h.answer,
            score: h.score,
            feedback: h.feedback,
            status: h.feedback ? 'reviewed' : 'pending',
            submittedAt: t('answer.justNow')
          }));
          setHistory(apiHistory);
        } else {
          setHistory(mockAnswerHistory);
        }
      } catch (error) {
        console.warn('Failed to fetch answer history', error);
        setHistory(mockAnswerHistory);
      } finally {
        setLoadingHistory(false);
      }
    };
    fetchHistory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');

    try {
      const response = await api.post('/api/predictions', { question, answer });
      const data = response.data?.data || {};

      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      const submittedQuestion = question;
      const submittedSubject = subject || 'Lainnya';
      const submittedTopic = topic;
      setAnswer('');
      setQuestion('');

      // Pakai data asli dari backend (skor & feedback dari AI bila ML hidup)
      setHistory(prev => [{
        id: data.id ?? Date.now(),
        subject: submittedSubject,
        topic: submittedTopic,
        question: data.question || submittedQuestion,
        answer: data.answer,
        score: data.score,
        feedback: data.feedback,
        status: data.feedback ? 'reviewed' : 'pending',
        submittedAt: t('answer.justNow'),
      }, ...prev]);
    } catch (error) {
      const msg = error.response?.data?.message || 'Gagal mengirim jawaban. Pastikan kamu sudah login dan backend berjalan.';
      console.error('Submit failed:', error);
      setSubmitError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (status) => {
    if (status === 'reviewed') return <span className="badge-success"><CheckCircle2 size={12} className="mr-1" /> Reviewed</span>;
    return <span className="badge-warning"><Loader2 size={12} className="mr-1 animate-spin" /> Pending</span>;
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">{t('answer.title')}</h1>
        <p className="page-subtitle">{t('answer.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Input Form */}
        <div className="lg:col-span-3">
          <div className="glass-card p-6">
            <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
              <PenTool size={18} className="text-primary" /> {t('answer.newForm')}
            </h3>

            {/* AI Tips Banner */}
            <div className="mb-5 flex items-start gap-3 px-4 py-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-sm">
              <Globe size={18} className="text-blue-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-blue-500 mb-0.5">{t('answer.tipsTitle')}</p>
                <p className="text-text-secondary text-xs leading-relaxed">
                  {t('answer.tipsDesc')}{' '}
                  <span className="font-semibold text-blue-400">{t('answer.tipsQuestion')}</span>{' '}
                  {t('answer.tipsAnd')}{' '}
                  <span className="font-semibold text-blue-400">{t('answer.tipsAnswer')}</span>{' '}
                  <span className="font-semibold text-blue-400">{t('answer.tipsLang')}</span>
                  {t('answer.tipsNote')}
                </p>
              </div>
            </div>

            {submitted && (
              <div className="mb-4 px-4 py-3 bg-accent/10 border border-accent/20 rounded-xl text-accent text-sm animate-fade-in flex items-center gap-2">
                <CheckCircle2 size={16} /> {t('answer.successMsg')}
              </div>
            )}

            {submitError && (
              <div className="mb-4 px-4 py-3 bg-danger/10 border border-danger/20 rounded-xl text-danger text-sm animate-fade-in">
                {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">
                    {t('answer.subject')} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="answer-subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="input-field appearance-none"
                    required
                  >
                    <option value="">{t('answer.selectSubject')}</option>
                    <option value="Mathematics">{t('answer.subjectMath')}</option>
                    <option value="Physics">{t('answer.subjectPhysics')}</option>
                    <option value="Chemistry">{t('answer.subjectChem')}</option>
                    <option value="Biology">{t('answer.subjectBio')}</option>
                    <option value="English">{t('answer.subjectEng')}</option>
                    <option value="History">{t('answer.subjectHistory')}</option>
                    <option value="Computer Science">{t('answer.subjectCS')}</option>
                    <option value="Other">{t('answer.subjectOther')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">
                    {t('answer.topic')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="answer-topic"
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="input-field"
                    placeholder={t('answer.topicPlaceholder')}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1.5">
                  {t('answer.question')} <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="answer-question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="input-field resize-none"
                  rows={3}
                  placeholder={t('answer.questionPlaceholder')}
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-medium text-text-secondary">
                    {t('answer.yourAnswer')} <span className="text-red-500">*</span>
                  </label>
                  <span className="flex items-center gap-1 text-[11px] text-blue-400 font-medium">
                    <Globe size={11} />
                    {t('answer.writeInEnglish')}
                  </span>
                </div>
                <textarea
                  id="answer-content"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="input-field resize-none"
                  rows={8}
                  placeholder={t('answer.answerPlaceholder')}
                  required
                />
                <div className="flex items-center justify-between mt-1.5">
                  <p className="text-xs text-text-muted">{answer.length} {t('answer.characters')}</p>
                  <p className="text-[11px] text-text-muted flex items-center gap-1">
                    <Info size={10} />
                    <span className="text-red-400">*</span> {t('answer.requiredFields')}
                  </p>
                </div>
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
                    {t('answer.submitting')}
                  </>
                ) : (
                  <>
                    <Send size={16} /> {t('answer.submit')}
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
              <Clock size={18} className="text-primary" /> {t('answer.history')}
            </h3>
            {loadingHistory ? (
              <p className="text-sm text-text-muted">{t('answer.loadingHistory')}</p>
            ) : (
              <div className="space-y-3">
                {history.map((item) => (
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
                        <span className="font-medium text-primary">{t('answer.aiFeedback')}:</span> {item.feedback}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
