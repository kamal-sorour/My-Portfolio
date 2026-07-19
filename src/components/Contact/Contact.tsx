"use client";

import React, { useState } from 'react';
import { Mail, Send, CheckCircle, AlertCircle, Loader2, DoorOpen, Sparkles, MailIcon, Code, Code2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { EXTERNAL_LINKS } from '@/constants/links';

// الأنواع (Types) إذا لم تكن مستوردة
interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const Contact = () => {
  const t = useTranslations('contact');
  const [formData, setFormData] = useState<ContactFormData>({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        // إرجاع الحالة للطبيعي بعد 5 ثواني
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status !== 'idle') setStatus('idle');
  };

  // أيقونات الـ SVG الأصلية للبراندات
  const socialLinks = [
    {
      name: 'GitHub', // لا نترجم الأسماء التجارية
      icon: () => (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
      url: EXTERNAL_LINKS.github,
      handle: '@kamal-sorour',
      hoverColor: 'group-hover:text-white',
    },
    {
      name: 'LinkedIn',
      icon: () => (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      url: EXTERNAL_LINKS.linkedin,
      handle: t("clickToConnect"), // يمكن استخدام الترجمة هنا
      hoverColor: 'group-hover:text-[#1877F2]',
    },
    {
      name: 'WhatsApp',
      icon: () => (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
        </svg>
      ),
      url: EXTERNAL_LINKS.whatsapp, // استبدل بـ EXTERNAL_LINKS.whatsapp إذا توفر
      handle: t("clickToConnect"),
      hoverColor: 'group-hover:text-[#25D366]',
    }
  ];

  return (
    <section
      className="min-h-screen py-20 px-4 bg-app-bg text-app-text relative overflow-hidden"
      id="contact">
      {/* Background Decor */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <MailIcon className="text-primary animate-float" size={72} />
              <div className="absolute -top-2 -right-2">
                <Code2 className="text-yellow-400 animate-pulse" size={24} />
              </div>
            </div>
          </div>
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-primary via-purple-400 to-primary mb-4 animate-gradient">
            {t("title")}
          </h2>
          <p className="text-xl text-app-muted max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">

          {/* Left Column: Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-app-surface/60 backdrop-blur-xl p-8 rounded-2xl border border-white/5 hover:border-primary/30 transition-colors duration-500 shadow-xl shadow-black/10">
              <h3 className="text-2xl font-bold text-app-text mb-8 flex items-center gap-3">
                <span className="w-1 h-8 bg-primary rounded-full"></span>
                {t("getInTouch")}
              </h3>

              <div className="space-y-4">
                <a 
                  href={EXTERNAL_LINKS.email} 
                  aria-label={`Send email to ${EXTERNAL_LINKS.emailAddress}`}
                  className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 group border border-transparent hover:border-white/10 cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(var(--primary-rgb),0.1)]">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-app-muted mb-1">Email</div>
                    <div className="font-medium text-app-text group-hover:text-primary transition-colors">{EXTERNAL_LINKS.emailAddress}</div>
                  </div>
                </a>

                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit Kamal's ${social.name} profile`}
                    className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 group border border-transparent hover:border-white/10 cursor-pointer"
                  >
                    <div className={`w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-all duration-300 shadow-[0_0_15px_rgba(var(--primary-rgb),0.1)] ${social.hoverColor} group-hover:scale-110 shadow-inner`}>
                      <social.icon />
                    </div>
                    <div>
                      <div className="text-sm text-app-muted mb-1">{social.name}</div>
                      <div className="font-medium text-app-text transition-colors">{social.handle}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-app-surface/60 backdrop-blur-xl p-8 md:p-10 rounded-2xl border border-white/5 hover:border-primary/30 transition-colors duration-500 shadow-xl shadow-black/10 relative overflow-hidden">

              {/* Form Status Overlays/Toasts */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary to-purple-500 transition-all duration-1000 ${status === 'loading' ? 'opacity-100 animate-pulse' : 'opacity-0'}`}></div>

              <h3 className="text-2xl font-bold text-app-text mb-8">{t("sendMessage")}</h3>

              {status === 'success' && (
                <div className="mb-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3 animate-fade-in shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                  <CheckCircle className="text-emerald-400 shrink-0" size={24} />
                  <p className="text-emerald-300 font-medium">{t("successMessage")}</p>
                </div>
              )}

              {status === 'error' && (
                <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 animate-fade-in">
                  <AlertCircle className="text-red-400 shrink-0" size={24} />
                  <p className="text-red-300 font-medium">{t("errorMessage")}</p>
                </div>
              )}

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-app-muted ml-1">
                      {t("name")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 bg-app-bg/50 text-app-text border border-white/10 rounded-xl focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600"
                      placeholder={t("namePlaceholder")}
                      required
                      aria-required="true"
                      disabled={status === 'loading'}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-app-muted ml-1">
                      {t("email")}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 bg-app-bg/50 text-app-text border border-white/10 rounded-xl focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600"
                      placeholder={t("emailPlaceholder")}
                      required
                      aria-required="true"
                      disabled={status === 'loading'}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-app-muted ml-1">
                    {t("message")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3.5 bg-app-bg/50 text-app-text border border-white/10 rounded-xl focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all resize-none placeholder:text-gray-600"
                    placeholder={t("messagePlaceholder")}
                    required
                    aria-required="true"
                    disabled={status === 'loading'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-linear-to-r from-primary to-purple-600 text-white font-bold py-4 px-8 rounded-xl hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.5)]"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 size={22} className="animate-spin" />
                      <span>{t("sending")}</span>
                    </>
                  ) : (
                    <>
                      <Send size={22} className="group-hover:-translate-y-1 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-scale-x-100 transition-transform" />
                      <span>{t("send")}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;