"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { ExternalLink, Eye, DoorOpen, Sparkles, Search, Layers } from "lucide-react";
import { useTranslations } from "next-intl";
import ProjectFilter, { FilterOptions } from "../ProjectFilter/ProjectFilter";
import ProjectModal, { Project } from "../ProjectModal/ProjectModal";
import { PROJECT_DETAILS, DEFAULT_PROJECT_IMAGE, getProjectImages } from "@/constants/links";

const Projects = () => {
  const t = useTranslations("projects");

  const projectsItems = t.raw("items") as {
    title: string;
    description: string;
    type: string;
    complexity: string;
  }[];

  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🌟 نقل الـ State للأب عشان نتحكم في الفلتر والبحث من مكان واحد (Single Source of Truth)
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({
    technology: [],
    type: [],
    complexity: []
  });
  const [searchTerm, setSearchTerm] = useState("");

  // دمج الترجمة مع الروابط والصور (ديناميكي)
  useEffect(() => {
    if (projectsItems && projectsItems.length > 0) {
      const formattedProjects: Project[] = projectsItems.map((item, index) => {
        const staticData = PROJECT_DETAILS[index % PROJECT_DETAILS.length];
        return {
          id: index + 1,
          title: item.title,
          description: item.description,
          type: item.type,
          complexity: item.complexity,
          images: staticData ? getProjectImages(staticData) : [DEFAULT_PROJECT_IMAGE],
          technologies: staticData?.technologies || [],
          liveUrl: staticData?.liveUrl,
          githubUrl: staticData?.githubUrl,
        };
      });
      setProjects(formattedProjects);
    }
  }, [t, projectsItems]);

  // 🌟 فلترة ذكية ولحظية باستخدام useMemo
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // 1. فحص الفلاتر
      const matchTech = activeFilters.technology.length === 0 || activeFilters.technology.some(tech => project.technologies.includes(tech));
      const matchType = activeFilters.type.length === 0 || activeFilters.type.includes(project.type);
      const matchComp = activeFilters.complexity.length === 0 || activeFilters.complexity.includes(project.complexity);
      
      // 2. فحص البحث
      const matchSearch = !searchTerm || 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchTech && matchType && matchComp && matchSearch;
    });
  }, [projects, activeFilters, searchTerm]);

  // دالة مسح كل الفلاتر
  const clearAllFilters = () => {
    setActiveFilters({ technology: [], type: [], complexity: [] });
    setSearchTerm("");
  };

  return (
    <section className="min-h-screen py-20 px-4 bg-app-bg text-app-text relative overflow-hidden" id="projects">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <DoorOpen className="text-6xl text-purple-400 animate-float" size={80} />
              <div className="absolute -top-2 -right-2">
                <Sparkles className="text-yellow-400 animate-pulse" size={24} />
              </div>
            </div>
          </div>
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-primary to-purple-400 mb-4 animate-gradient">
            {t("title")}
          </h2>
          <p className="text-xl text-app-muted max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Filters (Controlled Component) */}
        <ProjectFilter
          activeFilters={activeFilters}
          searchTerm={searchTerm}
          onFilterChange={setActiveFilters}
          onSearchChange={setSearchTerm}
          onClearAll={clearAllFilters}
        />

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="group relative bg-app-surface/60 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-[0_10px_40px_rgba(var(--primary-rgb),0.2)] flex flex-col h-full transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
                role="button"
                tabIndex={0}
                aria-label={t("viewDetails") ? `${t("viewDetails")}: ${project.title}` : `View details of ${project.title}`}
                onClick={() => {
                  setSelectedProject(project);
                  setIsModalOpen(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedProject(project);
                    setIsModalOpen(true);
                  }
                }}
              >
                {/* 🌟 اللمسة الإبداعية: Card Image with Glow */}
                <div className="relative h-56 overflow-hidden bg-black/40">
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  />
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-linear-to-t from-app-surface via-app-surface/50 to-transparent opacity-100 group-hover:opacity-60 transition-opacity duration-500" />
                  
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/20 backdrop-blur-[2px]">
                    <div className="bg-primary px-6 py-2.5 rounded-full text-white font-medium flex items-center gap-2 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 shadow-[0_0_20px_rgba(var(--primary-rgb),0.5)]">
                      <Eye size={18} />
                      {t("viewDetails") || "View Details"}
                    </div>
                  </div>
                  
                  {/* Floating Tech Badge */}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full flex items-center gap-2 transform translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                    <Layers size={14} className="text-primary" />
                    <span className="text-xs font-medium text-white">{project.type}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col grow relative z-10">
                  <div className="flex justify-between items-start mb-3 gap-2">
                    <h3 className="text-xl font-bold text-app-text group-hover:text-primary transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-app-muted text-sm mb-6 leading-relaxed line-clamp-3 grow">
                    {project.description}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-primary/5 text-primary/80 border border-primary/20 group-hover:border-primary/40 transition-colors text-xs rounded-lg font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2.5 py-1 bg-white/5 text-gray-400 text-xs rounded-lg border border-white/5">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            // 🌟 Empty State with fixed Clear Button
            <div className="col-span-full flex flex-col items-center justify-center py-20 px-4 text-center bg-app-surface/30 rounded-3xl border border-white/5 border-dashed animate-fade-in">
              <div className="p-4 bg-white/5 rounded-full mb-4">
                <Search className="text-app-muted" size={40} />
              </div>
              <h3 className="text-xl font-bold text-app-text mb-2">
                {t("noResults")}
              </h3>
              <p className="text-app-muted max-w-md">
                {t("noResultsDesc") || "We couldn't find any projects matching your current filters."}
              </p>
              <button
                onClick={clearAllFilters}
                className="mt-6 px-8 py-3 bg-primary/10 text-primary border border-primary/20 rounded-xl font-bold hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"
              >
                {t("clearAll") || "Clear Filters"}
              </button>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <footer className="mt-20 text-center">
          <div className="inline-flex items-center space-x-3 px-6 py-3 bg-app text-app-muted cursor-default">
            <ExternalLink size={20} />
            <span className="font-medium tracking-wide">{t("moreComing")}</span>
          </div>
        </footer>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default Projects;