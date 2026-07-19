"use client";

import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

export interface FilterOptions {
  technology: string[];
  type: string[];
  complexity: string[];
}

interface ProjectFilterProps {
  activeFilters: FilterOptions; // تم إضافتها
  searchTerm: string;           // تم إضافتها
  onFilterChange: (filters: FilterOptions) => void;
  onSearchChange: (search: string) => void;
  onClearAll: () => void;       // تم إضافتها
}

const ProjectFilter: React.FC<ProjectFilterProps> = ({
  activeFilters,
  searchTerm,
  onFilterChange,
  onSearchChange,
  onClearAll
}) => {
  const t = useTranslations('projects');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterToggle = (category: keyof FilterOptions, value: string) => {
    const newFilters = { ...activeFilters };
    const categoryFilters = newFilters[category];

    if (categoryFilters.includes(value)) {
      newFilters[category] = categoryFilters.filter(item => item !== value);
    } else {
      newFilters[category] = [...categoryFilters, value];
    }

    onFilterChange(newFilters);
  };

  const getTotalActiveFilters = () => {
    return activeFilters.technology.length + activeFilters.type.length + activeFilters.complexity.length;
  };

  const technologies = t.raw('technologies') || {};
  const types = t.raw('types') || {};
  const complexities = t.raw('complexities') || {};

  const FilterSection = ({ title, category, options }: { title: string, category: keyof FilterOptions, options: Record<string, string> }) => (
    <div className="mb-6">
      <h4 className="text-sm font-semibold text-app-muted mb-3 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-primary/50"></span>
        {title}
      </h4>
      <div className="flex flex-wrap gap-2">
        {Object.entries(options).map(([key, label]) => {
          const isActive = activeFilters[category].includes(label);
          return (
            <button
              key={key}
              onClick={() => handleFilterToggle(category, label)}
              className={`px-4 py-2 text-sm rounded-xl border transition-all duration-300 font-medium ${isActive
                ? 'bg-linear-to-r from-primary to-purple-600 text-white border-transparent shadow-lg shadow-primary/20'
                : 'bg-app-bg text-app-text border-white/10 hover:border-primary/50 hover:bg-primary/5'
                }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="mb-12 relative z-20">
      <div className="flex flex-col md:flex-row gap-4 items-center">

        {/* Search Bar */}
        <div className="flex-1 w-full relative group">
          <Search
            className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors ${isRtl ? 'right-4' : 'left-4'
              }`}
            size={20}
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t('search')}
            aria-label={t('search')}
            className={`w-full bg-app-surface/60 backdrop-blur-md text-app-text border border-white/10 rounded-2xl py-4 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm ${isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'
              }`}
          />
        </div>

        {/* Filter Toggle Button */}
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          aria-expanded={isFilterOpen}
          aria-controls="filter-panel"
          aria-label={getTotalActiveFilters() > 0 ? `${t('filters')}, ${getTotalActiveFilters()} active` : t('filters')}
          className={`flex items-center gap-2 px-6 py-4 bg-app-surface/60 backdrop-blur-md text-app-text border border-white/10 rounded-2xl transition-all duration-300 w-full md:w-auto justify-center ${isFilterOpen ? 'border-primary/50 text-primary bg-primary/5' : 'hover:border-primary/30'
            }`}
        >
          <Filter size={18} />
          <span className="font-medium">{t('filters')}</span>
          {getTotalActiveFilters() > 0 && (
            <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full animate-bounce-slow">
              {getTotalActiveFilters()}
            </span>
          )}
        </button>
      </div>

      {/* Active Filters Tags */}
      {getTotalActiveFilters() > 0 && (
        <div className="flex flex-wrap items-center gap-2 mt-4 animate-fade-in">
          {[...activeFilters.technology, ...activeFilters.type, ...activeFilters.complexity].map((filter, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 text-sm rounded-lg shadow-sm"
            >
              <span>{filter}</span>
              <button
                onClick={() => {
                  Object.keys(activeFilters).forEach(category => {
                    if (activeFilters[category as keyof FilterOptions].includes(filter)) {
                      handleFilterToggle(category as keyof FilterOptions, filter);
                    }
                  });
                }}
                aria-label={`Remove filter ${filter}`}
                className="hover:bg-primary/20 hover:text-white rounded-md p-0.5 transition-colors"
              >
                <X size={14} />
              </button>
            </span>
          ))}
          <button
            onClick={onClearAll} // 🌟 استخدام الـ Prop من الأب
            className="text-app-muted hover:text-red-400 text-sm font-bold transition-colors px-3 py-1.5"
          >
            {t('clearAll')}
          </button>
        </div>
      )}

      {/* Expandable Filter Panel */}
      <div
        id="filter-panel"
        className={`grid transition-all duration-500 ease-in-out ${isFilterOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <div className="bg-app-surface/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl shadow-black/20">
            {Object.keys(types).length > 0 && (
              <FilterSection title={t('projectType')} category="type" options={types} />
            )}
            {Object.keys(complexities).length > 0 && (
              <FilterSection title={t('complexity')} category="complexity" options={complexities} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectFilter;