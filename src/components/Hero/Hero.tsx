'use client';

import React from 'react';
import { Box, BriefcaseBusiness, Code, Cpu, Mail, Terminal, TestTube2, GitBranch } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import TerminalBot from '@/components/TerminalBot/TerminalBot'; // تأكد من المسار


import { EXTERNAL_LINKS } from '@/constants/links';
import { BsGithub } from 'react-icons/bs';

const CONTACT_LINKS = {
    github: EXTERNAL_LINKS.github,
    linkedin: EXTERNAL_LINKS.linkedin,
    email: EXTERNAL_LINKS.email,
};

const Hero = () => {
    const t = useTranslations('hero');
    const locale = useLocale();
    const isArabic = locale === 'ar';

    // استخراج المصفوفات برمجياً
    const techStack = t.raw('techStack') as string[];

    const socialLinks = [
        {
            href: CONTACT_LINKS.github,
            label: t('social.github') || 'GitHub',
            icon: BsGithub, // استخدام الـ SVG
            hoverClassName: 'hover:bg-gray-800 hover:border-gray-600',
        },
        {
            href: CONTACT_LINKS.linkedin,
            label: t('social.linkedin') || 'LinkedIn',
            icon: BriefcaseBusiness,
            hoverClassName: 'hover:bg-[#0077b5] hover:border-[#0077b5]',
        },
        {
            href: CONTACT_LINKS.email,
            label: t('social.email') || 'Email',
            icon: Mail,
            hoverClassName: 'hover:bg-red-500 hover:border-red-500',
        },
    ];

    const scrollToProjects = () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section
            className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-app-bg text-app-text pt-24 lg:pt-0"
            dir={isArabic ? 'rtl' : 'ltr'}
            id="hero"
        >
            {/* Background Floating Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] left-[10%] opacity-5 animate-float text-primary">
                    <Code size={120} />
                </div>
                <div className="absolute top-[30%] right-[10%] opacity-5 animate-float" style={{ animationDelay: '1s' }}>
                    <Box size={100} />
                </div>
                <div className="absolute bottom-[10%] right-[15%] opacity-5 animate-float text-purple-500" style={{ animationDelay: '2s' }}>
                    <Terminal size={120} />
                </div>
                <div className="absolute bottom-[15%] left-[15%] opacity-5 animate-float" style={{ animationDelay: '1.5s' }}>
                    <TestTube2 size={80} />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center z-10 w-full relative">

                {/* 1. Left Side: Content & CTA */}
                <div className="space-y-8 animate-fade-in-up order-2 lg:order-1 text-center lg:text-start">

                    {/* Availability Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-app-surface/50 backdrop-blur-md rounded-full border border-primary/20 shadow-lg shadow-primary/5">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        <span className="text-primary font-medium tracking-wide text-sm">
                            {t('availability')}
                        </span>
                    </div>

                    {/* Headline */}
                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
                            <span className="block text-app-text">
                                {t('intro')}{' '}
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-blue-400 to-purple-500 animate-gradient">
                                    {t('name')}
                                </span>
                            </span>
                            <span className="block text-3xl md:text-4xl lg:text-5xl mt-3 text-app-muted font-bold">
                                {t('title')}
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-app-muted max-w-xl leading-relaxed mx-auto lg:mx-0">
                            {t('description')}
                        </p>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap justify-center lg:justify-start gap-3 py-2">
                        {techStack?.map((tech) => (
                            <span
                                key={tech}
                                className="px-3.5 py-1.5 bg-app-surface/60 border border-white/5 rounded-lg text-sm font-mono text-gray-300 hover:border-primary/50 hover:text-primary transition-colors cursor-default"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* Buttons & Socials */}
                    <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start pt-4">
                        <button
                            type="button"
                            onClick={scrollToProjects}
                            className="px-8 py-4 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)] hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
                        >
                            {t('cta')}
                        </button>

                        <div className="flex items-center gap-4">
                            {socialLinks.map(({ href, label, icon: Icon, hoverClassName }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target={href.startsWith('mailto:') ? undefined : '_blank'}
                                    rel={href.startsWith('mailto:') ? undefined : 'noreferrer'}
                                    aria-label={label}
                                    className={`p-3.5 bg-app-surface text-app-muted rounded-xl border border-white/5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:text-white ${hoverClassName}`}
                                >
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 2. Right Side: Terminal + ChatBot */}
                <div className="order-2 lg:order-2 w-full animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <TerminalBot />
                </div>

            </div>
        </section>
    );
};

export default Hero;