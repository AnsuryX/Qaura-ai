
import React, { useState, useEffect } from 'react';
import { 
  Rocket, 
  ChevronRight, 
  ArrowRight, 
  Cpu, 
  BarChart3, 
  Globe, 
  Zap, 
  Play, 
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
  ChevronLeft,
  Sparkles,
  Loader2,
  Orbit
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
      case 'Cpu': return <Cpu className={color} size={size} />;
      case 'BarChart3': return <BarChart3 className={color} size={size} />;
      case 'Globe': return <Globe className={color} size={size} />;
      case 'Zap': return <Zap className={color} size={size} />;
      default: return <Orbit className={color} size={size} />;
    }
  };

  const t = {
    heroTag: lang === 'en' ? "Qatar's Premier Strategic AI Agency" : "وكالة أنسوري للأنظمة - الرائدة في قطر",
    heroTitle: lang === 'en' ? "The Future of Growth Is Autonomous." : "مستقبل النمو أصبح ذاتي التشغيل.",
    heroSpan: lang === 'en' ? "Growth" : "النمو",
    heroDesc: lang === 'en' 
      ? "Ansury Systems empowers Qatari enterprises with predictive engines that convert at 4x the industry average." 
      : "أنسوري للأنظمة تمكن الشركات القطرية بمحركات تنبؤية تحقق تحويلات تزيد بـ 4 أضعاف عن متوسط الصناعة.",
    ctaStart: lang === 'en' ? "Start Your Evolution" : "ابدأ رحلة التطور",
    ctaShowreel: lang === 'en' ? "View Showreel" : "مشاهدة العرض",
    dominance: lang === 'en' ? "Market Dominance." : "الهيمنة على السوق.",
    dominanceDesc: lang === 'en' 
      ? "Explore our specialized AI modules engineered for the unique dynamics of the Qatari economy." 
      : "اكتشف وحدات الذكاء الاصطناعي المتخصصة لدينا والمصممة خصيصاً للديناميكيات الفريدة للاقتصاد القطري.",
    activeModule: lang === 'en' ? "Strategic Engine Active" : "المحرك الاستراتيجي نشط",
    roiLabel: lang === 'en' ? "Projected ROI Impact" : "تأثير العائد المتوقع",
    techStack: lang === 'en' ? "Neural Tech Stack" : "مجموعة التقنيات العصبية",
    featuresLabel: lang === 'en' ? "Strategic Features" : "الميزات الاستراتيجية",
    initStrategy: lang === 'en' ? "Initialize Strategy Session" : "بدء جلسة الاستراتيجية",
    winsTitle: lang === 'en' ? "Proven Wins." : "نجاحات مثبتة.",
    winsDesc: lang === 'en' ? "Real results for real businesses in the heart of Qatar." : "نتائج حقيقية لأعمال حقيقية في قلب قطر.",
    seeFullPortfolio: lang === 'en' ? "See the Full Portfolio" : "عرض جميع الأعمال",
    contactTitle: lang === 'en' ? "Let's Build the Next." : "لنقم ببناء المستقبل.",
    contactDesc: lang === 'en' ? "Whether you're a startup or an established enterprise in Qatar, our AI solutions are built to scale with you." : "سواء كنت شركة ناشئة أو مؤسسة راسخة في قطر، فإن حلول الذكاء الاصطناعي لدينا مبنية لتتوسع معك.",
    emailUs: lang === 'en' ? "Email Us" : "راسلنا",
    callUs: lang === 'en' ? "Call Our Doha Office" : "اتصل بمكتبنا في الدوحة",
    hq: lang === 'en' ? "HQ Location" : "المقر الرئيسي",
    hqAddr: lang === 'en' ? "Level 24, Tornado Tower, West Bay, Doha, Qatar" : "الطابق 24، برج تورنيدو، الخليج الغربي، الدوحة، قطر",
    formTitle: lang === 'en' ? "Secure Your Free Strategy Session" : "احجز جلستك الاستراتيجية المجانية",
    fullName: lang === 'en' ? "Full Name" : "الاسم الكامل",
    company: lang === 'en' ? "Company Name" : "اسم الشركة",
    email: lang === 'en' ? "Business Email" : "البريد الإلكتروني للعمل",
    budget: lang === 'en' ? "Budget Range (QAR)" : "نطاق الميزانية (ريال قطري)",
    msg: lang === 'en' ? "Project Description" : "وصف المشروع",
    send: lang === 'en' ? "Send Transmission" : "إرسال البيانات",
    successMsg: lang === 'en' ? "Transmission Received" : "تم استلام البيانات",
    successDesc: lang === 'en' ? "Our senior strategists are reviewing your data. Expected response time: 2.4 hours." : "كبار الخبراء لدينا يراجعون بياناتك. وقت الرد المتوقع: 2.4 ساعة.",
    flagship: lang === 'en' ? "Flagship Exhibits." : "المشاريع الرائدة.",
    flagshipDesc: lang === 'en' ? "High-impact transformations fueled by autonomous intelligence." : "تحولات عالية التأثير مدعومة بالذكاء الذاتي.",
    caseNo: lang === 'en' ? "Flagship Case No." : "الحالة الرائدة رقم",
    readBreakdown: lang === 'en' ? "Read Breakdown" : "قراءة التفاصيل",
  };

  const renderHome = () => (
    <>
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-slate-900 border border-slate-700 px-4 py-2 rounded-full mb-8 animate-in fade-in slide-in-from-bottom duration-700">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-xs font-bold tracking-widest uppercase text-slate-300">{t.heroTag}</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight">
            {lang === 'en' ? (
              <>The Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Growth</span> Is <span className="italic font-light">Autonomous.</span></>
            ) : (
              <>{t.heroTitle}</>
            )}
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            {t.heroDesc}
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6 rtl:space-x-reverse animate-in fade-in slide-in-from-bottom duration-1500 delay-500">
            <button 
              onClick={() => setCurrentPage('contact')}
              className="w-full md:w-auto px-10 py-5 bg-cyan-500 text-slate-900 font-black rounded-full text-lg hover:bg-cyan-400 transition-all shadow-[0_0_30px_rgba(34,211,238,0.4)] flex items-center justify-center"
            >
              {t.ctaStart} <ArrowRight className={`ml-2 rtl:mr-2 rtl:rotate-180`} />
            </button>
            <button 
              onClick={() => setCurrentPage('portfolio')}
              className="w-full md:w-auto px-10 py-5 glass text-white font-bold rounded-full text-lg flex items-center justify-center hover:bg-white/10 transition-all"
            >
              <Play className="mr-2 rtl:ml-2 fill-current" size={18} /> {t.ctaShowreel}
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6">{lang === 'en' ? <>{t.dominance.split(' ')[0]} <span className="text-cyan-400">{t.dominance.split(' ')[1]}</span></> : t.dominance}</h2>
            <p className="text-slate-400 max-w-2xl mx-auto italic">{t.dominanceDesc}</p>
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
              <div className="glass rounded-[3rem] p-12 border-cyan-500/20 relative overflow-hidden group min-h-[500px] flex flex-col justify-center">
                <div className="relative z-10 animate-in fade-in slide-in-from-right-10 duration-500">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse mb-8">
                    <span className="px-4 py-1 bg-cyan-500/10 text-cyan-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-cyan-500/20">{t.activeModule}</span>
                    <Sparkles size={16} className="text-cyan-400" />
                  </div>
                  
                  <h2 className="text-4xl font-black mb-4 text-white">{SERVICES.find(s => s.id === activeService)?.title[lang]}</h2>
                  <p className="text-lg text-slate-300 mb-10 leading-relaxed max-w-xl">
                    {SERVICES.find(s => s.id === activeService)?.description[lang]}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    <div>
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">{t.roiLabel}</h4>
                      <p className="text-lg font-semibold text-cyan-400 leading-relaxed">
                        {SERVICE_DETAILS[activeService as keyof typeof SERVICE_DETAILS].roi[lang]}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">{t.techStack}</h4>
                      <div className="flex flex-wrap gap-2">
                        {SERVICE_DETAILS[activeService as keyof typeof SERVICE_DETAILS].tools.map((t, idx) => (
                          <span key={idx} className="px-3 py-1 bg-slate-900 rounded-lg text-xs font-bold text-slate-300 border border-white/5">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">{t.featuresLabel}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {SERVICE_DETAILS[activeService as keyof typeof SERVICE_DETAILS].features[lang].map((f, idx) => (
                        <div key={idx} className="p-4 bg-slate-900/50 rounded-xl border border-white/5 hover:border-cyan-500/30 transition-all flex items-center space-x-3 rtl:space-x-reverse group/feat">
                          <CheckCircle2 size={16} className="text-cyan-500 shrink-0" />
                          <span className="text-xs font-medium text-slate-300 group-hover/feat:text-white">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-12 flex justify-end">
                    <button 
                      onClick={() => setCurrentPage('contact')}
                      className="px-8 py-4 bg-cyan-500 text-slate-900 font-black rounded-xl hover:bg-cyan-400 transition-all transform hover:scale-105 active:scale-95 flex items-center"
                    >
                      {t.initStrategy} <ArrowUpRight className="ml-2 rtl:mr-2" size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StrategyGenerator />

      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-6xl font-black mb-6">{lang === 'en' ? <>{t.winsTitle.split(' ')[0]} <span className="text-cyan-400">{t.winsTitle.split(' ')[1]}</span></> : t.winsTitle}</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-16">{t.winsDesc}</p>

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
                  <div className="space-y-3 mt-auto">
                    {study.results[lang].map((res, idx) => (
                      <div key={idx} className="flex items-center text-sm text-slate-300">
                        <CheckCircle2 size={16} className="text-cyan-400 mr-2 rtl:ml-2 shrink-0" />
                        <span>{res}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16">
            <button onClick={() => setCurrentPage('portfolio')} className="px-12 py-4 border border-white/10 hover:border-cyan-500 rounded-full font-bold transition-all inline-flex items-center">
              {t.seeFullPortfolio} <ArrowRight size={18} className="ml-2 rtl:mr-2 rtl:rotate-180" />
            </button>
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
          <h1 className="text-5xl md:text-7xl font-black mb-6">{lang === 'en' ? <>{t.flagship.split(' ')[0]} <span className="text-cyan-400">{t.flagship.split(' ')[1]}</span></> : t.flagship}</h1>
          <p className="text-xl text-slate-400 max-w-2xl">{t.flagshipDesc}</p>
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
                <span className="text-cyan-400 font-black uppercase tracking-[0.4em] text-xs">{t.caseNo} 0{carouselIndex + 1}</span>
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
                <button className="px-10 py-5 bg-cyan-500 text-slate-900 font-black rounded-full hover:bg-cyan-400 transition-all">
                  {t.readBreakdown}
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

  const renderContact = () => (
    <div id="contact-section" className="pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">{t.contactTitle}</h1>
            <p className="text-xl text-slate-400 mb-12">{t.contactDesc}</p>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center mr-6 rtl:mr-0 rtl:ml-6 shrink-0 border-cyan-500/30"><Mail className="text-cyan-400" /></div>
                <div><h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-1">{t.emailUs}</h3><p className="text-xl font-bold">hello@ansury.systems</p></div>
              </div>
              <div className="flex items-start">
                <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center mr-6 rtl:mr-0 rtl:ml-6 shrink-0 border-cyan-500/30"><Phone className="text-cyan-400" /></div>
                <div><h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-1">{t.callUs}</h3><p className="text-xl font-bold">+974 4400 0000</p></div>
              </div>
              <div className="flex items-start">
                <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center mr-6 rtl:mr-0 rtl:ml-6 shrink-0 border-cyan-500/30"><MapPin className="text-cyan-400" /></div>
                <div><h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-1">{t.hq}</h3><p className="text-xl font-bold leading-tight">{t.hqAddr}</p></div>
              </div>
            </div>
          </div>

          <div className="glass p-8 md:p-12 rounded-[2.5rem] border-white/10 relative">
            <h3 className="text-2xl font-black mb-8">{t.formTitle}</h3>
            {submitStatus === 'success' ? (
              <div className="text-center py-20 animate-in zoom-in duration-300">
                <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 size={40} /></div>
                <h4 className="text-3xl font-black mb-4">{t.successMsg}</h4>
                <p className="text-slate-400">{t.successDesc}</p>
                <button onClick={() => setSubmitStatus('idle')} className="mt-8 text-cyan-400 font-bold hover:underline">Reset</button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{t.fullName}</label>
                    <input required type="text" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-4 text-white focus:border-cyan-500 outline-none" value={contactForm.name} onChange={(e) => setContactForm({...contactForm, name: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{t.company}</label>
                    <input required type="text" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-4 text-white focus:border-cyan-500 outline-none" value={contactForm.company} onChange={(e) => setContactForm({...contactForm, company: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{t.email}</label>
                  <input required type="email" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-4 text-white focus:border-cyan-500 outline-none" value={contactForm.email} onChange={(e) => setContactForm({...contactForm, email: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{t.msg}</label>
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
    </div>
  );

  const renderContent = () => {
    switch (currentPage) {
      case 'portfolio': return renderPortfolio();
      case 'contact': return renderContact();
      case 'services': return renderHome();
      default: return renderHome();
    }
  };

  return (
    <div className={`min-h-screen ${lang === 'ar' ? 'font-arabic' : ''}`}>
      <Navbar currentPage={currentPage} setPage={setCurrentPage} lang={lang} toggleLang={toggleLang} />
      <main>{renderContent()}</main>
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
                {lang === 'en' ? 'Leading the digital transformation of the Middle East through high-performance autonomous intelligence.' : 'قيادة التحول الرقمي في الشرق الأوسط من خلال الذكاء الذاتي عالي الأداء.'}
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Command</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li onClick={() => setCurrentPage('home')} className="hover:text-cyan-400 cursor-pointer transition-colors">Home</li>
                <li onClick={() => setCurrentPage('portfolio')} className="hover:text-cyan-400 cursor-pointer transition-colors">Portfolio</li>
                <li onClick={() => setCurrentPage('contact')} className="hover:text-cyan-400 cursor-pointer transition-colors">Contact</li>
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600 font-bold uppercase tracking-widest">
            <p>© 2024 Ansury Systems LLC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
