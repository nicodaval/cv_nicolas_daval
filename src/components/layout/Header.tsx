'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Lang } from '@/lib/types';
import { getLabels } from '@/lib/i18n';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';

interface HeaderProps {
  lang: Lang;
}

export default function Header({ lang }: HeaderProps) {
  const labels = getLabels(lang);
  const pathname = usePathname();

  const cvHref = `/${lang}/cv/`;
  const projectsHref = `/${lang}/projects/`;

  const isCvActive = pathname.includes(`/${lang}/cv`);
  const isProjectsActive = pathname.includes(`/${lang}/projects`);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
        <Link
          href={`/${lang}/`}
          className="text-lg font-bold tracking-tight hover:opacity-90 transition-opacity"
        >
          Nicolas DAVAL
        </Link>

        <nav aria-label="Main navigation" className="flex items-center gap-6">
          <Link
            href={cvHref}
            aria-current={isCvActive ? 'page' : undefined}
            className={`text-sm font-medium hover:opacity-80 transition-opacity ${isCvActive ? 'underline underline-offset-4' : ''}`}
          >
            {labels.cv}
          </Link>
          <Link
            href={projectsHref}
            aria-current={isProjectsActive ? 'page' : undefined}
            className={`text-sm font-medium hover:opacity-80 transition-opacity ${isProjectsActive ? 'underline underline-offset-4' : ''}`}
          >
            {labels.projects}
          </Link>
          <LanguageSwitcher lang={lang} />
        </nav>
      </div>
    </header>
  );
}
