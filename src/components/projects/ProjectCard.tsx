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
  const outcomes = (project as unknown as Record<string, unknown>)[`outcomes_${lang}`] as string[];
  const labels = getLabels(lang);

  return (
    <div className="group bg-white rounded-card p-6 shadow-card border border-gray-100 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 hover:border-t-2 hover:border-t-primary">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">
            {project.company} · {project.period}
          </p>
        </div>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed mb-4">{description}</p>

      {project.technologies.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.map((tech) => (
            <TechBadge key={tech} name={tech} />
          ))}
        </div>
      )}

      {outcomes && outcomes.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
            {labels.outcomes}
          </h4>
          <ul className="space-y-1">
            {outcomes.map((outcome, i) => (
              <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                <span className="text-primary mt-1.5 text-[6px]">●</span>
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
