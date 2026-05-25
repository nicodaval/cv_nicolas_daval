import { SoftSkill, Interest, Lang } from '@/lib/types';
import { localize } from '@/lib/data';
import { getLabels } from '@/lib/i18n';

interface InterestsSectionProps {
  softSkills: SoftSkill[];
  interests: Interest[];
  lang: Lang;
}

export default function InterestsSection({ softSkills, interests, lang }: InterestsSectionProps) {
  const labels = getLabels(lang);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Soft Skills */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
          {labels.softSkills}
        </h3>
        <ul className="space-y-2">
          {softSkills.map((skill, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-primary mt-1.5 text-[8px]">●</span>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {localize(skill, 'name', lang)}
                </p>
                <p className="text-xs text-gray-500">
                  {localize(skill, 'detail', lang)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Interests */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
          {labels.interests}
        </h3>
        <ul className="space-y-2">
          {interests.map((interest, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-primary mt-1.5 text-[8px]">●</span>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {localize(interest, 'name', lang)}
                </p>
                <p className="text-xs text-gray-500">
                  {localize(interest, 'detail', lang)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
