
import React, { useState } from 'react';
import { generateMarketingStrategy } from '../services/geminiService';
import { Loader2, Sparkles, Send, Workflow } from 'lucide-react';

const StrategyGenerator: React.FC = () => {
  const [industry, setIndustry] = useState('');
  const [audience, setAudience] = useState('');
  const [goals, setGoals] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!industry || !audience || !goals) return;

    setLoading(true);
    const strategy = await generateMarketingStrategy(industry, audience, goals);
    setResult(strategy);
    setLoading(false);

    try {
      await fetch('https://formspree.io/f/mzdzlldz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'Automation Blueprint Lead',
          industry,
          audience,
          goals,
          blueprint: strategy.substring(0, 500)
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
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Workflow size={120} className="text-cyan-400" />
          </div>

          <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-4">Generate Your <span className="text-cyan-400">Automation Blueprint</span></h2>
            <p className="text-slate-400 max-w-lg mx-auto">See how an autonomous funnel would look for your business. No manual follow-ups, just qualified results.</p>
          </div>

          <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Your Sector</label>
              <input 
                required
                type="text" 
                placeholder="e.g. Real Estate, Medical, Legal"
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-white"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Current Lead Source</label>
              <input 
                required
                type="text" 
                placeholder="e.g. Instagram, Word of Mouth, SEO"
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 transition-colors text-white"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Main Conversion Goal</label>
              <textarea 
                required
                placeholder="What action do you want them to take? (e.g. Book a viewing, Schedule a consultation)"
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
                {loading ? <Loader2 className="animate-spin" /> : <><Sparkles size={18} /> <span>Initialize Blueprint Generation</span></>}
              </button>
            </div>
          </form>

          {result && (
            <div className="mt-8 p-6 bg-slate-900/80 rounded-2xl border border-cyan-500/30 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-xl font-bold mb-4 text-cyan-400 flex items-center gap-2">
                <Workflow size={20} /> Your Autonomous Funnel Blueprint
              </h3>
              <div className="prose prose-invert prose-cyan max-w-none text-slate-300 leading-relaxed whitespace-pre-wrap text-sm md:text-base italic">
                {result}
              </div>
              <div className="mt-6 pt-6 border-t border-slate-800 text-center">
                <button 
                  onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-3 bg-white text-slate-900 font-bold rounded-full hover:bg-cyan-400 transition-all transform hover:scale-105"
                >
                  Apply This Blueprint
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default StrategyGenerator;
