"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { X, ExternalLink, Code, ChevronRight, ChevronLeft, Activity, Calendar, Globe } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

// تصدير الإنترفيس لاستخدامه في Projects
export interface Project {
  id: number;
  title: string;
  description: string;
  images: string[];
  technologies: string[];
  type: string;
  complexity: string;
  liveUrl?: string;
  githubUrl?: string;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const t = useTranslations('projects');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCurrentImgIndex(0); // إعادة التعيين عند فتح المودال
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  const nextImage = () => setCurrentImgIndex((prev) => (prev + 1) % project.images.length);
  const prevImage = () => setCurrentImgIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl bg-app-surface/95 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/10 transform transition-all duration-300 flex flex-col max-h-[90vh] animate-fade-in-up">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 bg-black/50 hover:bg-primary rounded-full text-white backdrop-blur-md transition-all duration-300 hover:rotate-90 group"
          aria-label="Close modal"
        >
          <X size={20} className="group-hover:scale-110 transition-transform" />
        </button>

        {/* 🌟 Image Carousel Section */}
        <div className="relative h-64 md:h-96 w-full bg-black/50 shrink-0 group">
          <Image
            src={project.images[currentImgIndex]}
            alt={`${project.title} screenshot ${currentImgIndex + 1}`}
            fill
            className="object-cover object-top transition-opacity duration-500"
            sizes="(max-width: 768px) 100vw, 1024px"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-app-surface via-app-surface/20 to-transparent" />

          {/* Carousel Controls (تظهر لو فيه أكتر من صورة) */}
          {project.images.length > 1 && (
            <>
              <button onClick={isRtl ? nextImage : prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-primary/80 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                <ChevronLeft size={24} />
              </button>
              <button onClick={isRtl ? prevImage : nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-primary/80 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                <ChevronRight size={24} />
              </button>
              
              {/* Dots Indicator */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {project.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImgIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${currentImgIndex === idx ? 'w-8 bg-primary' : 'w-2 bg-white/50 hover:bg-white'}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-white to-gray-400">
              {project.title}
            </h2>
            <span className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-sm font-medium">
              {project.type}
            </span>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mt-6">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-app-text mb-3 flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-purple-500 rounded-full"></div>
                  {t('description')}
                </h3>
                <p className="text-app-muted leading-relaxed text-lg">
                  {project.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex-1 min-w-50 flex items-center justify-center gap-2 py-3.5 bg-linear-to-r from-primary to-purple-600 text-white rounded-xl font-bold hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)] transition-all transform hover:-translate-y-1">
                    <Globe size={20} />
                    {t('livePreview')}
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex-1 min-w-50 flex items-center justify-center gap-2 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-bold transition-all transform hover:-translate-y-1">
                    {/* SVG أصلي لـ GitHub */}
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    {t('viewCode')}
                  </a>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-app-text mb-3 flex items-center gap-2">
                  <Code size={20} className="text-primary" />
                  {t('technologies')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1.5 bg-app-bg text-app-text border border-white/5 rounded-lg text-sm font-medium hover:border-primary/50 transition-colors cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-5 bg-linear-to-br from-white/5 to-transparent rounded-2xl border border-white/10">
                <h4 className="text-sm font-bold text-app-muted mb-4 uppercase tracking-widest">{t('projectStats')}</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Activity size={18} className="text-yellow-400" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 uppercase tracking-wider">{t('complexity')}</p>
                      <p className="text-sm font-semibold text-app-text">{project.complexity}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;