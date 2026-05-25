import { Experience, Lang } from '@/lib/types';
import { localize } from '@/lib/data';
import TechBadge from '@/components/shared/TechBadge';

interface TimelineItemProps {
  experience: Experience;
  lang: Lang;
}

export default function TimelineItem({ experience, lang }: TimelineItemProps) {
  const title = localize(experience, 'title', lang);
  const descriptions = (experience as unknown as Record<string, unknown>)[`description_${lang}`] as string[];

  return (
    <div className="relative pl-8 pb-10 group">
      {/* Marker dot */}
      <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-primary border-2 border-white shadow-sm group-hover:scale-125 group-hover:shadow-[0_0_8px_rgba(26,115,232,0.4)] transition-all duration-200" />

      {/* Content card */}
      <div className="bg-white rounded-card p-5 shadow-card group-hover:shadow-card-hover group-hover:translate-x-1 transition-all duration-200 border border-gray-100">
        {/* Date badge */}
        <span className="inline-block text-xs font-medium bg-primary text-white px-2.5 py-0.5 rounded-full mb-3">
          {experience.start} — {experience.end}
        </span>

        <h3 className="text-base font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-500 mb-3">{experience.company} · {experience.location}</p>

        {descriptions && descriptions.length > 0 && (
          <ul className="space-y-1 mb-3">
            {descriptions.map((desc, i) => (
              <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                <span className="text-primary mt-1.5 text-[6px]">●</span>
                <span>{desc}</span>
              </li>
            ))}
          </ul>
        )}

        {experience.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {experience.technologies.map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
