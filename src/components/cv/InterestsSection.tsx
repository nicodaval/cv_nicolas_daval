import { SoftSkill, Interest, Lang } from '@/lib/types';
import { localize } from '@/lib/data';

interface InterestsSectionProps {
  softSkills?: SoftSkill[];
  interests?: Interest[];
  lang: Lang;
}

export default function InterestsSection({ softSkills, interests, lang }: InterestsSectionProps) {
  return (
    <div className="space-y-3">
      {/* Soft Skills */}
      {softSkills && softSkills.length > 0 && (
        <ul className="space-y-3">
          {softSkills.map((skill, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-primary mt-1.5 text-xs">●</span>
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {localize(skill, 'name', lang)}
                </p>
                <p className="text-sm text-gray-500">
                  {localize(skill, 'detail', lang)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Interests */}
      {interests && interests.length > 0 && (
        <ul className="space-y-3">
          {interests.map((interest, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-primary mt-1.5 text-xs">●</span>
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {localize(interest, 'name', lang)}
                </p>
                <p className="text-sm text-gray-500">
                  {localize(interest, 'detail', lang)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
