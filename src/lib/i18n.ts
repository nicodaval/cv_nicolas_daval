import { Lang } from './types';

export interface Labels {
  experience: string;
  skills: string;
  education: string;
  training: string;
  softSkills: string;
  interests: string;
  languages: string;
  projects: string;
  cv: string;
  downloadPdf: string;
  home: string;
  summary: string;
  technologies: string;
  outcomes: string;
  viewCv: string;
  viewProjects: string;
}

const labels: Record<Lang, Labels> = {
  fr: {
    experience: 'Parcours Professionnel',
    skills: 'Compétences Clés',
    education: 'Formation',
    training: 'Formations Professionnelles',
    softSkills: 'Soft Skills',
    interests: "Centres d'Intérêt",
    languages: 'Langues',
    projects: 'Projets Clés',
    cv: 'CV',
    downloadPdf: 'Télécharger le CV en PDF',
    home: 'Accueil',
    summary: 'Résumé',
    technologies: 'Technologies',
    outcomes: 'Résultats',
    viewCv: 'Voir le CV',
    viewProjects: 'Voir les Projets',
  },
  en: {
    experience: 'Career History',
    skills: 'Key Skills',
    education: 'Education',
    training: 'Professional Training',
    softSkills: 'Soft Skills',
    interests: 'Interests',
    languages: 'Languages',
    projects: 'Key Projects',
    cv: 'CV',
    downloadPdf: 'Download CV as PDF',
    home: 'Home',
    summary: 'Summary',
    technologies: 'Technologies',
    outcomes: 'Outcomes',
    viewCv: 'View CV',
    viewProjects: 'View Projects',
  },
};

export function getLabels(lang: Lang): Labels {
  return labels[lang];
}
