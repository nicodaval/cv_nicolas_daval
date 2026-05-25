import { Metadata } from 'next';
import { Lang } from '@/lib/types';
import { getProfile } from '@/lib/data';
import { getLabels } from '@/lib/i18n';
import HeroSection from '@/components/landing/HeroSection';
import Link from 'next/link';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const profile = getProfile();

  const title = lang === 'fr'
    ? `${profile.name} — ${profile.title}`
    : `${profile.name} — ${profile.title}`;
  const description = lang === 'fr'
    ? 'Architecte Data et Tech Lead avec plus de 22 ans d\'expérience. Spécialisé en plateformes data cloud, architecture logicielle et pilotage d\'équipes internationales.'
    : 'Data Architect and Tech Lead with 22+ years of experience. Specialized in cloud data platforms, software architecture and international team leadership.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
    },
  };
}

export default async function LangPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const typedLang = lang as Lang;
  const profile = getProfile();
  const labels = getLabels(typedLang);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <HeroSection profile={profile} lang={typedLang} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-16">
        <Link
          href={`/cv_nicolas_daval/${lang}/cv/`}
          className="group block p-6 rounded-card bg-white shadow-card hover:shadow-card-hover transition-all duration-200 border border-gray-100"
        >
          <h2 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors mb-2">
            {labels.viewCv}
          </h2>
          <p className="text-sm text-gray-500">
            {typedLang === 'fr'
              ? 'Parcours professionnel, compétences et formation'
              : 'Career history, skills and education'}
          </p>
        </Link>

        <Link
          href={`/cv_nicolas_daval/${lang}/projects/`}
          className="group block p-6 rounded-card bg-white shadow-card hover:shadow-card-hover transition-all duration-200 border border-gray-100"
        >
          <h2 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors mb-2">
            {labels.viewProjects}
          </h2>
          <p className="text-sm text-gray-500">
            {typedLang === 'fr'
              ? 'Projets clés et réalisations techniques'
              : 'Key projects and technical achievements'}
          </p>
        </Link>
      </div>
    </div>
  );
}
