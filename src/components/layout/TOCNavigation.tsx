'use client';

import { useEffect, useState } from 'react';

interface TOCSection {
  id: string;
  label: string;
}

interface TOCNavigationProps {
  sections: TOCSection[];
}

export default function TOCNavigation({ sections }: TOCNavigationProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          setActiveId(visible.target.id);
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  function handleClick(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  return (
    <nav aria-label="Table of contents" role="navigation" className="hidden md:block fixed left-4 top-24 w-48 space-y-1">
      {sections.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => handleClick(id)}
          className={`block w-full text-left text-sm px-3 py-1.5 rounded-r transition-all ${
            activeId === id
              ? 'border-l-3 border-primary bg-primary-light text-primary font-medium'
              : 'border-l-3 border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}
