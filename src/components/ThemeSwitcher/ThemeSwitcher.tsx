"use client";

import { useState, useRef, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';
import { useTheme } from '@/Providers/ThemeProvider/ThemeContext';
import { useTranslations, useLocale } from 'next-intl';

const ThemeSwitcher = () => {
    const { themes, currentTheme, setTheme } = useTheme();
    
    // استدعاء دوال next-intl
    // افترض أنك حاطط كلمة themes في ملفات الترجمة تحت قسم nav أو common
    const t = useTranslations(); 
    const locale = useLocale();
    const isRtl = locale === 'ar'; // تحديد اتجاه اللغة برمجياً

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // إغلاق القائمة عند النقر خارجها بشكل احترافي بدلاً من الـ Div الوهمي
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                    isOpen ? 'text-primary bg-white/5' : 'text-app-text hover:text-primary hover:bg-white/5'
                }`}
                aria-label={t('themes')}
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                <Palette size={18} className={isOpen ? 'animate-pulse' : ''} />
                <span className="hidden md:inline">{t('themes')}</span>
            </button>

            {/* استخدام CSS للأنيميشن بدلاً من الحذف من الـ DOM للحصول على تأثير سلس */}
            <div 
                className={`absolute top-full mt-2 w-48 bg-app-surface/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl z-20 overflow-hidden transition-all duration-200 origin-top ${
                    isOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
                } ${isRtl ? 'right-0' : 'right-0 md:left-auto'}`}
            >
                <div className="py-2">
                    {themes.map((theme) => {
                        const isActive = currentTheme.id === theme.id;
                        return (
                            <button
                                key={theme.id}
                                onClick={() => {
                                    setTheme(theme.id);
                                    setIsOpen(false);
                                }}
                                className={`w-full text-left px-4 py-2.5 flex items-center justify-between transition-colors focus:outline-none ${
                                    isActive 
                                        ? 'text-primary bg-primary/10' 
                                        : 'text-app-text hover:bg-white/5 hover:text-primary'
                                }`}
                                role="menuitem"
                            >
                                <div className="flex items-center gap-3">
                                    <span
                                        className="w-4 h-4 rounded-full shadow-sm ring-1 ring-white/20"
                                        style={{ background: theme.colors.primary }}
                                        aria-hidden="true"
                                    />
                                    <span className="text-sm font-medium">
                                        {/* الاعتماد على next-intl بدلاً من الـ CSS Classes */}
                                        {isRtl ? theme.labelAr : theme.name}
                                    </span>
                                </div>
                                {isActive && <Check size={16} className="text-primary animate-in zoom-in" />}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ThemeSwitcher;