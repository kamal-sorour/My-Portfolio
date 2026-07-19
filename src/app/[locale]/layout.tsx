import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import { routing } from "@/i18n/routing";
import BackToTop from "@/components/BackToTop/BackToTop";
import Footer from "@/components/Footer/Footer";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale}>
      <Navbar />
      <BackToTop />
      {children}
      <Footer />
    </NextIntlClientProvider>
  );
}
