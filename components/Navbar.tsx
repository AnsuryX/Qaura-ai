
import React, { useState, useEffect } from 'react';
import { Menu, X, Orbit, Languages } from 'lucide-react';
import { Page, Language } from '../types';

interface NavbarProps {
  currentPage: Page;
  setPage: (page: Page) => void;
  lang: Language;
  toggleLang: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, setPage, lang, toggleLang }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const labels = {
    home: lang === 'en' ? 'Home' : 'الرئيسية',
    portfolio: lang === 'en' ? 'Portfolio' : 'الأعمال',
    services: lang === 'en' ? 'Services' : 'الخدمات',
    contact: lang === 'en' ? 'Contact' : 'اتصل بنا',
    getStarted: lang === 'en' ? 'Get Started' : 'ابدأ الآن'
  };

  const navItems: { label: string; value: Page }[] = [
    { label: labels.home, value: 'home' },
    { label: labels.portfolio, value: 'portfolio' },
    { label: labels.services, value: 'services' },
    { label: labels.contact, value: 'contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-4 glass' : 'py-6 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div 
          className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer group"
          onClick={() => setPage('home')}
        >
          <div className="p-2 bg-cyan-500 rounded-lg group-hover:bg-cyan-400 transition-all shadow-[0_0_15px_rgba(34,211,238,0.3)]">
            <Orbit className="text-slate-900" size={24} />
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="text-2xl font-black tracking-tighter text-white uppercase">ANSURY</span>
            <span className="text-[10px] font-bold tracking-[0.3em] text-cyan-400 uppercase">SYSTEMS</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => setPage(item.value)}
              className={`text-sm font-medium transition-colors hover:text-cyan-400 ${currentPage === item.value ? 'text-cyan-400' : 'text-slate-300'}`}
            >
              {item.label}
            </button>
          ))}
          
          <button 
            onClick={toggleLang}
            className="p-2 hover:bg-white/10 rounded-full transition-all text-cyan-400 flex items-center space-x-2 rtl:space-x-reverse"
          >
            <Languages size={18} />
            <span className="text-xs font-bold">{lang === 'en' ? 'AR' : 'EN'}</span>
          </button>

          <button 
            onClick={() => setPage('contact')}
            className="px-6 py-2.5 bg-white text-slate-900 font-bold rounded-full hover:bg-cyan-400 transition-all transform hover:scale-105 active:scale-95 text-sm"
          >
            {labels.getStarted}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center space-x-4 md:hidden">
           <button onClick={toggleLang} className="p-2 text-cyan-400"><Languages size={24}/></button>
           <button className="text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
             {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
           </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full glass border-t border-white/10 p-6 flex flex-col space-y-6 animate-in slide-in-from-top duration-300">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => {
                setPage(item.value);
                setIsMobileMenuOpen(false);
              }}
              className={`text-xl font-semibold text-left rtl:text-right ${currentPage === item.value ? 'text-cyan-400' : 'text-slate-300'}`}
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={() => {
              setPage('contact');
              setIsMobileMenuOpen(false);
            }}
            className="w-full py-4 bg-cyan-500 text-slate-900 font-bold rounded-xl"
          >
            {labels.getStarted}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
