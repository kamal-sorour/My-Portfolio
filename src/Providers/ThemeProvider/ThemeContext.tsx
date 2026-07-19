"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { themes } from '../../constants/themes';

type Theme = typeof themes[0];

interface ThemeContextType {
    currentTheme: Theme;
    setTheme: (themeId: string) => void;
    themes: typeof themes;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const hexToRgb = (hex: string) => {
    const normalizedHex = hex.replace('#', '');

    if (!/^[\da-f]{6}$/i.test(normalizedHex)) {
        return '56, 189, 248';
    }

    const value = Number.parseInt(normalizedHex, 16);
    const red = (value >> 16) & 255;
    const green = (value >> 8) & 255;
    const blue = value & 255;

    return `${red}, ${green}, ${blue}`;
};

const applyThemeVariables = (theme: Theme) => {
    const root = document.documentElement;
    const { primary, background, backgroundColor, surface, text, muted } = theme.colors;

    root.style.setProperty('--theme-primary', primary);
    root.style.setProperty('--theme-background', background);
    root.style.setProperty('--theme-background-color', backgroundColor);
    root.style.setProperty('--theme-surface', surface);
    root.style.setProperty('--theme-text', text);
    root.style.setProperty('--theme-muted', muted);
    root.style.setProperty('--primary-rgb', hexToRgb(primary));

    root.setAttribute('data-theme', theme.id);
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);

    useEffect(() => {
        const savedThemeId = localStorage.getItem('theme');
        if (savedThemeId) {
            const foundTheme = themes.find(t => t.id === savedThemeId);
            if (foundTheme) setCurrentTheme(foundTheme);
        }
    }, []);

    useEffect(() => {
        applyThemeVariables(currentTheme);
        localStorage.setItem('theme', currentTheme.id);
    }, [currentTheme]);

    const setTheme = (themeId: string) => {
        const theme = themes.find(t => t.id === themeId);
        if (theme) {
            setCurrentTheme(theme);
        }
    };

    return (
        <ThemeContext.Provider value={{ currentTheme, setTheme, themes }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
