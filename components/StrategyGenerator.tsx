
import React, { useState } from 'react';
import { generateMarketingStrategy } from '../services/geminiService';
import { Loader2, Sparkles, Send, CheckCircle } from 'lucide-react';

const StrategyGenerator: React.FC = () => {
  const [industry, setIndustry] = useState('');
  const [audience, setAudience] = useState('');
  const [goals, setGoals] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!industry || !audience || !goals) return;

    setLoading(true);
    const strategy = await generateMarketingStrategy(industry, audience, goals);
    setResult(strategy);
    setLoading(false);

    // Send lead to Formspree
    try {
      await fetch('https://formspree.io/f/mzdzlldz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'Strategy Lead',
          industry,
          audience,
          goals,
          generatedStrategy: strategy.substring(0, 500) + '...'
        })
      });
    } catch (err) {
      console.error('Lead storage failed', err);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto glass rounded-3xl p-8 md:p-12 border border-cyan-500/20 relative">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <PaperIcon />
          </div>

          <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-4">Get an Instant <span className="text-cyan-400">AI Strategy</span></h2>
            <p className="text-slate-400 max-w-lg mx-auto">Input your business details and let our proprietary models generate a high-level roadmap for your growth in the Qatar market.</p>
          </div>

          <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Industry</label>
              <input 
                required
                type="text" 
                placeholder="e.g. Real Estate, Retail, Fintech"
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-white"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Target Audience</label>
              <input 
                required
                type="text" 
                placeholder="e.g. Expats in Doha, Gen Z, Business Owners"
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-white"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Primary Goal</label>
              <textarea 
                required
                placeholder="What are you trying to achieve? (e.g. More sales, Brand awareness)"
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-white min-h-[100px]"
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <button 
                disabled={loading}
                className="w-full py-4 bg-cyan-500 text-slate-900 font-black rounded-xl flex items-center justify-center space-x-2 hover:bg-cyan-400 transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(34,211,238,0.2)]"
              >
                {loading ? <Loader2 className="animate-spin" /> : <><Send size={18} /> <span>Generate My Strategy</span></>}
              </button>
            </div>
          </form>

          {result && (
            <div className="mt-8 p-6 bg-slate-900/80 rounded-2xl border border-cyan-500/30 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-xl font-bold mb-4 text-cyan-400 flex items-center gap-2">
                <Sparkles size={20} /> Your Custom AI Strategy
              </h3>
              <div className="prose prose-invert prose-cyan max-w-none text-slate-300 leading-relaxed whitespace-pre-wrap text-sm md:text-base">
                {result}
              </div>
              <div className="mt-6 pt-6 border-t border-slate-800 text-center">
                <p className="text-sm text-slate-500 mb-4">Ready to implement this with experts?</p>
                <button 
                  onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-3 bg-white text-slate-900 font-bold rounded-full hover:bg-cyan-400 transition-all transform hover:scale-105"
                >
                  Book a Deep Dive Session
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const PaperIcon = () => (
  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
);

export default StrategyGenerator;
