import { Metadata } from 'next';
import { Lang } from '@/lib/types';
import { getProfile, getExperiences, getSkills, getEducation, getInterests } from '@/lib/data';
import { getLabels } from '@/lib/i18n';
import Timeline from '@/components/cv/Timeline';
import SkillCategory from '@/components/cv/SkillCategory';
import EducationCard from '@/components/cv/EducationCard';
import InterestsSection from '@/components/cv/InterestsSection';
import PdfDownloadButton from '@/components/shared/PdfDownloadButton';
import TOCNavigation from '@/components/layout/TOCNavigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const profile = getProfile();

  const title = lang === 'fr'
    ? `CV — ${profile.name} | ${profile.title}`
    : `Resume — ${profile.name} | ${profile.title}`;
  const description = lang === 'fr'
    ? 'CV détaillé de Nicolas DAVAL : parcours professionnel, compétences techniques, formation et certifications.'
    : 'Detailed resume of Nicolas DAVAL: career history, technical skills, education and certifications.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'profile',
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
    },
  };
}

export default async function CvPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const typedLang = lang as Lang;

  const profile = getProfile();
  const experiences = getExperiences();
  const skills = getSkills();
  const { diplomas, training } = getEducation();
  const { softSkills, interests } = getInterests();
  const labels = getLabels(typedLang);

  const tocSections = [
    { id: 'experience', label: labels.experience },
    { id: 'skills', label: labels.skills },
    { id: 'education', label: labels.education },
    { id: 'training', label: labels.training },
    { id: 'softSkills', label: labels.softSkills },
    { id: 'interests', label: labels.interests },
  ];

  return (
    <>
      <TOCNavigation sections={tocSections} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:ml-56">
        {/* Page header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">{profile.name}</h1>
          <p className="text-lg text-primary mb-4">{profile.title}</p>
          <PdfDownloadButton lang={typedLang} />
        </div>

        {/* Experience */}
        <section id="experience" className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{labels.experience}</h2>
          <Timeline experiences={experiences} lang={typedLang} />
        </section>

        {/* Skills */}
        <section id="skills" className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{labels.skills}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map((category, i) => (
              <SkillCategory key={i} category={category} lang={typedLang} />
            ))}
          </div>
        </section>

        {/* Education */}
        <section id="education" className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{labels.education}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {diplomas.map((diploma, i) => (
              <EducationCard key={i} item={diploma} lang={typedLang} type="diploma" />
            ))}
          </div>
        </section>

        {/* Training */}
        <section id="training" className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{labels.training}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {training.map((item, i) => (
              <EducationCard key={i} item={item} lang={typedLang} type="training" />
            ))}
          </div>
        </section>

        {/* Soft Skills */}
        <section id="softSkills" className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{labels.softSkills}</h2>
          <InterestsSection softSkills={softSkills} interests={[]} lang={typedLang} />
        </section>

        {/* Interests */}
        <section id="interests" className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{labels.interests}</h2>
          <InterestsSection softSkills={[]} interests={interests} lang={typedLang} />
        </section>
      </div>
    </>
  );
}
