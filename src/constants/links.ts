// ═══════════════════════════════════════════════════════════════
// Centralized Links & URLs — Single Source of Truth
// All URLs used anywhere in the project should reference this file
// ═══════════════════════════════════════════════════════════════

// ── Site ─────────────────────────────────────────────────────
export const SITE_URL = 'https://kamal.is-a.dev' as const;

// ── External / Social Links ─────────────────────────────────
export const EXTERNAL_LINKS = {
  // Social Media
  facebook: 'https://www.facebook.com/profile.php?id=100027348611399',
  whatsapp: 'https://wa.me/201011810767',
  github: 'https://github.com/kamal-sorour',
  linkedin: 'https://linkedin.com/in/kamal-sorour',

  // Contact
  email: 'mailto:kamalsorour0@gmail.com',
  emailAddress: 'kamalsorour0@gmail.com',

  // Site
  domain: SITE_URL,

  // External Resources
  pexels: 'https://images.pexels.com',
  googleFonts: 'https://fonts.googleapis.com',

  // Flag CDN (for language switcher)
  flagUs: 'https://flagcdn.com/w40/us.png',
  flagEg: 'https://flagcdn.com/w40/eg.png',

  // Resume PDF
  resumePdf: '/Kamal_Mohamed_Sorour.pdf',
} as const;

// ── Project Types ───────────────────────────────────────────
export interface ProjectDetail {
  folder: string;          // اسم الفولدر داخل public/projects/
  imageCount: number;      // عدد الصور في الفولدر (0 = يستخدم default.png)
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
}

// ── Default Project Fallback Image ──────────────────────────
export const DEFAULT_PROJECT_IMAGE = '/projects/default.png';

// ── Dynamic Image Path Generator ────────────────────────────
// تولد مسارات الصور تلقائياً بناءً على اسم الفولدر وعدد الصور
// النمط: image.png, image (1).png, image (2).png, ...
export function getProjectImages(detail: ProjectDetail): string[] {
  if (detail.imageCount <= 0) {
    return [DEFAULT_PROJECT_IMAGE];
  }

  const images: string[] = [];
  for (let i = 0; i < detail.imageCount; i++) {
    const fileName = i === 0 ? 'image.png' : `image (${i}).png`;
    images.push(`/projects/${detail.folder}/${fileName}`);
  }
  return images;
}

// ── Project Details ─────────────────────────────────────────
// لإضافة مشروع جديد: أنشئ فولدر باسمه في public/projects/
// وضع الصور بالنمط: image.png, image (1).png, image (2).png
// ثم حدّث imageCount بعدد الصور
export const PROJECT_DETAILS: ProjectDetail[] = [
  {
    folder: "Yassify",
    imageCount: 3,
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui", "NextAuth"],
    liveUrl: "https://yassify.netlify.app/",
    githubUrl: "https://github.com/kamal-sorour/e-commerce",
  },
  {
    folder: "Yass",
    imageCount: 2,
    technologies: ["React", "Vite", "Tailwind CSS", "TanStack Query", "Axios", "Framer Motion"],
    liveUrl: "https://yass-route.netlify.app/",
    githubUrl: "https://github.com/kamal-sorour/yass-social",
  },
  {
    folder: "Portfolio",
    imageCount: 2,
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "next-intl"],
    liveUrl: "https://kamal.is-a.dev/",
    githubUrl: "https://github.com/kamal-sorour/My-Portfolio",
  },
  {
    folder: "Adasa",
    imageCount: 3,
    technologies: ["React 19", "Vite", "React Router", "Bootstrap 5", "FontAwesome"],
    liveUrl: "https://adasaa.netlify.app/",
    githubUrl: "https://github.com/kamal-sorour/adasa",
  },
  {
    folder: "NutriPlan",
    imageCount: 3,
    technologies: ["JavaScript (ES6)", "Tailwind CSS", "HTML5", "TheMealDB API", "OpenFoodFacts API"],
    liveUrl: "https://kamal-sorour.github.io/NutriPlan/",
    githubUrl: "https://github.com/kamal-sorour/NutriPlan",
  },
  {
    folder: "QuizMaster",
    imageCount: 1,
    technologies: ["HTML5", "CSS3", "JavaScript", "Open Trivia DB API", "Web Audio API"],
    liveUrl: "https://kamal-sorour.github.io/quiz-app/",
    githubUrl: "https://github.com/kamal-sorour/quiz-app",
  },
];
