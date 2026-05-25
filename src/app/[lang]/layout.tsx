import { Lang } from '@/lib/types';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export function generateStaticParams() {
  return [{ lang: 'fr' }, { lang: 'en' }];
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <div className="flex flex-col min-h-screen">
      <Header lang={lang as Lang} />
      <main className="flex-1 pt-14">{children}</main>
      <Footer />
    </div>
  );
}
