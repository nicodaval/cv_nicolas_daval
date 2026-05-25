interface SkillBarProps {
  name: string;
  level: string;
}

const levelConfig: Record<string, { width: string; label_fr: string; label_en: string; color: string }> = {
  'débutant': { width: '25%', label_fr: 'Débutant', label_en: 'Beginner', color: 'bg-gray-400' },
  'intermédiaire': { width: '50%', label_fr: 'Intermédiaire', label_en: 'Intermediate', color: 'bg-accent' },
  'avancé': { width: '75%', label_fr: 'Avancé', label_en: 'Advanced', color: 'bg-primary' },
  'expert': { width: '100%', label_fr: 'Expert', label_en: 'Expert', color: 'bg-gradient-to-r from-primary to-secondary' },
};

export default function SkillBar({ name, level }: SkillBarProps) {
  const config = levelConfig[level.toLowerCase()] || levelConfig['intermédiaire'];

  return (
    <div className="flex items-center gap-3 py-1">
      <span className="text-sm text-gray-700 w-48 shrink-0 truncate">{name}</span>
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${config.color} transition-all duration-500`}
          style={{ width: config.width }}
        />
      </div>
      <span className="text-xs text-gray-500 w-24 text-right font-medium">{config.label_fr}</span>
    </div>
  );
}
