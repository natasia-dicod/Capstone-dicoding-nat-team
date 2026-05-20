import { useState, useRef, useEffect } from 'react';
import { mockChatMessages, mockChatConversations, aiQuickActions, suggestedPrompts } from '../../mock/data';
import {
  Send,
  Plus,
  Search,
  Sparkles,
  Image,
  Mic,
  Paperclip,
  MoreVertical,
  MessageSquarePlus,
  ChevronLeft,
} from 'lucide-react';

function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 px-5 py-3.5 max-w-[80%] bg-surface-light rounded-2xl rounded-tl-md animate-fade-in">
      <div className="flex items-center gap-1">
        <div className="typing-dot" style={{ animationDelay: '0s' }} />
        <div className="typing-dot" style={{ animationDelay: '0.2s' }} />
        <div className="typing-dot" style={{ animationDelay: '0.4s' }} />
      </div>
      <span className="text-xs text-text-muted ml-1">EduMind sedang mengetik...</span>
    </div>
  );
}

function ChatBubble({ message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-xl bg-white p-0.5 flex items-center justify-center flex-shrink-0 mr-3 mt-1 shadow-sm">
          <img src="/favicon.png" alt="Aplikasi Pintar" className="w-full h-full object-contain" />
        </div>
      )}
      <div className={isUser ? 'chat-bubble-user' : 'chat-bubble-ai'}>
        <div className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</div>
        <p className={`text-[10px] mt-2 ${isUser ? 'text-white/50' : 'text-text-muted'}`}>{message.time}</p>
      </div>
    </div>
  );
}

function QuickActionCard({ action, onSelect }) {
  return (
    <button
      onClick={() => onSelect(action.prompt)}
      className="glass-card-hover px-4 py-3 flex items-center gap-3 text-left min-w-[180px]"
    >
      <span className="text-2xl">{action.icon}</span>
      <span className="text-sm font-medium text-text-primary">{action.label}</span>
    </button>
  );
}

export default function ChatPage() {
  const [messages, setMessages] = useState(mockChatMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSidebar, setShowSidebar] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setShowSidebar(false);
      } else {
        setShowSidebar(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const [conversations] = useState(mockChatConversations);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const mockAIResponses = [
    'Pertanyaan yang bagus! Mari saya jelaskan secara detail...\n\nBerdasarkan konsep yang Anda tanyakan, berikut penjelasannya:\n\n1. **Konsep Dasar**: Ini merupakan fondasi penting yang perlu dipahami terlebih dahulu.\n\n2. **Penerapan**: Dalam praktiknya, konsep ini digunakan untuk memecahkan berbagai masalah.\n\n3. **Contoh**: Misalnya dalam kehidupan sehari-hari...\n\nApakah ada bagian yang ingin saya jelaskan lebih detail?',
    'Tentu, saya bisa membantu! 🎯\n\nBerikut ringkasan materi yang Anda minta:\n\n📌 **Poin Utama:**\n- Definisi dan konsep dasar\n- Formula dan rumus penting\n- Contoh soal dan penyelesaian\n\n💡 **Tips belajar:** Coba kerjakan latihan soal secara bertahap dari yang mudah ke yang sulit.\n\nMau saya buatkan latihan soal untuk topik ini?',
    'Saya sudah menganalisis pertanyaan Anda. 📊\n\nBerikut jawaban saya:\n\nKonsep ini sangat penting karena menjadi dasar untuk topik-topik lanjutan. Pastikan Anda memahami:\n\n✅ Teori dasar\n✅ Formula utama\n✅ Cara penerapannya\n\nJika ada yang masih kurang jelas, jangan ragu untuk bertanya lagi! 😊',
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: input.trim(),
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        role: 'assistant',
        content: mockAIResponses[Math.floor(Math.random() * mockAIResponses.length)],
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1500);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickAction = (prompt) => {
    setInput(prompt);
    inputRef.current?.focus();
  };

  const handleSuggestedPrompt = (prompt) => {
    setInput(prompt);
    inputRef.current?.focus();
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="relative h-[calc(100vh-4rem)] flex -m-4 md:-m-8 animate-fade-in overflow-hidden">
      {/* Conversations Sidebar Overlay */}
      {showSidebar && window.innerWidth < 768 && (
        <div 
          className="absolute inset-0 z-20 bg-black/50 md:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Conversations Sidebar */}
      {showSidebar && (
        <div className={`
          absolute z-30 h-full w-[280px] bg-surface border-r border-gray-200 dark:border-white/5 flex flex-col flex-shrink-0 transition-transform md:relative md:translate-x-0
        `}>
          <div className="p-4 border-b border-gray-200 dark:border-white/5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-text-primary">Percakapan</h2>
              <button className="btn-icon" title="Percakapan Baru">
                <MessageSquarePlus size={18} />
              </button>
            </div>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                placeholder="Cari percakapan..."
                className="input-field pl-9 py-2 text-sm"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                className={`w-full text-left px-3 py-3 rounded-xl transition-all duration-200 ${
                  conv.id === 1
                    ? 'bg-primary/10 border border-primary/20'
                    : 'hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-text-primary truncate pr-2">{conv.title}</span>
                  <span className="text-[10px] text-text-muted flex-shrink-0">{conv.time}</span>
                </div>
                <p className="text-xs text-text-muted truncate">{conv.lastMessage}</p>
                {conv.unread > 0 && (
                  <span className="inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold rounded-full gradient-bg text-white mt-1">
                    {conv.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-surface-dark">
        {/* Chat Header */}
        <div className="h-14 px-4 flex items-center justify-between border-b border-gray-200 dark:border-white/5 bg-surface/50 backdrop-blur-sm flex-shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setShowSidebar(!showSidebar)} className="btn-icon">
              <ChevronLeft size={18} className={`transition-transform ${showSidebar ? '' : 'rotate-180'}`} />
            </button>
            <div className="w-8 h-8 rounded-xl bg-white p-1 flex items-center justify-center shadow-sm">
              <img src="/favicon.png" alt="Aplikasi Pintar Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text-primary">Aplikasi Pintar</h3>
              <p className="text-[10px] text-accent flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" /> Online
              </p>
            </div>
          </div>
          <button className="btn-icon">
            <MoreVertical size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4">
          {isEmpty ? (
            /* Empty State */
            <div className="h-full flex flex-col items-center justify-center text-center px-4">
              <div className="w-20 h-20 bg-white p-2 rounded-3xl flex items-center justify-center mb-6 animate-pulse-glow shadow-md">
                <img src="/favicon.png" alt="Aplikasi Pintar Logo" className="w-full h-full object-contain" />
              </div>
              <h2 className="text-2xl font-bold text-text-primary mb-2">Halo! Saya Aplikasi Pintar 👋</h2>
              <p className="text-text-secondary mb-8 max-w-md">
                Asisten virtual pembelajaran Anda. Tanya apapun tentang materi pelajaran, minta bantuan essay, atau jelajahi fitur AI lainnya.
              </p>

              {/* Suggested Prompts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg w-full mb-6">
                {suggestedPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestedPrompt(prompt)}
                    className="glass-card-hover px-4 py-3 text-sm text-left text-text-secondary hover:text-text-primary"
                  >
                    💡 {prompt}
                  </button>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap justify-center gap-3">
                {aiQuickActions.slice(0, 4).map((action) => (
                  <QuickActionCard key={action.id} action={action} onSelect={handleQuickAction} />
                ))}
              </div>
            </div>
          ) : (
            /* Messages List */
            <>
              {messages.map((msg) => (
                <ChatBubble key={msg.id} message={msg} />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Quick Actions Scroll (when chat has messages) */}
        {!isEmpty && (
          <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-none">
            {aiQuickActions.map((action) => (
              <button
                key={action.id}
                onClick={() => handleQuickAction(action.prompt)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-light/50 border border-gray-200 dark:border-white/5 text-xs text-text-secondary hover:bg-surface-light hover:text-text-primary transition-all flex-shrink-0"
              >
                <span>{action.icon}</span> {action.label}
              </button>
            ))}
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 dark:border-white/5 bg-surface/30 backdrop-blur-sm">
          <div className="flex items-end gap-2">
            <button className="btn-icon flex-shrink-0 mb-0.5" title="Lampirkan file">
              <Paperclip size={20} />
            </button>
            <button className="btn-icon flex-shrink-0 mb-0.5" title="Buat gambar">
              <Image size={20} />
            </button>
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                id="chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ketik pesan ke Aplikasi Pintar..."
                className="input-chat pr-12"
                rows={1}
                style={{ maxHeight: '120px' }}
              />
            </div>
            <button className="btn-icon flex-shrink-0 mb-0.5" title="Pesan suara">
              <Mic size={20} />
            </button>
            <button
              id="chat-send"
              onClick={handleSend}
              disabled={!input.trim()}
              className={`p-2.5 rounded-xl flex-shrink-0 mb-0.5 transition-all duration-200 ${
                input.trim()
                  ? 'gradient-bg text-white hover:opacity-90 active:scale-95'
                  : 'bg-surface-light text-text-muted cursor-not-allowed'
              }`}
              title="Kirim pesan"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
