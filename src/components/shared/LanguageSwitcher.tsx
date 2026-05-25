'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Lang } from '@/lib/types';

interface LanguageSwitcherProps {
  lang: Lang;
}

export default function LanguageSwitcher({ lang }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  function switchLang(targetLang: Lang) {
    if (targetLang === lang) return;

    // pathname from usePathname() already excludes basePath in Next.js
    // Replace /fr/ or /en/ at the start with the target language
    const newPath = pathname.replace(/^\/(fr|en)/, `/${targetLang}`);
    router.push(newPath);
  }

  return (
    <div className="flex items-center gap-1 text-sm">
      <button
        onClick={() => switchLang('fr')}
        className={`px-1.5 py-0.5 rounded transition-all ${
          lang === 'fr' ? 'font-bold text-white' : 'text-white/60 hover:text-white/80'
        }`}
      >
        FR
      </button>
      <span className="text-white/40">|</span>
      <button
        onClick={() => switchLang('en')}
        className={`px-1.5 py-0.5 rounded transition-all ${
          lang === 'en' ? 'font-bold text-white' : 'text-white/60 hover:text-white/80'
        }`}
      >
        EN
      </button>
    </div>
  );
}
