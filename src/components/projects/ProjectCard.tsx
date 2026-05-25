import { Project, Lang } from '@/lib/types';
import { localize } from '@/lib/data';
import { getLabels } from '@/lib/i18n';
import TechBadge from '@/components/shared/TechBadge';

interface ProjectCardProps {
  project: Project;
  lang: Lang;
}

export default function ProjectCard({ project, lang }: ProjectCardProps) {
  const title = localize(project, 'title', lang);
  const description = localize(project, 'description', lang);
  const contributions = (project as unknown as Record<string, unknown>)[`contributions_${lang}`] as string[] | undefined;
  const outcomes = (project as unknown as Record<string, unknown>)[`outcomes_${lang}`] as string[] | undefined;
  const labels = getLabels(lang);

  // Section labels
  const contributionsLabel = lang === 'fr' ? 'Contributions clés' : 'Key contributions';

  return (
    <article className="group bg-white rounded-card shadow-card border border-gray-100 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 overflow-hidden">
      {/* Header band with gradient accent */}
      <div className="h-1 bg-gradient-to-r from-primary to-secondary" />

      <div className="p-6 md:p-8">
        {/* Title + meta */}
        <header className="mb-5">
          <h3 className="text-xl font-bold text-gray-900 leading-tight mb-1.5">{title}</h3>
          <p className="text-sm text-primary font-medium">
            {project.company}
            <span className="mx-2 text-gray-300">·</span>
            <span className="text-gray-500 font-normal">{project.period}</span>
          </p>
        </header>

        {/* Description */}
        {description && (
          <div className="mb-6 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {description.trim()}
          </div>
        )}

        {/* Two-column layout for Contributions and Outcomes on larger screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Contributions */}
          {contributions && contributions.length > 0 && (
            <section>
              <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-3 pb-1.5 border-b border-primary-light">
                {contributionsLabel}
              </h4>
              <ul className="space-y-2.5">
                {contributions.map((item, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-start gap-2.5 leading-snug">
                    <span className="text-primary mt-1.5 text-[6px] shrink-0">●</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Outcomes */}
          {outcomes && outcomes.length > 0 && (
            <section>
              <h4 className="text-xs font-bold uppercase tracking-wider text-secondary mb-3 pb-1.5 border-b border-secondary-light">
                {labels.outcomes}
              </h4>
              <ul className="space-y-2.5">
                {outcomes.map((outcome, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-start gap-2.5 leading-snug">
                    <span className="text-secondary mt-1.5 text-[6px] shrink-0">●</span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Technologies as bottom badges */}
        {project.technologies.length > 0 && (
          <footer className="pt-4 border-t border-gray-100">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
              {lang === 'fr' ? 'Stack technique' : 'Tech stack'}
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <TechBadge key={tech} name={tech} />
              ))}
            </div>
          </footer>
        )}
      </div>
    </article>
  );
}
