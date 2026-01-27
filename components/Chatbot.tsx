import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2, Headset, CheckCircle, Trash2, Cpu, Info, Zap, Target, TrendingUp } from 'lucide-react';
import { chatWithAura } from '../services/geminiService';
import { SERVICE_DETAILS } from '../constants';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const STORAGE_KEY = 'ansury_chat_history';

// Flatten feature map for lookup
const featureLookup: Record<string, string> = {};
Object.values(SERVICE_DETAILS).forEach(sd => {
  sd.features.en.forEach(f => { featureLookup[f.name] = f.explanation; });
  sd.features.ar.forEach(f => { featureLookup[f.name] = f.explanation; });
});

const Tooltip: React.FC<{ text: string; children: React.ReactNode }> = ({ text, children }) => {
  const [show, setShow] = useState(false);

  return (
    <span 
      className="relative inline-block" 
      onMouseEnter={() => setShow(true)} 
      onMouseLeave={() => setShow(false)}
    >
      <span className="cursor-help border-b-2 border-dotted border-cyan-400/50 text-cyan-400 font-bold hover:text-cyan-300 transition-colors bg-cyan-400/5 px-1 rounded-sm">
        {children}
      </span>
      {show && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-4 bg-slate-900 border border-cyan-500/40 text-[11px] text-slate-200 rounded-2xl shadow-2xl z-[110] animate-in fade-in zoom-in-95 duration-200 backdrop-blur-xl">
          <span className="block font-black text-cyan-400 uppercase tracking-widest mb-2 flex items-center gap-1.5 border-b border-white/10 pb-1">
            <Info size={12} /> Technical Detail
          </span>
          <span className="leading-relaxed block italic text-slate-300">
            {text}
          </span>
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900"></span>
        </span>
      )}
    </span>
  );
};

const FormattedMessage: React.FC<{ text: string }> = ({ text }) => {
  const paragraphs = text.split(/\n\n+/g);

  return (
    <div className="space-y-4">
      {paragraphs.map((para, pIdx) => {
        const tooltipParts = para.split(/(\[\[.*?\]\])/g);

        return (
          <div key={pIdx} className="leading-relaxed">
            {tooltipParts.map((part, tIdx) => {
              if (part.startsWith('[[') && part.endsWith(']]')) {
                const featureName = part.slice(2, -2);
                const explanation = featureLookup[featureName];
                if (explanation) {
                  return <Tooltip key={tIdx} text={explanation}>{featureName}</Tooltip>;
                }
                return <span key={tIdx} className="font-bold text-cyan-400">{featureName}</span>;
              }

              const boldParts = part.split(/(\*\*.*?\*\*)/g);
              return (
                <span key={tIdx}>
                  {boldParts.map((bp, bIdx) => {
                    if (bp.startsWith('**') && bp.endsWith('**')) {
                      const content = bp.slice(2, -2);
                      if (content.length < 40) {
                        return (
                          <span key={bIdx} className="block first:mt-0 mt-4 mb-2">
                            <strong className="text-white font-black uppercase tracking-wider text-[11px] bg-slate-800 px-2 py-1 rounded border border-white/5 inline-block">
                              {content}
                            </strong>
                          </span>
                        );
                      }
                      return <strong key={bIdx} className="text-white font-bold">{content}</strong>;
                    }
                    return <span key={bIdx} className="whitespace-pre-wrap">{bp}</span>;
                  })}
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

const Chatbot: React.FC<{ onHandover: () => void }> = ({ onHandover }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showHandoverForm, setShowHandoverForm] = useState(false);
  const [handoverEmail, setHandoverEmail] = useState('');
  const [handoverStatus, setHandoverStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const scrollRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    { label: 'Check 50% Grant Eligibility', icon: <Zap size={14} />, text: 'Do I qualify for the 50% Regional Scaling Grant? Here is my business model...' },
    { label: 'Calculate ROI vs Headcount', icon: <Target size={14} />, text: 'How much can I save by replacing my manual sales team with AI infrastructure?' },
    { label: 'GCC Market Expansion', icon: <TrendingUp size={14} />, text: 'We want to expand from Riyadh to Dubai. How can your growth sync help?' },
  ];

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        } else {
          setInitialMessage();
        }
      } catch (e) {
        setInitialMessage();
      }
    } else {
      setInitialMessage();
    }
  }, []);

  const setInitialMessage = () => {
    setMessages([{ 
      role: 'model', 
      text: '**Protocol Initialized.**\n\nI am **Ansur**, Chief Strategist. I am here to help you replace manual friction with autonomous infrastructure.\n\nOnly 3 slots remain for our **50% Regional Scaling Grant**. Tell me about your current bottleneck to check eligibility.' 
    }]);
  };

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, showHandoverForm, isLoading]);

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || isLoading) return;

    if (!customText) setInput('');
    const newMessages: Message[] = [...messages, { role: 'user', text: textToSend }];
    setMessages(newMessages);
    setIsLoading(true);

    const history = newMessages.map(m => ({ role: m.role, parts: [{ text: m.text }] }));
    const response = await chatWithAura(history, textToSend);
    
    setMessages(prev => [...prev, { role: 'model', text: response || '' }]);
    setIsLoading(false);
  };

  const clearHistory = () => {
    if (window.confirm('Purge neural history?')) {
      setInitialMessage();
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const submitHandover = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!handoverEmail || handoverStatus === 'sending') return;

    setHandoverStatus('sending');
    try {
      await fetch('https://formspree.io/f/mzdzlldz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'Direct Chat Handover',
          email: handoverEmail,
          transcript: messages.map(m => `${m.role}: ${m.text}`).join('\n')
        })
      });
      setHandoverStatus('success');
      setTimeout(() => {
        setHandoverStatus('idle');
        setShowHandoverForm(false);
        onHandover();
      }, 2000);
    } catch (err) {
      setHandoverStatus('idle');
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full bg-cyan-500 shadow-[0_0_30px_rgba(34,211,238,0.6)] flex items-center justify-center text-slate-900 transition-all transform hover:scale-110 active:scale-95 ${isOpen ? 'rotate-90' : 'animate-bounce'}`}
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </button>

      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[360px] md:w-[450px] h-[650px] glass rounded-[3rem] border border-white/10 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-300 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-cyan-500/5 backdrop-blur-md">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500 flex items-center justify-center text-slate-900 shadow-[0_0_20px_rgba(34,211,238,0.4)] relative">
                <Cpu size={24} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></span>
              </div>
              <div>
                <h4 className="font-black text-xs text-white tracking-[0.2em] uppercase">ANSUR v2.5</h4>
                <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest opacity-80">Strategic Link Active</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={clearHistory}
                className="p-2.5 hover:bg-white/5 rounded-xl text-slate-500 hover:text-red-400 transition-all"
              >
                <Trash2 size={18} />
              </button>
              <button 
                onClick={() => setShowHandoverForm(true)} 
                className="p-2.5 hover:bg-white/5 rounded-xl text-cyan-400 transition-all group"
              >
                <Headset size={22} className="group-hover:scale-110" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto space-y-6 scroll-smooth bg-slate-950/40 custom-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] p-5 rounded-3xl text-[13px] md:text-[14px] shadow-xl ${
                  m.role === 'user' 
                  ? 'bg-cyan-500 text-slate-900 font-bold rounded-tr-none' 
                  : 'bg-slate-900/90 border border-white/10 text-slate-200 rounded-tl-none'
                }`}>
                  <FormattedMessage text={m.text} />
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-900/90 border border-white/10 p-5 rounded-3xl rounded-tl-none flex items-center space-x-3">
                  <div className="flex space-x-1">
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce"></span>
                  </div>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Optimizing...</span>
                </div>
              </div>
            )}

            {!isLoading && messages.length < 5 && (
              <div className="space-y-2 pt-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-3">Quick Qualification Protocol</p>
                {quickPrompts.map((qp, i) => (
                  <button 
                    key={i}
                    onClick={() => handleSend(qp.text)}
                    className="w-full flex items-center gap-3 p-3 bg-slate-900/40 border border-white/5 hover:border-cyan-500/30 hover:bg-cyan-500/5 rounded-xl text-left text-[11px] text-slate-400 hover:text-cyan-400 transition-all group"
                  >
                    <span className="text-cyan-500 group-hover:scale-110 transition-transform">{qp.icon}</span>
                    {qp.label}
                  </button>
                ))}
              </div>
            )}

            {showHandoverForm && (
              <div className="bg-slate-900 border border-cyan-500/40 p-6 rounded-[2rem] animate-in zoom-in-95 duration-200 shadow-2xl">
                <div className="flex justify-between items-center mb-4">
                  <h5 className="text-cyan-400 font-black text-[10px] uppercase tracking-[0.3em]">Direct Strategist Link</h5>
                  <button onClick={() => setShowHandoverForm(false)} className="text-slate-500 hover:text-white"><X size={16}/></button>
                </div>
                {handoverStatus === 'success' ? (
                  <div className="text-center py-6">
                    <CheckCircle className="text-green-500 mx-auto mb-3" size={40} />
                    <p className="text-sm font-bold text-white">Transmission Received.</p>
                  </div>
                ) : (
                  <form onSubmit={submitHandover} className="space-y-4">
                    <p className="text-[11px] text-slate-400 leading-relaxed italic">The Chief Strategist will review this neural transcript and contact your executive office directly.</p>
                    <input 
                      required
                      type="email"
                      value={handoverEmail}
                      onChange={(e) => setHandoverEmail(e.target.value)}
                      placeholder="Executive Email"
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-xs focus:border-cyan-500 outline-none transition-all placeholder:text-slate-700"
                    />
                    <button 
                      type="submit"
                      disabled={handoverStatus === 'sending'}
                      className="w-full py-4 bg-cyan-500 text-slate-900 font-black text-xs rounded-2xl hover:bg-cyan-400 transition-all flex items-center justify-center gap-2"
                    >
                      {handoverStatus === 'sending' ? <Loader2 className="animate-spin" size={16}/> : 'Establish Connection'}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-white/10 bg-slate-950/80 backdrop-blur-xl">
            <div className="relative group">
              <input 
                type="text"
                disabled={isLoading || showHandoverForm}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Check 50% Grant eligibility..."
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-5 pr-14 py-4 text-[13px] text-white focus:border-cyan-500 focus:bg-slate-800 outline-none transition-all disabled:opacity-50"
              />
              <button 
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim() || showHandoverForm}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center text-slate-900 hover:bg-cyan-400 disabled:opacity-20 transition-all transform active:scale-90"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-[9px] text-slate-600 font-bold uppercase tracking-widest text-center mt-4">
              Neural Network Secured • Ansury Systems
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;