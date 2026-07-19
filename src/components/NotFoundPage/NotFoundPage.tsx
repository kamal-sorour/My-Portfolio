import React from 'react';
import { ArrowLeft, Home, Search } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';



const NotFoundPage = async () => {
  const t = await getTranslations("notFound");

  return (
    <div className={`relative h-screen flex flex-col bg-app-bg text-app-text overflow-hidden`}>
      <main
        className="flex-1 relative z-10 px-4 pt-24 pb-8 overflow-auto"
      >
        <div className="max-w-2xl mx-auto text-center">

          {/* رسالة الخطأ */}
          <div className="mb-8">
            <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-linear-to-r from-red-400 to-orange-400 mb-4">
              404
            </h1>
            <h2 className="text-4xl font-bold text-app-text mb-4">
              {t("title")}
            </h2>
            <p className="text-xl text-app-muted leading-relaxed mb-8">
              {t("description")}
            </p>
          </div>

          {/* أزرار التحكم */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={"/"}
              className="group bg-linear-to-r from-primary to-emerald-400 text-black font-bold text-lg py-4 px-8 rounded-lg hover:from-primary/80 hover:to-emerald-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-primary/25 flex items-center justify-center space-x-3"
            >
              <Home size={24} className="group-hover:scale-110 transition-transform" />
              <span>{t("backHome")}</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFoundPage;