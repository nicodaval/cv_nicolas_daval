import { SkillCategory as SkillCategoryType, Lang } from '@/lib/types';
import { localize } from '@/lib/data';
import SkillBar from './SkillBar';

interface SkillCategoryProps {
  category: SkillCategoryType;
  lang: Lang;
}

export default function SkillCategory({ category, lang }: SkillCategoryProps) {
  const name = localize(category, 'name', lang);

  return (
    <div className="bg-white rounded-card p-5 shadow-card border border-gray-100">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-primary mb-4">
        {name}
      </h3>
      <div className="space-y-1">
        {category.skills.map((skill) => (
          <SkillBar key={skill.name} name={skill.name} level={skill.level} />
        ))}
      </div>
    </div>
  );
}
