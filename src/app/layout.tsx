import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { getProfile, getExperiences, getSkills } from '@/lib/data';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Nicolas DAVAL - Data Architect & Tech Lead',
  description: 'CV de Nicolas DAVAL - Data Architect & Tech Lead avec 22+ ans d\'expérience',
};

function getJsonLd() {
  const profile = getProfile();
  const experiences = getExperiences();
  const skills = getSkills();

  const allSkills = skills.flatMap(cat =>
    cat.skills.map(s => s.name)
  );

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.title,
    address: {
      '@type': 'PostalAddress',
      addressLocality: profile.location,
      addressCountry: 'FR',
    },
    url: 'https://nicodaval.github.io/cv_nicolas_daval/',
    sameAs: [
      profile.contact.linkedin,
    ],
    knowsAbout: allSkills.slice(0, 20),
    hasOccupation: experiences.slice(0, 3).map(exp => ({
      '@type': 'Occupation',
      name: exp.title_en,
      occupationLocation: {
        '@type': 'Country',
        name: 'France',
      },
      description: exp.description_en?.[0] || '',
    })),
    worksFor: {
      '@type': 'Organization',
      name: experiences[0]?.company || 'Stellantis Financial Services',
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = getJsonLd();

  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
