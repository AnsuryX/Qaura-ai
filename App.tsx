
import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Play, 
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Loader2,
  Orbit,
  Info,
  Linkedin,
  Twitter,
  MessageCircle,
  Users,
  ShieldCheck,
  TrendingUp,
  Clock,
  LayoutTemplate,
  BrainCircuit,
  Zap,
  LineChart
} from 'lucide-react';
import Navbar from './components/Navbar';
import StrategyGenerator from './components/StrategyGenerator';
import Chatbot from './components/Chatbot';
import { Page, Language } from './types';
import { SERVICES, CASE_STUDIES, SERVICE_DETAILS } from './constants';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [lang, setLang] = useState<Language>('en');
  const [activeService, setActiveService] = useState<string>(SERVICES[0].id);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  // Form State
  const [contactForm, setContactForm] = useState({ name: '', company: '', email: '', budget: '10,000 - 50,000', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [currentPage, lang]);

  useEffect(() => {
    if (currentPage === 'portfolio') {
      const timer = setInterval(() => {
        setCarouselIndex(prev => (prev + 1) % CASE_STUDIES.length);
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [currentPage]);

  const toggleLang = () => setLang(prev => prev === 'en' ? 'ar' : 'en');

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://formspree.io/f/mzdzlldz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...contactForm, source: 'Contact Form Main', lang, agency: 'Ansury Systems' })
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        setContactForm({ name: '', company: '', email: '', budget: '10,000 - 50,000', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getIcon = (iconName: string, size = 32, active = false) => {
    const color = active ? 'text-slate-900' : 'text-cyan-400';
    switch (iconName) {
      case 'LayoutTemplate': return <LayoutTemplate className={color} size={size} />;
      case 'BrainCircuit': return <BrainCircuit className={color} size={size} />;
      case 'Zap': return <Zap className={color} size={size} />;
      case 'LineChart': return <LineChart className={color} size={size} />;
      default: return <Orbit className={color} size={size} />;
    }
  };

  const t = {
    heroTag: lang === 'en' ? "Stop Leaking Revenue" : "توقف عن خسارة الإيرادات",
    heroTitle: lang === 'en' ? "Stop Missing Leads While You Sleep. Convert Them Automatically." : "توقف عن فقدان العملاء أثناء نومك. حولهم تلقائيًا.",
    heroDesc: lang === 'en' 
      ? "Ansury installs AI growth infrastructure that captures, qualifies, and books meetings with your ideal clients 24/7. No extra staff. No manual follow-up." 
      : "أنسوري تقوم بتثبيت بنية تحتية للنمو تجذب وتؤهل وتحجز المواعيد مع عملائك المثاليين 24/7. بدون موظفين إضافيين. بدون متابعة يدوية.",
    ctaStart: lang === 'en' ? "Get My AI Growth Blueprint" : "احصل على مخطط نمو الذكاء الاصطناعي الخاص بي",
    ctaPortfolio: lang === 'en' ? "Show Me How This Pays for Itself" : "أرني كيف يغطي هذا تكلفته بنفسه",
    
    infraTitle: lang === 'en' ? "We Don't Sell Tools. We Install Outcomes." : "نحن لا نبيع أدوات. نحن نثبت نتائج.",
    infraDesc: lang === 'en' ? "Most companies hire people to manage growth. We automate growth so your people can focus on closing deals." : "معظم الشركات توظف أشخاصًا لإدارة النمو. نحن نؤتمت النمو ليتفرغ موظفوك لإبرام الصفقات.",
    
    benefitsHeading: lang === 'en' ? "Your Sales Team Talks Only to Paying Opportunities — Never Tire-Kickers." : "فريق مبيعاتك يتحدث فقط مع المشترين الجادين - لا تضيع وقتك مع الفضوليين.",
    benefitsSub: lang === 'en' ? "Our synchronized Growth Engine replaces fragmented marketing with one high-performance system." : "محرك النمو المتزامن لدينا يستبدل التسويق المجزأ بنظام واحد عالي الأداء.",
    
    proofTitle: lang === 'en' ? "Trusted by High-Status Qatari Businesses" : "موثوق من قبل الشركات القطرية المرموقة",
    
    caseStudiesTitle: lang === 'en' ? "Proof That Growth Can Be Autonomous." : "دليل على أن النمو يمكن أن يكون ذاتيًا.",
    caseStudiesDesc: lang === 'en' ? "See how we've turned manual businesses into 24/7 lead machines with zero leakage." : "تعرف على كيفية تحويلنا للأعمال اليدوية إلى آلات لجذب العملاء تعمل 24/7 بدون أي تسرب.",

    contactTitle: lang === 'en' ? "Ready to Install Your Growth Engine?" : "جاهز لتثبيت محرك النمو الخاص بك؟",
    contactDesc: lang === 'en' ? "Schedule a consultation to see how our infrastructure can buy back 20+ hours of your sales team's week." : "حدد موعدًا لاستشارة لتعرف كيف يمكن لبنيتنا التحتية استعادة أكثر من 20 ساعة من أسبوع فريق مبيعاتك.",
    
    formTitle: lang === 'en' ? "Claim Your Custom ROI Blueprint" : "احصل على مخطط عائد الاستثمار المخصص لك",
    send: lang === 'en' ? "Get My Blueprint Now" : "احصل على مخططي الآن",
    
    whatsappLabel: lang === 'en' ? "Speak to a Strategist" : "تحدث إلى استراتيجي"
  };

  const renderHome = () => (
    <>
      {/* ABOVE THE FOLD HERO */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-slate-900 border border-slate-700 px-4 py-2 rounded-full mb-8 animate-in fade-in slide-in-from-bottom duration-700">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-xs font-bold tracking-widest uppercase text-slate-300">{t.heroTag}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.05] tracking-tight max-w-6xl mx-auto">
            {t.heroTitle}
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            {t.heroDesc}
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6 rtl:space-x-reverse">
            <button 
              onClick={() => {
                setCurrentPage('contact');
                setTimeout(() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
              }}
              className="w-full md:w-auto px-10 py-5 bg-cyan-500 text-slate-900 font-black rounded-full text-lg hover:bg-cyan-400 transition-all shadow-[0_0_30px_rgba(34,211,238,0.4)] flex items-center justify-center group"
            >
              {t.ctaStart} <ArrowRight className={`ml-2 rtl:mr-2 rtl:rotate-180 group-hover:translate-x-1 transition-transform`} />
            </button>
            <button 
              onClick={() => setCurrentPage('portfolio')}
              className="w-full md:w-auto px-10 py-5 glass text-white font-bold rounded-full text-lg flex items-center justify-center hover:bg-white/10 transition-all"
            >
              {t.ctaPortfolio}
            </button>
          </div>
          
          {/* Quick Social Proof Headers */}
          <div className="mt-20 pt-10 border-t border-white/5 opacity-50 grayscale hover:grayscale-0 transition-all">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 text-slate-500">{t.proofTitle}</p>
            <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24">
               <div className="flex items-center space-x-2"><Orbit size={20}/><span className="text-lg font-bold">LUSAIL REALTY</span></div>
               <div className="flex items-center space-x-2"><Orbit size={20}/><span className="text-lg font-bold">PEARL DENTAL</span></div>
               <div className="flex items-center space-x-2"><Orbit size={20}/><span className="text-lg font-bold">WEST BAY LEGAL</span></div>
               <div className="flex items-center space-x-2"><Orbit size={20}/><span className="text-lg font-bold">DOHA HOLDINGS</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* REFRAMING SECTION: Infrastructure vs Tools */}
      <section className="py-24 bg-slate-950 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                {t.infraTitle}
              </h2>
              <p className="text-xl text-slate-400 mb-10 leading-relaxed">
                {t.infraDesc}
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="p-2 bg-cyan-500/10 rounded-lg mr-4 rtl:ml-4 rtl:mr-0 shrink-0"><ShieldCheck className="text-cyan-400" /></div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Infrastructure Producers Outcomes</h4>
                    <p className="text-slate-500 text-sm">Tools require management. Infrastructure works for you while you sleep.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="p-2 bg-cyan-500/10 rounded-lg mr-4 rtl:ml-4 rtl:mr-0 shrink-0"><TrendingUp className="text-cyan-400" /></div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Reclaim 20+ Hours a Week</h4>
                    <p className="text-slate-500 text-sm">Automate the fragmented parts of your funnel into one synchronized engine.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="p-2 bg-cyan-500/10 rounded-lg mr-4 rtl:ml-4 rtl:mr-0 shrink-0"><Clock className="text-cyan-400" /></div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">60-Second Lead Response</h4>
                    <p className="text-slate-500 text-sm">Speed is your greatest asset. We ensure every lead is captured instantly.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="glass rounded-[3rem] p-8 border-white/10 shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-10"><Orbit size={200} /></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">System Live Status</span>
                    <span className="px-3 py-1 bg-green-500/20 text-green-500 text-[10px] font-black rounded-full">ACTIVE</span>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-900/50 border border-white/5 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <Users size={18} className="text-slate-500" />
                        <span className="text-sm font-bold text-slate-300">Daily Leads Qualified</span>
                      </div>
                      <span className="text-xl font-black text-white">42</span>
                    </div>
                    <div className="p-4 bg-slate-900/50 border border-white/5 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <Clock size={18} className="text-slate-500" />
                        <span className="text-sm font-bold text-slate-300">Avg. Response Time</span>
                      </div>
                      <span className="text-xl font-black text-cyan-400">48s</span>
                    </div>
                    <div className="p-4 bg-cyan-500 text-slate-900 rounded-2xl flex items-center justify-between">
                      <span className="text-sm font-black uppercase">Revenue Growth</span>
                      <span className="text-xl font-black">+320%</span>
                    </div>
                  </div>
                  <div className="mt-8 pt-8 border-t border-white/10 text-center">
                     <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-4">Ansury Replaces Fragmented Marketing</p>
                     <button 
                      onClick={() => setCurrentPage('contact')}
                      className="w-full py-4 glass border-white/20 text-white font-black rounded-xl hover:bg-white/10 transition-all"
                     >
                        Deploy My Engine
                     </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFIT-DRIVEN SERVICES */}
      <section className="py-24 bg-slate-900/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6">{t.benefitsHeading}</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">{t.benefitsSub}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              {SERVICES.map((s) => (
                <div 
                  key={s.id}
                  onMouseEnter={() => {
                    setActiveService(s.id);
                    setHoveredFeature(null);
                  }}
                  onClick={() => setActiveService(s.id)}
                  className={`p-6 rounded-2xl cursor-pointer transition-all border ${activeService === s.id ? 'glass border-cyan-500/50 scale-[1.02] opacity-100 shadow-[0_0_20px_rgba(34,211,238,0.1)]' : 'border-transparent opacity-40 grayscale hover:opacity-60'}`}
                >
                  <div className="flex items-center space-x-6 rtl:space-x-reverse">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${activeService === s.id ? 'bg-cyan-500' : 'bg-slate-800'}`}>
                      {getIcon(s.icon, 24, activeService === s.id)}
                    </div>
                    <div>
                      <h3 className="text-xl font-black">{s.title[lang]}</h3>
                      <p className="text-sm text-slate-400 line-clamp-2">{s.description[lang]}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-7">
              <div className="glass rounded-[3rem] p-12 border-cyan-500/20 min-h-[500px] flex flex-col justify-center relative overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-4xl font-black mb-4 text-white">{SERVICES.find(s => s.id === activeService)?.title[lang]}</h2>
                  <p className="text-lg text-slate-300 mb-10 leading-relaxed max-w-xl">
                    {SERVICES.find(s => s.id === activeService)?.description[lang]}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    <div>
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Direct Outcome</h4>
                      <p className="text-lg font-semibold text-cyan-400 leading-relaxed">
                        {SERVICE_DETAILS[activeService as keyof typeof SERVICE_DETAILS].roi[lang]}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Infrastructure Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {SERVICE_DETAILS[activeService as keyof typeof SERVICE_DETAILS].tools.map((t, idx) => (
                          <span key={idx} className="px-3 py-1 bg-slate-900 rounded-lg text-xs font-bold text-slate-300 border border-white/5">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {SERVICE_DETAILS[activeService as keyof typeof SERVICE_DETAILS].features[lang].map((f, idx) => (
                      <div key={idx} className="p-4 bg-slate-900/50 rounded-xl border border-white/5 flex items-center space-x-3 rtl:space-x-reverse">
                        <CheckCircle2 size={16} className="text-cyan-500 shrink-0" />
                        <span className="text-xs font-medium text-slate-300">{f.name}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 flex justify-end">
                    <button 
                      onClick={() => setCurrentPage('contact')}
                      className="px-8 py-4 bg-cyan-500 text-slate-900 font-black rounded-xl hover:bg-cyan-400 transition-all flex items-center"
                    >
                      Deploy This Infrastructure <ArrowUpRight className="ml-2 rtl:mr-2" size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StrategyGenerator />

      {/* CASE STUDIES */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-6xl font-black mb-6">{t.caseStudiesTitle}</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-16">{t.caseStudiesDesc}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CASE_STUDIES.map((study) => (
              <div key={study.id} className="group overflow-hidden rounded-3xl glass flex flex-col h-full text-left rtl:text-right">
                <div className="relative h-72 overflow-hidden">
                  <img src={study.image} alt={study.client} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4">
                    <span className="px-4 py-1 bg-slate-900/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest rounded-full border border-white/10">{study.category[lang]}</span>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h4 className="text-xs font-bold text-cyan-400 mb-2">{study.client}</h4>
                  <h3 className="text-2xl font-black mb-4 leading-tight">{study.title[lang]}</h3>
                  <div className="space-y-3 mb-8">
                    {study.results[lang].map((res, idx) => (
                      <div key={idx} className="flex items-center text-sm text-slate-300">
                        <CheckCircle2 size={16} className="text-cyan-400 mr-2 rtl:ml-2 shrink-0" />
                        <span>{res}</span>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => setCurrentPage('portfolio')}
                    className="mt-auto text-xs font-black uppercase tracking-[0.2em] text-white flex items-center hover:text-cyan-400 transition-colors"
                  >
                    View Breakdown <ArrowRight size={14} className="ml-2 rtl:mr-2 rtl:rotate-180" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CTA SECTION */}
      <section id="contact-section" className="py-24 bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">{t.contactTitle}</h2>
              <p className="text-xl text-slate-400 mb-12">{t.contactDesc}</p>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center mr-6 rtl:mr-0 rtl:ml-6 shrink-0 border-cyan-500/30"><Mail className="text-cyan-400" /></div>
                  <div><h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-1">Direct Link</h3><p className="text-xl font-bold">hello@ansurysystem.online</p></div>
                </div>
                <div className="flex items-start">
                  <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center mr-6 rtl:mr-0 rtl:ml-6 shrink-0 border-cyan-500/30"><Phone className="text-cyan-400" /></div>
                  <div><h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-1">Command Center</h3><p className="text-xl font-bold">+974 51182644</p></div>
                </div>
                <div className="flex items-start">
                  <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center mr-6 rtl:mr-0 rtl:ml-6 shrink-0 border-cyan-500/30"><MapPin className="text-cyan-400" /></div>
                  <div><h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-1">HQ</h3><p className="text-xl font-bold leading-tight">Level 24, Tornado Tower, Doha, Qatar</p></div>
                </div>
              </div>
            </div>

            <div className="glass p-8 md:p-12 rounded-[2.5rem] border-white/10 relative">
              <h3 className="text-2xl font-black mb-8">{t.formTitle}</h3>
              {submitStatus === 'success' ? (
                <div className="text-center py-20 animate-in zoom-in duration-300">
                  <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 size={40} /></div>
                  <h4 className="text-3xl font-black mb-4">Blueprint Generated</h4>
                  <p className="text-slate-400">A strategist will reach out within 4 hours.</p>
                  <button onClick={() => setSubmitStatus('idle')} className="mt-8 text-cyan-400 font-bold hover:underline">Reset</button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Name</label>
                      <input required type="text" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-4 text-white focus:border-cyan-500 outline-none" value={contactForm.name} onChange={(e) => setContactForm({...contactForm, name: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Company</label>
                      <input required type="text" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-4 text-white focus:border-cyan-500 outline-none" value={contactForm.company} onChange={(e) => setContactForm({...contactForm, company: e.target.value})} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Business Email</label>
                    <input required type="email" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-4 text-white focus:border-cyan-500 outline-none" value={contactForm.email} onChange={(e) => setContactForm({...contactForm, email: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Your Biggest Growth Bottleneck</label>
                    <textarea required rows={4} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-4 text-white focus:border-cyan-500 outline-none resize-none" value={contactForm.message} onChange={(e) => setContactForm({...contactForm, message: e.target.value})}></textarea>
                  </div>
                  <button disabled={isSubmitting} className="w-full py-5 bg-cyan-500 text-slate-900 font-black rounded-xl hover:bg-cyan-400 flex items-center justify-center space-x-2">
                    {isSubmitting ? <Loader2 className="animate-spin" /> : t.send}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );

  const renderPortfolio = () => {
    const activeStudy = CASE_STUDIES[carouselIndex];
    return (
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-6 mb-12">
          <h1 className="text-5xl md:text-7xl font-black mb-6">{t.caseStudiesTitle}</h1>
          <p className="text-xl text-slate-400 max-w-2xl">{t.caseStudiesDesc}</p>
        </div>

        <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden bg-slate-950 mb-32">
          <div className="absolute inset-0 transition-all duration-1000">
            <img key={activeStudy.id} src={activeStudy.image} className="w-full h-full object-cover opacity-40" alt={activeStudy.client} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent rtl:bg-gradient-to-l"></div>
          
          <div className="container mx-auto h-full px-6 relative z-10 flex items-center">
            <div className="max-w-3xl">
              <div className="flex items-center space-x-4 rtl:space-x-reverse mb-8">
                <span className="w-12 h-1 bg-cyan-500"></span>
                <span className="text-cyan-400 font-black uppercase tracking-[0.4em] text-xs">Case Exhibit 0{carouselIndex + 1}</span>
              </div>
              <h2 className="text-4xl md:text-7xl font-black text-white mb-6 leading-tight">{activeStudy.title[lang]}</h2>
              <p className="text-xl text-slate-300 mb-10 leading-relaxed">{activeStudy.description[lang]}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {activeStudy.results[lang].map((r, i) => (
                  <div key={i} className="glass p-6 rounded-2xl border-cyan-500/20">
                    <p className="text-2xl font-black text-cyan-400 mb-1">{r.split(' ')[0]}</p>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider leading-tight">{r.split(' ').slice(1).join(' ')}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center space-x-6 rtl:space-x-reverse">
                <button 
                  onClick={() => {
                    setCurrentPage('contact');
                    setTimeout(() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
                  }}
                  className="px-10 py-5 bg-cyan-500 text-slate-900 font-black rounded-full hover:bg-cyan-400 transition-all"
                >
                  Apply These Results to My Business
                </button>
                <div className="flex space-x-2 rtl:space-x-reverse">
                  <button onClick={() => setCarouselIndex((carouselIndex - 1 + CASE_STUDIES.length) % CASE_STUDIES.length)} className="p-4 rounded-full border border-white/10 hover:bg-white/5 text-white"><ChevronLeft size={24} className="rtl:rotate-180"/></button>
                  <button onClick={() => setCarouselIndex((carouselIndex + 1) % CASE_STUDIES.length)} className="p-4 rounded-full border border-white/10 hover:bg-white/5 text-white"><ChevronRight size={24} className="rtl:rotate-180"/></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${lang === 'ar' ? 'font-arabic' : ''}`}>
      <Navbar currentPage={currentPage} setPage={setCurrentPage} lang={lang} toggleLang={toggleLang} />
      <main>{currentPage === 'portfolio' ? renderPortfolio() : renderHome()}</main>
      
      {/* WhatsApp Floating Button */}
      <a 
        href={`https://wa.me/97451182644?text=${encodeURIComponent(lang === 'en' ? 'Hello Ansury Systems, I would like to learn more about your autonomous growth infrastructure.' : 'مرحباً أنسوري للأنظمة، أود معرفة المزيد عن بنيتك التحتية للنمو الذاتي.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 left-8 z-[100] group flex items-center"
      >
        <div className="mr-3 rtl:mr-0 rtl:ml-3 px-4 py-2 bg-slate-900/80 backdrop-blur-md border border-white/10 text-white text-xs font-bold rounded-full opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
          {t.whatsappLabel}
        </div>
        <div className="w-16 h-16 rounded-full bg-[#25D366] shadow-[0_0_25px_rgba(37,211,102,0.4)] flex items-center justify-center text-white transition-all transform hover:scale-110 active:scale-95">
          <MessageCircle size={28} fill="currentColor" />
        </div>
      </a>

      <Chatbot onHandover={() => { setCurrentPage('contact'); setTimeout(() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} />
      
      <footer className="py-20 border-t border-white/5 bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 text-left rtl:text-right">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 rtl:space-x-reverse mb-6">
                <div className="p-2 bg-cyan-500 rounded-lg shadow-[0_0_15px_rgba(34,211,238,0.4)]"><Orbit className="text-slate-900" size={24} /></div>
                <div className="flex flex-col -space-y-1">
                  <span className="text-2xl font-black tracking-tighter text-white uppercase">ANSURY</span>
                  <span className="text-[10px] font-bold tracking-[0.3em] text-cyan-400 uppercase">SYSTEMS</span>
                </div>
              </div>
              <p className="text-slate-500 max-w-sm mb-8 leading-relaxed">
                {lang === 'en' ? 'Scaling Qatari businesses with autonomous landing pages and lead qualification engines.' : 'توسيع نطاق الأعمال القطرية من خلال صفحات هبوط ذاتية ومحركات تأهيل العملاء.'}
              </p>
              <div className="flex space-x-4 rtl:space-x-reverse">
                <a href="https://linkedin.com/company/ansury-systems" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-900 rounded-xl text-slate-500 hover:text-cyan-400 border border-white/5 transition-all">
                  <Linkedin size={20} />
                </a>
                <a href="https://twitter.com/ansurysystems" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-900 rounded-xl text-slate-500 hover:text-cyan-400 border border-white/5 transition-all">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Direct Access</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li onClick={() => setCurrentPage('home')} className="hover:text-cyan-400 cursor-pointer transition-colors">Home</li>
                <li onClick={() => setCurrentPage('portfolio')} className="hover:text-cyan-400 cursor-pointer transition-colors">Success Stories</li>
                <li onClick={() => setCurrentPage('contact')} className="hover:text-cyan-400 cursor-pointer transition-colors">Get My Blueprint</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Contact Headquarters</h4>
              <p className="text-slate-400 text-sm mb-2">+974 51182644</p>
              <p className="text-slate-400 text-sm">hello@ansurysystem.online</p>
            </div>
          </div>
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600 font-bold uppercase tracking-widest">
            <p>© 2024 Ansury Systems LLC. Registered in Qatar.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
