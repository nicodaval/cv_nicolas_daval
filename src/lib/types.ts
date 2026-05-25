export type Lang = 'fr' | 'en';

export interface Profile {
  name: string;
  title: string;
  tagline_fr?: string;
  tagline_en?: string;
  location: string;
  contact: {
    email: string;
    linkedin: string;
    github: string;
  };
  languages: { name: string; level: string }[];
  summary_fr: string;
  summary_en: string;
  salary?: {
    current: string;
    target: string;
  };
  mobility?: {
    type: string;
    zones: string[];
    note?: string;
  };
}

export interface Experience {
  title_fr: string;
  title_en: string;
  company: string;
  location: string;
  start: number | string;
  end: number | string;
  description_fr: string[];
  description_en: string[];
  technologies: string[];
  published?: boolean;
}

export interface SkillCategory {
  name_fr: string;
  name_en: string;
  skills: { name: string; level: string }[];
}

export interface Project {
  title_fr: string;
  title_en: string;
  company: string;
  period: string;
  description_fr: string;
  description_en: string;
  contributions_fr?: string[];
  contributions_en?: string[];
  technologies: string[];
  outcomes_fr: string[];
  outcomes_en: string[];
  published?: boolean;
}

export interface Diploma {
  title_fr: string;
  title_en: string;
  institution: string | null;
  year: number;
  published?: boolean;
}

export interface Training {
  name: string;
  provider: string | null;
  published?: boolean;
}

export interface SoftSkill {
  name_fr: string;
  name_en: string;
  detail_fr: string;
  detail_en: string;
}

export interface Interest {
  name_fr: string;
  name_en: string;
  detail_fr: string;
  detail_en: string;
}
