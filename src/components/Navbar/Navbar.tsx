"use client"; 

import { useState, useEffect, useCallback, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, Code, User, FolderOpen, MessageCircle, FileText, Info } from 'lucide-react';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import { useLocale, useTranslations } from 'next-intl';
import { EXTERNAL_LINKS } from '@/constants/links';

export default function Navbar() {
  const t = useTranslations('nav');
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const isRtl = locale === 'ar'; 

  const navItems = useMemo(() => [
    { id: 'hero', label: t("home"), icon: User },
    { id: 'about', label: t("about"), icon: Info },
    { id: 'skills', label: t("skills"), icon: Code },
    { id: 'projects', label: t("projects"), icon: FolderOpen },
    { id: 'contact', label: t("contact"), icon: MessageCircle },
  ], [t]);

  // دالة تغيير اللغة (بدون ريفريش)
  const switchLanguage = () => {
    const nextLocale = isRtl ? 'en' : 'ar';
    
    // 1. تحديث الكوكي لضمان حفظ تفضيل المستخدم
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000;`;
    
    // 2. تحديث المسار برمجياً بدون عمل Refresh للصفحة
    let newPathname = pathname;
    if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
      newPathname = pathname.replace(`/${locale}`, `/${nextLocale}`);
    } else {
      newPathname = `/${nextLocale}${pathname}`;
    }
    
    // استبدال المسار الحالي بالمسار الجديد بسلاسة
    router.replace(newPathname);
  };

  const handleScroll = useCallback(() => {
    const totalScroll = document.documentElement.scrollTop;
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scroll = `${totalScroll / windowHeight}`;
    setScrollProgress(Number(scroll) * 100);

    if (pathname === '/' || pathname === `/${locale}`) {
      const sections = navItems.map(item => item.id);
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= -150 && rect.top <= 300; 
        }
        return false;
      });
      if (current) setActiveSection(current);
    }
  }, [navItems, pathname, locale]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const handleNavigation = (id: string) => {
    setIsMenuOpen(false);
    
    if (pathname !== '/' && pathname !== `/${locale}`) {
      router.push(`/${locale}/#${id}`.replace('//', '/'));
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-app-surface/60 backdrop-blur-2xl z-100 border-b border-white/5 transition-all duration-300 shadow-sm" dir={isRtl ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div 
            className="shrink-0 cursor-pointer flex items-center gap-2" 
            onClick={() => handleNavigation('hero')}
          >
            <span className="text-2xl font-bold bg-linear-to-r from-primary via-purple-400 to-primary bg-size-[200%_auto] bg-clip-text text-transparent animate-gradient">
              Kamal
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              {navItems.map((item) => {
                const isActive = activeSection === item.id && (pathname === '/' || pathname === `/${locale}`);
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className={`${
                        isActive
                        ? 'text-primary bg-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]' 
                        : 'text-app-muted hover:text-primary hover:bg-white/5'
                      } px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 group`}
                    aria-label={`Go to ${item.label}`}
                  >
                    <item.icon size={16} className={`${isActive ? 'text-primary' : 'group-hover:scale-110'} transition-transform duration-300`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}

              <div className="h-6 w-px bg-white/10 mx-4" aria-hidden="true" />

              <a
                href={EXTERNAL_LINKS.resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group text-app-muted hover:text-primary hover:bg-white/5"
              >
                <FileText size={16} className="group-hover:rotate-12 transition-transform" />
                <span>{t("resume") || 'Resume'}</span>
              </a>

              {/* أزرار الثيم واللغة */}
              <div className="flex items-center gap-3 mr-2 rtl:mr-0 rtl:ml-2">
                
                <ThemeSwitcher />
                
                {/* زر تغيير اللغة باستخدام Flagcdn */}
                <button
                  onClick={switchLanguage}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/10 hover:border-white/10 text-app-text hover:text-primary transition-all duration-300"
                  aria-label={isRtl ? "Switch to English" : "تغيير اللغة إلى العربية"}
                >
                  {isRtl ? (
                    <>
                      <img src="https://flagcdn.com/w40/us.png" alt="English Flag" className="w-5 h-3.5 rounded-xs object-cover shadow-sm border border-white/20" />
                      <span className="text-xs font-bold font-mono tracking-wide mt-0.5">EN</span>
                    </>
                  ) : (
                    <>
                      <img src="https://flagcdn.com/w40/eg.png" alt="العلم العربي" className="w-5 h-3.5 rounded-xs object-cover shadow-sm border border-white/20" />
                      <span className="text-xs font-bold tracking-wide mt-0.5">عربي</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button & Tools */}
          <div className="md:hidden flex items-center gap-3">
            
            {/* زر تغيير اللغة في الموبايل */}
            <button
              onClick={switchLanguage}
              className="flex items-center justify-center p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-app-text transition-all duration-300"
              aria-label={isRtl ? "Switch to English" : "تغيير اللغة إلى العربية"}
            >
              {isRtl ? (
                <img src="https://flagcdn.com/w40/us.png" alt="English Flag" className="w-6 h-4 rounded-xs object-cover shadow-sm border border-white/20" />
              ) : (
                <img src="https://flagcdn.com/w40/eg.png" alt="العلم العربي" className="w-6 h-4 rounded-xs object-cover shadow-sm border border-white/20" />
              )}
            </button>
            
            <ThemeSwitcher />
            
            <div className="h-6 w-px bg-white/10 mx-1" aria-hidden="true" />
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-app-text hover:text-primary p-2 transition-colors focus:outline-none"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Progress Bar */}
      <div 
        className="absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-primary via-purple-500 to-primary transition-all duration-100 ease-out shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]" 
        style={{ width: `${scrollProgress}%` }} 
      />

      {/* Mobile Menu Dropdown */}
      <div 
        className={`md:hidden absolute w-full bg-app-surface/95 backdrop-blur-xl border-b border-white/5 shadow-xl transition-all duration-300 origin-top overflow-hidden ${
          isMenuOpen ? 'max-h-125 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id && (pathname === '/' || pathname === `/${locale}`);
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`w-full text-start px-4 py-3 text-base font-medium rounded-xl transition-colors flex items-center gap-3 ${
                  isActive 
                    ? 'text-primary bg-primary/10' 
                    : 'text-app-text hover:text-primary hover:bg-white/5'
                }`}
              >
                <item.icon size={18} className={isActive ? 'text-primary' : 'text-app-muted'} />
                {item.label}
              </button>
            )
          })}
          
          <div className="h-px w-full bg-white/10 my-3" aria-hidden="true" />
          
          <a
            href={EXTERNAL_LINKS.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMenuOpen(false)}
            className="w-full text-start px-4 py-3 text-base font-medium rounded-xl transition-colors flex items-center gap-3 text-app-text hover:text-primary hover:bg-white/5"
          >
            <FileText size={18} className="text-app-muted" />
            {t("resume") || 'Resume'}
          </a>
        </div>
      </div>
    </nav>
  );
}