import { Metadata } from 'next';
import { Lang } from '@/lib/types';
import { getProjects, localize } from '@/lib/data';
import { getLabels } from '@/lib/i18n';
import ProjectCard from '@/components/projects/ProjectCard';
import TOCNavigation from '@/components/layout/TOCNavigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  const title = lang === 'fr'
    ? 'Projets Clés — Nicolas DAVAL'
    : 'Key Projects — Nicolas DAVAL';
  const description = lang === 'fr'
    ? 'Projets techniques majeurs réalisés par Nicolas DAVAL : migration data, plateformes cloud, architectures event-driven.'
    : 'Major technical projects by Nicolas DAVAL: data migration, cloud platforms, event-driven architectures.';

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

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const typedLang = lang as Lang;

  const projects = getProjects();
  const labels = getLabels(typedLang);

  const tocSections = projects.map((project, i) => ({
    id: `project-${i}`,
    label: localize(project, 'title', typedLang),
  }));

  return (
    <>
      <TOCNavigation sections={tocSections} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:ml-56">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{labels.projects}</h1>

        <div className="space-y-6">
          {projects.map((project, i) => (
            <section key={i} id={`project-${i}`}>
              <ProjectCard project={project} lang={typedLang} />
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
