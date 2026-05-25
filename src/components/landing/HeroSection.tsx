import { Profile, Lang } from '@/lib/types';
import { localize } from '@/lib/data';
import PdfDownloadButton from '@/components/shared/PdfDownloadButton';

interface HeroSectionProps {
  profile: Profile;
  lang: Lang;
}

export default function HeroSection({ profile, lang }: HeroSectionProps) {
  const summary = localize(profile, 'summary', lang);

  return (
    <section className="py-16 sm:py-24 text-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
        {profile.name}
      </h1>
      <p className="text-xl text-primary font-medium mb-6">{profile.title}</p>
      <p className="max-w-2xl mx-auto text-gray-600 leading-relaxed mb-8">
        {summary}
      </p>
      <div className="flex items-center justify-center gap-6">
        <a
          href={profile.contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-500 hover:text-primary transition-colors"
        >
          LinkedIn
        </a>
        <PdfDownloadButton lang={lang} />
      </div>
    </section>
  );
}
