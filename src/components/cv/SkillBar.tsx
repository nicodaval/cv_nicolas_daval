interface SkillBarProps {
  name: string;
  level: number;
}

export default function SkillBar({ name, level }: SkillBarProps) {
  return (
    <div className="flex items-center gap-3 py-1">
      <span className="text-sm text-gray-700 w-48 shrink-0 truncate">{name}</span>
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
          style={{ width: `${level}%` }}
        />
      </div>
      <span className="text-xs text-gray-400 w-8 text-right">{level}%</span>
    </div>
  );
}
