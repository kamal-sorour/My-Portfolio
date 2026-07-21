<div align="center">

# 🚀 Kamal Sorour — Portfolio

### A modern, bilingual (🇺🇸 English / 🇪🇬 العربية) developer portfolio built with cutting-edge web technologies

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

[🌐 Live Demo](https://kamal.is-a.dev) · [📧 Contact](mailto:kamalsorour0@gmail.com)

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎨 Design & UI
- **6 Custom Themes** with smooth transitions
- **Dark mode** as default with curated color palettes
- **Glassmorphism** and backdrop blur effects
- **Micro-animations** and hover effects
- **Responsive** design (mobile-first)

</td>
<td width="50%">

### 🌐 Internationalization
- **Bilingual** support (English & Arabic)
- **RTL** layout support for Arabic
- **Locale-aware** routing (`/en`, `/ar`)
- **next-intl** for type-safe translations

</td>
</tr>
<tr>
<td>

### 🤖 Interactive Terminal Bot
- **Code typing** animation on first load
- **Boot sequence** transition effect
- **AI-like** Q&A about the developer
- **Secret commands** (`sudo hire kamal` 😎)

</td>
<td>

### ⚡ Performance & SEO
- **PWA** support with offline fallback
- **Service Worker** with smart caching
- **JSON-LD** structured data
- **Dynamic** sitemap & robots.txt
- **Error boundaries** & loading states

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| **Framework** | Next.js 16, React 19, TypeScript 5 |
| **Styling** | Tailwind CSS 4, CSS Variables (Custom Theming) |
| **i18n** | next-intl 4 (Locale routing + RTL) |
| **Icons** | Lucide React |
| **Email** | Nodemailer (Gmail SMTP) |
| **PWA** | Custom Service Worker, Web App Manifest |
| **Deployment** | Netlify |

---

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── api/contact/route.ts      # Contact form API (rate-limited)
│   ├── [locale]/                 # Locale-based routing
│   │   ├── page.tsx              # Homepage
│   │   ├── resume/page.tsx       # Resume page
│   │   ├── error.tsx             # Error boundary
│   │   ├── loading.tsx           # Loading state
│   │   └── layout.tsx            # Locale layout (Navbar + Footer)
│   ├── layout.tsx                # Root layout (SEO + PWA meta)
│   ├── manifest.ts               # PWA manifest
│   ├── sitemap.ts                # Dynamic sitemap
│   └── robots.ts                 # Robots.txt
│
├── components/                   # UI Components
│   ├── Hero/                     # Landing section + TerminalBot
│   ├── Skills/                   # Skills visualization
│   ├── Projects/                 # Project cards, filters, modal
│   ├── Contact/                  # Contact form
│   ├── Resume/                   # Full resume page
│   ├── ResumePreview/            # Resume preview section
│   ├── Navbar/                   # Navigation + Language switcher
│   ├── Footer/                   # Site footer
│   ├── ThemeSwitcher/            # Theme selector dropdown
│   ├── TerminalBot/              # Interactive terminal chatbot
│   ├── BackToTop/                # Scroll-to-top button
│   └── ServiceWorkerRegistration/
│
├── constants/
│   ├── links.ts                  # All URLs (single source of truth)
│   └── themes.ts                 # Theme definitions (6 themes)
│
├── Providers/
│   ├── Providers/                # Root provider wrapper
│   └── ThemeProvider/            # Theme context + CSS variables
│
├── i18n/
│   └── routing.ts                # Locale config
│
├── proxy.ts                      # Next.js 16 Middleware (i18n routing)
│
├── messages/
│   ├── en.json                   # English translations
│   └── ar.json                   # Arabic translations
│
└── public/
    ├── icons/                    # PWA icons (72px–512px)
    ├── sw.js                     # Service Worker
    └── offline.html              # Offline fallback page
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone https://github.com/kamal-sorour/My-Portfolio.git
cd My-Portfolio

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file with:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
```

> **Note:** For Gmail, you need to generate an [App Password](https://support.google.com/accounts/answer/185833).

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## 🎨 Available Themes

| Theme | Primary Color | Description |
|---|---|---|
| 🌊 **Ocean Blue** | `#38bdf8` | Cool and professional |
| 🌙 **Midnight Gold** | `#fbbf24` | Elegant and premium |
| 🍇 **Royal Purple** | `#a78bfa` | Creative and bold |
| 🌿 **Emerald Green** | `#34d399` | Natural and calm |
| 🌹 **Rose Gold** | `#fb7185` | Warm and inviting |
| 🔥 **Sunset Orange** | `#fb923c` | Energetic and dynamic |

---

## 📱 PWA Support

This portfolio is a **Progressive Web App** with:

- ✅ Installable on mobile and desktop
- ✅ Offline fallback page
- ✅ Smart caching (Cache-first for assets, Network-first for pages)
- ✅ Custom icons for all platforms (iOS, Android, Windows)
- ✅ Splash screen support

---

## 🔒 Security Features

- **Rate Limiting** — Max 5 contact form submissions per IP per hour
- **Input Sanitization** — XSS protection on all form inputs
- **Email Validation** — Regex-based email format validation
- **Content Length Limits** — Name (100 chars), Message (5000 chars)

---

## 📊 SEO & Performance

- **Lighthouse Score:** Optimized for 90+ across all categories
- **Meta Tags:** Open Graph, Twitter Cards, Canonical URLs
- **Structured Data:** JSON-LD (Person schema)
- **Dynamic Sitemap:** Auto-generated for all locales
- **Robots.txt:** Configured for optimal crawling

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is **MIT** licensed.

---

<div align="center">

**Built with ❤️ by [Kamal Sorour](https://kamal.is-a.dev)**

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4

</div>
