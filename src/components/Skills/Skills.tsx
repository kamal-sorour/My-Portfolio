"use client";

import React, { useState, useEffect } from 'react';
import { GitBranch, Sparkles, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';

// استدعاء الأيقونات من مكتبة react-icons
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript,
  SiVuedotjs, SiAngular, SiTailwindcss, SiHtml5, SiCss,
  SiBootstrap, SiFramer, SiRedux, SiGit, SiFigma,
  SiVite, SiNpm
} from 'react-icons/si';
import { MdImportantDevices } from 'react-icons/md';

// خريطة لربط اسم المهارة بالأيقونة الخاصة بها
const iconMap: Record<string, React.ElementType> = {
  React: SiReact,
  'Next.js': SiNextdotjs,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  Vue: SiVuedotjs,
  Angular: SiAngular,
  'Tailwind CSS': SiTailwindcss,
  HTML: SiHtml5,
  CSS: SiCss,
  Bootstrap: SiBootstrap,
  'Framer Motion': SiFramer,
  Redux: SiRedux,
  Git: SiGit,
  Figma: SiFigma,
  Vite: SiVite,
  npm: SiNpm,
  Responsive: MdImportantDevices,
};

interface Skill {
  name: string;
  level: number;
  color: string;
  category: string;
}

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const t = useTranslations('skills');

  useEffect(() => {
    setMounted(true);
  }, []);

  const skills: Skill[] = [
    // Core Languages & Frameworks
    { name: 'React', level: 95, color: '#61DAFB', category: 'core' },
    { name: 'Next.js', level: 90, color: '#ffffff', category: 'core' },
    { name: 'TypeScript', level: 88, color: '#3178C6', category: 'core' },
    { name: 'JavaScript', level: 95, color: '#F7DF1E', category: 'core' },
    { name: 'Vue', level: 35, color: '#4FC08D', category: 'core' },
    { name: 'Angular', level: 40, color: '#DD0031', category: 'core' },

    // Styling & UI
    { name: 'Tailwind CSS', level: 92, color: '#06B6D4', category: 'styling' },
    { name: 'HTML', level: 98, color: '#E34F26', category: 'styling' },
    { name: 'CSS', level: 95, color: '#1572B6', category: 'styling' },
    { name: 'Bootstrap', level: 85, color: '#7952B3', category: 'styling' },
    { name: 'Framer Motion', level: 78, color: '#0055FF', category: 'styling' },

    // Ecosystem & Tools
    { name: 'Git', level: 88, color: '#F05032', category: 'tools' },
    { name: 'Figma', level: 80, color: '#F24E1E', category: 'tools' },
    { name: 'Vite', level: 82, color: '#646CFF', category: 'tools' },
    { name: 'Redux', level: 75, color: '#764ABC', category: 'tools' },
    { name: 'npm', level: 85, color: '#CB3837', category: 'tools' },
    { name: 'Responsive', level: 95, color: '#38bdf8', category: 'tools' },
  ];

  const categories = [
    { id: 'core', label: t('core'), icon: '⚛️' },
    { id: 'styling', label: t('styling'), icon: '🎨' },
    { id: 'tools', label: t('tools'), icon: '🛠️' },
  ];

  return (
    <section className="min-h-screen py-20 px-4 bg-app-bg text-app-text overflow-hidden" id="skills">
      <div className="max-w-6xl mx-auto relative">

        {/* Header */}
        <div className="text-center mb-16 relative z-10">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Zap className="text-primary animate-float" size={72} />
              <div className="absolute -top-2 -right-2">
                <Sparkles className="text-yellow-400 animate-pulse" size={24} />
              </div>
            </div>
          </div>
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400 mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-app-muted max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Skills by Category */}
        <div className="space-y-12">
          {categories.map((cat) => {
            const catSkills = skills.filter(s => s.category === cat.id);
            return (
              <div key={cat.id}>
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">{cat.icon}</span>
                  <h3 className="text-xl font-bold text-app-text">{cat.label}</h3>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                {/* Skill Cards Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {catSkills.map((skill) => {
                    const isHovered = hoveredSkill === skill.name;
                    const IconComp = iconMap[skill.name];

                    return (
                      <div
                        key={skill.name}
                        className={`group relative bg-app-surface rounded-2xl p-5 border transition-all duration-300 cursor-default flex flex-col items-center text-center gap-3 ${isHovered ? 'scale-[1.05] -translate-y-1' : 'hover:scale-[1.02]'
                          }`}
                        style={{
                          borderColor: isHovered ? skill.color : 'rgba(255,255,255,0.05)',
                          boxShadow: isHovered ? `0 8px 30px -8px ${skill.color}50` : 'none',
                        }}
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        {/* Glow bg */}
                        {isHovered && (
                          <div
                            className="absolute inset-0 rounded-2xl opacity-10 pointer-events-none"
                            style={{ backgroundColor: skill.color }}
                          />
                        )}

                        {/* Icon */}
                        <div
                          className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center bg-app-bg border border-white/5 transition-all duration-300"
                          style={{ color: isHovered ? skill.color : '#888' }}
                        >
                          {IconComp ? <IconComp size={24} /> : <Zap size={24} />}
                        </div>

                        {/* Name */}
                        <span className="relative z-10 text-sm font-bold text-gray-200">{skill.name}</span>

                        {/* Circular Progress Ring */}
                        <div className="relative z-10 w-14 h-14">
                          <svg viewBox="0 0 44 44" className="w-full h-full -rotate-90">
                            <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                            <circle
                              cx="22" cy="22" r="18"
                              fill="none"
                              stroke={isHovered ? skill.color : 'rgba(255,255,255,0.15)'}
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeDasharray={`${2 * Math.PI * 18}`}
                              strokeDashoffset={mounted ? `${2 * Math.PI * 18 * (1 - skill.level / 100)}` : `${2 * Math.PI * 18}`}
                              className="transition-all duration-1000 ease-out"
                            />
                          </svg>
                          <span
                            className="absolute inset-0 flex items-center justify-center text-xs font-bold font-mono transition-colors duration-300"
                            style={{ color: isHovered ? skill.color : '#888' }}
                          >
                            {skill.level}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-20 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 px-6 py-3 text-app-muted cursor-default">
            <GitBranch size={18} />
            <span className="font-medium">{t('learning')}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;