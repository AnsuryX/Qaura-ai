
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
  LineChart,
  Globe,
  Quote
} from 'lucide-react';
import Navbar from './components/Navbar';
import StrategyGenerator from './components/StrategyGenerator';
import Chatbot from './components/Chatbot';
import { Page, Language } from './types';
import { SERVICES, CASE_STUDIES, SERVICE_DETAILS, TESTIMONIALS } from './constants';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [lang, setLang] = useState<Language>('en');
  const [activeService, setActiveService] = useState<string>(SERVICES[0].id);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

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
      }, 7000);
      return () => clearInterval(timer);
    }
  }, [currentPage]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex(prev => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const toggleLang = () => setLang(prev => prev === 'en' ? 'ar' : 'en');

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://formspree.io/f/mzdzlldz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...contactForm, source: 'Contact Form Regional', lang, agency: 'Ansury Systems' })
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
    heroTag: lang === 'en' ? "The GCC's Autonomous Growth Leader" : "قائد النمو الذاتي في دول الخليج",
    heroTitle: lang === 'en' ? "Stop Missing High-Value Leads. Convert Them While You Sleep." : "توقف عن فقدان العملاء الكبار. حولهم أثناء نومك.",
    heroDesc: lang === 'en' 
      ? "From Riyadh to Dubai, Ansury installs the AI infrastructure that captures, qualifies, and books meetings with the Middle East's elite 24/7. No extra staff. No manual friction." 
      : "من الرياض إلى دبي، أنسوري تقوم بتثبيت بنية تحتية للنمو تجذب وتؤهل وتحجز المواعيد مع النخبة في الشرق الأوسط 24/7. بدون موظفين إضافيين. بدون عوائق يدوية.",
    ctaStart: lang === 'en' ? "Get My Regional Growth Blueprint" : "احصل على مخطط النمو الإقليمي الخاص بي",
    ctaPortfolio: lang === 'en' ? "Show Me the ROI Proof" : "أرني دليل عائد الاستثمار",
    
    infraTitle: lang === 'en' ? "We Don't Install Tools. We Install Outcomes." : "نحن لا نثبت أدوات. نحن نثبت نتائج.",
    infraDesc: lang === 'en' ? "Most Middle Eastern companies hire more people to manage growth. We automate the engine so your people can focus on closing high-ticket deals." : "معظم الشركات في الشرق الأوسط توظف المزيد من الأشخاص لإدارة النمو. نحن نؤتمت المحرك ليتفرغ موظفوك لإغلاق الصفقات الكبرى.",
    
    benefitsHeading: lang === 'en' ? "Your Sales Team Talks Only to Qualified Buyers — Never Tire-Kickers." : "فريق مبيعاتك يتحدث فقط مع المشترين الجادين - لا تضيع وقتك مع الفضوليين.",
    benefitsSub: lang === 'en' ? "Our synchronized Growth Engine replaces fragmented marketing with one high-performance system for the Khaleej." : "محرك النمو المتزامن لدينا يستبدل التسويق المجزأ بنظام واحد عالي الأداء لمنطقة الخليج.",
    
    proofTitle: lang === 'en' ? "Dominating Markets in Riyadh • Dubai • Doha • Kuwait" : "الهيمنة على أسواق الرياض • دبي • الدوحة • الكويت",
    
    caseStudiesTitle: lang === 'en' ? "Regional Results That Speak for Themselves." : "نتائج إقليمية تتحدث عن نفسها.",
    caseStudiesDesc: lang === 'en' ? "See how we've turned manual GCC businesses into 24/7 autonomous lead machines." : "تعرف على كيفية تحويلنا للأعمال اليدوية في الخليج إلى آلات عملاء ذاتية تعمل 24/7.",

    testimonialTitle: lang === 'en' ? "Voices of Growth Across the Khaleej" : "أصوات النمو في جميع أنحاء الخليج",
    testimonialDesc: lang === 'en' ? "Hear from the CEOs and founders who have deployed our autonomous growth infrastructure." : "استمع إلى الرؤساء التنفيذيين والمؤسسين الذين نشروا بنيتنا التحتية للنمو الذاتي.",

    contactTitle: lang === 'en' ? "Ready to Scale Across the Khaleej?" : "جاهز للتوسع عبر الخليج؟",
    contactDesc: lang === 'en' ? "Schedule a consultation to see how our infrastructure can buy back 25+ hours of your sales leadership's week." : "حدد موعدًا لاستشارة لتعرف كيف يمكن لبنيتنا التحتية استعادة أكثر من 25 ساعة من أسبوع قيادة المبيعات.",
    
    formTitle: lang === 'en' ? "Claim Your Custom Regional ROI Blueprint" : "احصل على مخطط عائد الاستثمار الإقليمي المخصص لك",
    send: lang === 'en' ? "Initiate My Blueprint" : "ابدأ مخططي الآن",
    
    whatsappLabel: lang === 'en' ? "Connect with a Regional Strategist" : "تواصل مع استراتيجي إقليمي",
    footerHome: lang === 'en' ? 'Home' : 'الرئيسية',
    footerSuccess: lang === 'en' ? 'Success Stories' : 'قصص النجاح',
    footerBlueprint: lang === 'en' ? 'Get My Blueprint' : 'احصل على مخططي',
    footerCareers: lang === 'en' ? 'Careers' : 'الوظائف'
  };

  const renderHome = () => (
    <>
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-slate-900 border border-slate-700 px-4 py-2 rounded-full mb-8 animate-in fade-in slide-in-from-bottom duration-700">
            <Globe size={14} className="text-cyan-400" />
            <span className="text-xs font-bold tracking-widest uppercase text-slate-300">{t.heroTag}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.05] tracking-tight max-w-6xl mx-auto">
            {t.heroTitle}
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 max-w-4xl mx-auto mb-12 leading-relaxed">
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
          
          {/* Regional Proof Headers */}
          <div className="mt-20 pt-10 border-t border-white/5 opacity-50 grayscale hover:grayscale-0 transition-all">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 text-slate-500">{t.proofTitle}</p>
            <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24">
               <div className="flex items-center space-x-2"><Orbit size={20}/><span className="text-lg font-bold">AL-MAJD RIYADH</span></div>
               <div className="flex items-center space-x-2"><Orbit size={20}/><span className="text-lg font-bold">APEX DUBAI</span></div>
               <div className="flex items-center space-x-2"><Orbit size={20}/><span className="text-lg font-bold">ROYAL HEALTH KUWAIT</span></div>
               <div className="flex items-center space-x-2"><Orbit size={20}/><span className="text-lg font-bold">LUSAIL DOHA</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* REFRAMING SECTION */}
      <section className="py-24 bg-slate-950 border-y border-white/5 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                {t.infraTitle}
              </h2>
              <p className="text-xl text-slate-400 mb-10 leading-relaxed">
                {t.infraDesc}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 glass rounded-2xl border-white/5">
                  <ShieldCheck size={28} className="text-cyan-400 mb-4" />
                  <h4 className="text-lg font-bold text-white mb-2">Infrastructure &gt; Tools</h4>
                  <p className="text-slate-500 text-sm">Tools need managers. Infrastructure builds your empire autonomously.</p>
                </div>
                <div className="p-6 glass rounded-2xl border-white/5">
                  <TrendingUp size={28} className="text-cyan-400 mb-4" />
                  <h4 className="text-lg font-bold text-white mb-2">Regional Scaling</h4>
                  <p className="text-slate-500 text-sm">Synchronize funnels across Saudi, UAE, Qatar, and Kuwait in one engine.</p>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-[3rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative glass rounded-[3rem] p-10 border-white/10 shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between mb-10">
                  <span className="text-xs font-black uppercase tracking-widest text-cyan-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span> Regional System Online
                  </span>
                  <div className="flex gap-2">
                     <span className="px-3 py-1 bg-slate-900 rounded-lg text-[10px] font-bold">RIYADH</span>
                     <span className="px-3 py-1 bg-slate-900 rounded-lg text-[10px] font-bold">DUBAI</span>
                     <span className="px-3 py-1 bg-slate-900 rounded-lg text-[10px] font-bold text-cyan-400 border border-cyan-500/30">DOHA</span>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Total GCC Pipeline</span>
                    <span className="text-2xl font-black text-white">$42,500,000</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                    <div className="bg-cyan-500 h-full w-[85%]"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="p-4 bg-slate-900/50 rounded-xl">
                      <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Qual. Accuracy</p>
                      <p className="text-xl font-black text-cyan-400">98.2%</p>
                    </div>
                    <div className="p-4 bg-slate-900/50 rounded-xl">
                      <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Avg. Response</p>
                      <p className="text-xl font-black text-cyan-400">54s</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StrategyGenerator />

      {/* TESTIMONIALS CAROUSEL */}
      <section className="py-24 bg-slate-950 overflow-hidden relative">
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-6">{t.testimonialTitle}</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-16">{t.testimonialDesc}</p>

          <div className="max-w-4xl mx-auto relative px-4">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-700 ease-in-out" 
                style={{ transform: `translateX(-${testimonialIndex * 100}%)` }}
              >
                {TESTIMONIALS.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0">
                    <div className="glass p-10 md:p-16 rounded-[3rem] border-white/5 relative">
                      <Quote className="absolute top-8 left-8 text-cyan-500/20 rtl:left-auto rtl:right-8" size={64} />
                      <p className="text-xl md:text-2xl italic text-slate-200 leading-relaxed mb-10 relative z-10">
                        "{testimonial.quote[lang]}"
                      </p>
                      <div className="flex flex-col items-center">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name} 
                          className="w-16 h-16 rounded-full border-2 border-cyan-500 p-0.5 mb-4 shadow-[0_0_15px_rgba(34,211,238,0.3)]" 
                        />
                        <h4 className="text-lg font-black text-white">{testimonial.name}</h4>
                        <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest">{testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Controls */}
            <div className="flex justify-center space-x-3 rtl:space-x-reverse mt-10">
              {TESTIMONIALS.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setTestimonialIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${testimonialIndex === idx ? 'w-8 bg-cyan-500' : 'w-2 bg-slate-700'}`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={() => setTestimonialIndex((testimonialIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full hidden md:flex p-4 text-slate-500 hover:text-cyan-400 transition-colors"
            >
              <ChevronLeft size={32} />
            </button>
            <button 
              onClick={() => setTestimonialIndex((testimonialIndex + 1) % TESTIMONIALS.length)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full hidden md:flex p-4 text-slate-500 hover:text-cyan-400 transition-colors"
            >
              <ChevronRight size={32} />
            </button>
          </div>
        </div>
      </section>

      {/* EXPANDED PORTFOLIO PREVIEW */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-6xl font-black mb-6">{t.caseStudiesTitle}</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-16">{t.caseStudiesDesc}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {CASE_STUDIES.map((study) => (
              <div key={study.id} className="group overflow-hidden rounded-[2.5rem] glass flex flex-col h-full text-left rtl:text-right border border-white/5 hover:border-cyan-500/30 transition-all duration-500">
                <div className="relative h-80 overflow-hidden">
                  <img src={study.image} alt={study.client} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-60"></div>
                  <div className="absolute bottom-6 left-6 rtl:left-auto rtl:right-6">
                    <span className="px-4 py-1 bg-cyan-500 text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-full">{study.category[lang]}</span>
                  </div>
                </div>
                <div className="p-10 flex flex-col flex-grow">
                  <h4 className="text-sm font-bold text-cyan-400 mb-2 uppercase tracking-widest">{study.client}</h4>
                  <h3 className="text-2xl md:text-3xl font-black mb-6 leading-tight">{study.title[lang]}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    {study.results[lang].map((res, idx) => (
                      <div key={idx} className="p-3 bg-slate-900/50 rounded-xl border border-white/5">
                        <p className="text-xs font-bold text-slate-500 uppercase mb-1">{res.split(' ').slice(1).join(' ')}</p>
                        <p className="text-lg font-black text-white">{res.split(' ')[0]}</p>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => setCurrentPage('portfolio')}
                    className="mt-auto text-xs font-black uppercase tracking-[0.2em] text-white flex items-center hover:text-cyan-400 transition-colors"
                  >
                    View Operational Data <ArrowRight size={14} className="ml-2 rtl:mr-2 rtl:rotate-180" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );

  const renderServices = () => (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black mb-6">{t.benefitsHeading}</h1>
          <p className="text-slate-400 max-w-2xl mx-auto italic text-xl">{t.benefitsSub}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-4">
            {SERVICES.map((s) => (
              <div 
                key={s.id}
                onMouseEnter={() => setActiveService(s.id)}
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
              <div className="relative z-10 animate-in fade-in slide-in-from-right-10 duration-500">
                <h2 className="text-4xl font-black mb-4 text-white">{SERVICES.find(s => s.id === activeService)?.title[lang]}</h2>
                <p className="text-lg text-slate-300 mb-10 leading-relaxed max-w-xl">
                  {SERVICES.find(s => s.id === activeService)?.description[lang]}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Market Impact</h4>
                    <p className="text-lg font-semibold text-cyan-400 leading-relaxed">
                      {SERVICE_DETAILS[activeService as keyof typeof SERVICE_DETAILS].roi[lang]}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Global Tech Stack</h4>
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
                    onClick={() => {
                      setCurrentPage('contact');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-8 py-4 bg-cyan-500 text-slate-900 font-black rounded-xl hover:bg-cyan-400 transition-all flex items-center group"
                  >
                    Deploy Infrastructure <ArrowUpRight className="ml-2 rtl:mr-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">{t.contactTitle}</h1>
            <p className="text-xl text-slate-400 mb-12">{t.contactDesc}</p>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center mr-6 rtl:mr-0 rtl:ml-6 shrink-0 border-cyan-500/30"><Mail className="text-cyan-400" /></div>
                <div><h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-1">Regional Liaison</h3><p className="text-xl font-bold">hello@ansurysystem.online</p></div>
              </div>
              <div className="flex items-start">
                <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center mr-6 rtl:mr-0 rtl:ml-6 shrink-0 border-cyan-500/30"><Phone className="text-cyan-400" /></div>
                <div><h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-1">Command Center</h3><p className="text-xl font-bold">+974 51182644</p></div>
              </div>
              <div className="flex items-start">
                <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center mr-6 rtl:mr-0 rtl:ml-6 shrink-0 border-cyan-500/30"><Globe className="text-cyan-400" /></div>
                <div><h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-1">Operational Bases</h3><p className="text-xl font-bold leading-tight">Riyadh • Dubai • Doha • Kuwait City</p></div>
              </div>
            </div>
          </div>

          <div className="glass p-8 md:p-12 rounded-[2.5rem] border-white/10 relative">
            <h3 className="text-2xl font-black mb-8">{t.formTitle}</h3>
            {submitStatus === 'success' ? (
              <div className="text-center py-20 animate-in zoom-in duration-300">
                <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 size={40} /></div>
                <h4 className="text-3xl font-black mb-4">Blueprint Protocol Initiated</h4>
                <p className="text-slate-400">A senior regional strategist will contact you within 4 hours.</p>
                <button onClick={() => setSubmitStatus('idle')} className="mt-8 text-cyan-400 font-bold hover:underline">Reset</button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Full Name</label>
                    <input required type="text" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-4 text-white focus:border-cyan-500 outline-none" value={contactForm.name} onChange={(e) => setContactForm({...contactForm, name: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Regional Company</label>
                    <input required type="text" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-4 text-white focus:border-cyan-500 outline-none" value={contactForm.company} onChange={(e) => setContactForm({...contactForm, company: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Business Email</label>
                  <input required type="email" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-4 text-white focus:border-cyan-500 outline-none" value={contactForm.email} onChange={(e) => setContactForm({...contactForm, email: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Regional Growth Bottleneck</label>
                  <textarea required rows={4} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-4 text-white focus:border-cyan-500 outline-none resize-none" value={contactForm.message} onChange={(e) => setContactForm({...contactForm, message: e.target.value})}></textarea>
                </div>
                <button disabled={isSubmitting} className="w-full py-5 bg-cyan-500 text-slate-900 font-black rounded-xl hover:bg-cyan-400 flex items-center justify-center space-x-2 transition-all">
                  {isSubmitting ? <Loader2 className="animate-spin" /> : t.send}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPortfolio = () => {
    const activeStudy = CASE_STUDIES[carouselIndex];
    return (
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-6 mb-12">
          <h1 className="text-5xl md:text-7xl font-black mb-6">{t.caseStudiesTitle}</h1>
          <p className="text-xl text-slate-400 max-w-2xl">{t.caseStudiesDesc}</p>
        </div>

        <div className="relative w-full h-[600px] md:h-[750px] overflow-hidden bg-slate-950 mb-32">
          <div className="absolute inset-0 transition-all duration-1000">
            <img key={activeStudy.id} src={activeStudy.image} className="w-full h-full object-cover opacity-40" alt={activeStudy.client} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent rtl:bg-gradient-to-l"></div>
          
          <div className="container mx-auto h-full px-6 relative z-10 flex items-center">
            <div className="max-w-4xl">
              <div className="flex items-center space-x-4 rtl:space-x-reverse mb-8">
                <span className="w-12 h-1 bg-cyan-500"></span>
                <span className="text-cyan-400 font-black uppercase tracking-[0.4em] text-xs">Regional Success Case 0{carouselIndex + 1}</span>
              </div>
              <h2 className="text-4xl md:text-7xl font-black text-white mb-6 leading-tight">{activeStudy.title[lang]}</h2>
              <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl">{activeStudy.description[lang]}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {activeStudy.results[lang].map((r, i) => (
                  <div key={i} className="glass p-6 rounded-2xl border-cyan-500/20">
                    <p className="text-3xl font-black text-cyan-400 mb-1">{r.split(' ')[0]}</p>
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
                  Deploy These Results for My Business
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
      <main>
        {currentPage === 'home' && renderHome()}
        {currentPage === 'portfolio' && renderPortfolio()}
        {currentPage === 'services' && renderServices()}
        {currentPage === 'contact' && renderContact()}
      </main>
      
      {/* WhatsApp Regional Connector */}
      <a 
        href={`https://wa.me/97451182644?text=${encodeURIComponent(lang === 'en' ? 'Hello Ansury Systems, I would like to discuss a regional growth infrastructure for my business.' : 'مرحباً أنسوري للأنظمة، أود مناقشة بنية تحتية للنمو الإقليمي لأعمالي.')}`}
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
                {lang === 'en' ? 'The Middle East\'s dominant force in autonomous growth infrastructure. Scaling Khaleeji businesses through AI synchronization.' : 'القوة المهيمنة في الشرق الأوسط في البنية التحتية للنمو الذاتي. توسيع نطاق الشركات الخليجية من خلال مزامنة الذكاء الاصطناعي.'}
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
              <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Regional Access</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li onClick={() => setCurrentPage('home')} className="hover:text-cyan-400 cursor-pointer transition-colors">{t.footerHome}</li>
                <li onClick={() => setCurrentPage('portfolio')} className="hover:text-cyan-400 cursor-pointer transition-colors">{t.footerSuccess}</li>
                <li onClick={() => setCurrentPage('contact')} className="hover:text-cyan-400 cursor-pointer transition-colors">{t.footerBlueprint}</li>
                <li className="hover:text-cyan-400 cursor-pointer transition-colors opacity-60 italic">{t.footerCareers}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Headquarters</h4>
              <p className="text-slate-400 text-sm mb-2">Riyadh • Dubai • Doha</p>
              <p className="text-slate-400 text-sm">hello@ansurysystem.online</p>
            </div>
          </div>
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600 font-bold uppercase tracking-widest">
            <p>© 2024 Ansury Systems LLC. Registered across the GCC.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
