import { Diploma, Training, Lang } from '@/lib/types';
import { localize } from '@/lib/data';

interface EducationCardProps {
  item: Diploma | Training;
  lang: Lang;
  type: 'diploma' | 'training';
}

export default function EducationCard({ item, lang, type }: EducationCardProps) {
  if (type === 'diploma') {
    const diploma = item as Diploma;
    const title = localize(diploma, 'title', lang);

    return (
      <div className="bg-white rounded-card p-4 shadow-card border border-gray-100 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center shrink-0 mt-0.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900">{title}</h4>
            {diploma.institution && (
              <p className="text-xs text-gray-500 mt-0.5">{diploma.institution}</p>
            )}
            <p className="text-xs text-gray-400 mt-0.5">{diploma.year}</p>
          </div>
        </div>
      </div>
    );
  }

  // Training type
  const training = item as Training;
  return (
    <div className="bg-white rounded-card p-4 shadow-card border border-gray-100 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-secondary-light flex items-center justify-center shrink-0 mt-0.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-secondary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
          </svg>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-900">{training.name}</h4>
          {training.provider && (
            <p className="text-xs text-gray-500 mt-0.5">{training.provider}</p>
          )}
        </div>
      </div>
    </div>
  );
}
