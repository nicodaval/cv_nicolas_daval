import { Experience, Lang } from '@/lib/types';
import TimelineItem from './TimelineItem';

interface TimelineProps {
  experiences: Experience[];
  lang: Lang;
}

export default function Timeline({ experiences, lang }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical gradient line */}
      <div className="absolute left-[6px] top-3 bottom-0 w-0.5 bg-gradient-to-b from-primary to-secondary" />

      {experiences.map((experience, index) => (
        <TimelineItem key={index} experience={experience} lang={lang} />
      ))}
    </div>
  );
}
