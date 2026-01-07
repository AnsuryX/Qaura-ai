
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2, Headset, CheckCircle, Trash2 } from 'lucide-react';
import { chatWithAura } from '../services/geminiService';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const STORAGE_KEY = 'ansury_chat_history';

const Chatbot: React.FC<{ onHandover: () => void }> = ({ onHandover }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showHandoverForm, setShowHandoverForm] = useState(false);
  const [handoverEmail, setHandoverEmail] = useState('');
  const [handoverStatus, setHandoverStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        } else {
          setMessages([{ role: 'model', text: 'Protocol initiated. I am Ansur. What is the single biggest bottleneck currently stopping your business from scaling in Qatar?' }]);
        }
      } catch (e) {
        setMessages([{ role: 'model', text: 'Protocol initiated. I am Ansur. What is the single biggest bottleneck currently stopping your business from scaling in Qatar?' }]);
      }
    } else {
      setMessages([{ role: 'model', text: 'Protocol initiated. I am Ansur. What is the single biggest bottleneck currently stopping your business from scaling in Qatar?' }]);
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, showHandoverForm]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    const newMessages: Message[] = [...messages, { role: 'user', text: userMsg }];
    setMessages(newMessages);
    setIsLoading(true);

    const history = newMessages.map(m => ({ role: m.role, parts: [{ text: m.text }] }));
    const response = await chatWithAura(history, userMsg);
    
    setMessages(prev => [...prev, { role: 'model', text: response || '' }]);
    setIsLoading(false);
  };

  const handleHandoverRequest = () => {
    setShowHandoverForm(true);
  };

  const clearHistory = () => {
    if (window.confirm('Are you sure you want to purge current neural history?')) {
      const initialMsg: Message[] = [{ role: 'model', text: 'Neural buffer purged. Protocol re-initialized. What is the core challenge you are facing today?' }];
      setMessages(initialMsg);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialMsg));
    }
  };

  const submitHandoverLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!handoverEmail) return;

    setHandoverStatus('sending');
    const transcript = messages.map(m => `${m.role.toUpperCase()}: ${m.text}`).join('\n');

    try {
      await fetch('https://formspree.io/f/mzdzlldz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'Chat Handover Lead',
          email: handoverEmail,
          transcript: transcript,
          agency: 'Ansury Systems'
        })
      });
      setHandoverStatus('success');
      setTimeout(() => {
        setShowHandoverForm(false);
        setHandoverStatus('idle');
        onHandover();
      }, 2000);
    } catch (err) {
      console.error('Handover lead storage failed', err);
      setHandoverStatus('idle');
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {/* Chat Bubble */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full bg-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.5)] flex items-center justify-center text-slate-900 transition-all transform hover:scale-110 active:scale-95 ${isOpen ? 'rotate-90' : 'animate-bounce'}`}
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[550px] glass rounded-[2.5rem] border border-white/10 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-300 shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-cyan-500/10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-slate-900 shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                <Bot size={20} />
              </div>
              <div>
                <h4 className="font-black text-sm text-white tracking-tight">ANSUR INTERFACE</h4>
                <div className="flex items-center space-x-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Neural Linked</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <button 
                onClick={clearHistory}
                className="p-2 hover:bg-red-500/10 rounded-xl text-slate-500 hover:text-red-400 transition-all"
                title="Purge History"
              >
                <Trash2 size={16} />
              </button>
              <button 
                onClick={handleHandoverRequest} 
                className="p-2 hover:bg-white/10 rounded-xl text-cyan-400 transition-all group"
                title="Request Strategic Handover"
              >
                <Headset size={20} className="group-hover:scale-110" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto space-y-4 scroll-smooth bg-slate-950/20">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user' 
                  ? 'bg-cyan-500 text-slate-900 font-bold rounded-tr-none shadow-[0_4px_15_rgba(34,211,238,0.2)]' 
                  : 'bg-slate-900/80 border border-white/5 text-slate-200 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-900/80 p-4 rounded-2xl rounded-tl-none border border-white/5">
                  <Loader2 className="animate-spin text-cyan-400" size={18} />
                </div>
              </div>
            )}

            {showHandoverForm && (
              <div className="bg-slate-900/90 border border-cyan-500/30 p-6 rounded-2xl animate-in zoom-in-95 duration-200">
                <div className="flex justify-between items-start mb-4">
                  <h5 className="text-cyan-400 font-black text-xs uppercase tracking-widest">Handover Protocol</h5>
                  <button onClick={() => setShowHandoverForm(false)} className="text-slate-500 hover:text-white"><X size={14}/></button>
                </div>
                {handoverStatus === 'success' ? (
                  <div className="text-center py-4 flex flex-col items-center">
                    <CheckCircle className="text-green-500 mb-2" size={32} />
                    <p className="text-sm font-bold">Transmission Sent.</p>
                  </div>
                ) : (
                  <form onSubmit={submitHandoverLead} className="space-y-4">
                    <p className="text-xs text-slate-400">Our senior strategists will review this transcript and contact you shortly.</p>
                    <input 
                      required
                      type="email"
                      value={handoverEmail}
                      onChange={(e) => setHandoverEmail(e.target.value)}
                      placeholder="Your Business Email"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs focus:border-cyan-500 outline-none transition-all"
                    />
                    <button 
                      disabled={handoverStatus === 'sending'}
                      className="w-full py-3 bg-cyan-500 text-slate-900 font-black text-xs rounded-xl hover:bg-cyan-400 flex items-center justify-center space-x-2"
                    >
                      {handoverStatus === 'sending' ? <Loader2 className="animate-spin" size={14}/> : 'Request Specialist'}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10 bg-slate-950/80 backdrop-blur-md">
            <div className="relative">
              <input 
                type="text"
                disabled={showHandoverForm}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Synchronize with Ansur..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-4 pr-12 py-3 text-sm focus:border-cyan-500 outline-none transition-all disabled:opacity-50"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim() || showHandoverForm}
                className="absolute right-2 top-1.5 p-2 text-cyan-500 hover:text-cyan-400 disabled:opacity-30 transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
