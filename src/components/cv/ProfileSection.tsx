import { Profile, Lang } from '@/lib/types';
import { localize } from '@/lib/data';
import { getLabels } from '@/lib/i18n';
import PdfDownloadButton from '@/components/shared/PdfDownloadButton';

interface ProfileSectionProps {
  profile: Profile;
  lang: Lang;
}

export default function ProfileSection({ profile, lang }: ProfileSectionProps) {
  const labels = getLabels(lang);
  const summary = localize(profile, 'summary', lang);

  return (
    <div className="mb-10 p-6 rounded-card bg-white shadow-card border border-gray-100">
      {/* Name and title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-1">{profile.name}</h1>
      <p className="text-lg text-primary font-medium mb-3">{profile.title}</p>

      {/* Contact info */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600 mb-4">
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {profile.location}
        </span>

        {profile.contact.linkedin && (
          <a
            href={profile.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-primary hover:text-primary-dark transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>
        )}

        <PdfDownloadButton lang={lang} />
      </div>

      {/* Languages */}
      <div className="flex flex-wrap gap-2 mb-4">
        {profile.languages.map((language, i) => (
          <span
            key={i}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-light text-primary-dark"
          >
            {language.name} — {language.level}
          </span>
        ))}
      </div>

      {/* Mobility & Salary */}
      {(profile.mobility || profile.salary) && (
        <div className="flex flex-wrap gap-4 mb-4 p-3 rounded-sm bg-gray-50 border border-gray-100 text-sm">
          {profile.mobility && (
            <div className="flex items-start gap-2">
              <svg className="w-4 h-4 text-primary mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
              </svg>
              <div>
                <span className="font-medium text-gray-700">{profile.mobility.type}</span>
                <span className="text-gray-500"> — {profile.mobility.zones.join(', ')}</span>
              </div>
            </div>
          )}
          {profile.salary && (
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-600">
                <span className="font-medium text-gray-700">{lang === 'fr' ? 'Prétentions' : 'Target'}:</span> {profile.salary.target}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Summary */}
      <p className="text-sm text-gray-600 leading-relaxed">{summary}</p>
    </div>
  );
}
