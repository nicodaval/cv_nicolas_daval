interface TechBadgeProps {
  name: string;
}

export default function TechBadge({ name }: TechBadgeProps) {
  return (
    <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-primary-light text-primary-dark font-medium">
      {name}
    </span>
  );
}
