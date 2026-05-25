import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import {
  Lang,
  Profile,
  Experience,
  SkillCategory,
  Project,
  Diploma,
  Training,
  SoftSkill,
  Interest,
} from './types';

const dataDir = path.join(process.cwd(), 'data');

function readYaml<T>(filename: string): T {
  const filePath = path.join(dataDir, filename);
  const content = fs.readFileSync(filePath, 'utf-8');
  return yaml.load(content) as T;
}

/**
 * Filters entries by published flag.
 * Entries with published: false are excluded.
 * Entries with published: true or no published field are included.
 */
function filterPublished<T extends { published?: boolean }>(entries: T[]): T[] {
  return entries.filter((entry) => entry.published !== false);
}

/**
 * Localize helper: returns obj[field + '_' + lang]
 */
export function localize<T>(obj: T, field: string, lang: Lang): string {
  return (obj as Record<string, unknown>)[`${field}_${lang}`] as string;
}

/**
 * Get profile data, stripping private fields (salary, mobility).
 */
export function getProfile(): Profile {
  const raw = readYaml<Record<string, unknown>>('profile.yml');

  // Destructure to omit salary and mobility
  const { salary, mobility, ...publicData } = raw;

  // Suppress unused variable warnings
  void salary;
  void mobility;

  return publicData as unknown as Profile;
}

/**
 * Get experiences filtered by published flag.
 */
export function getExperiences(): Experience[] {
  const raw = readYaml<{ experiences: Experience[] }>('experiences.yml');
  return filterPublished(raw.experiences);
}

/**
 * Get skill categories.
 */
export function getSkills(): SkillCategory[] {
  const raw = readYaml<{ categories: SkillCategory[] }>('skills.yml');
  return raw.categories;
}

/**
 * Get projects filtered by published flag.
 */
export function getProjects(): Project[] {
  const raw = readYaml<{ projects: Project[] }>('projects.yml');
  return filterPublished(raw.projects);
}

/**
 * Get education data (diplomas and training) filtered by published flag.
 */
export function getEducation(): { diplomas: Diploma[]; training: Training[] } {
  const raw = readYaml<{ diplomas: Diploma[]; training: Training[] }>('education.yml');
  return {
    diplomas: filterPublished(raw.diplomas),
    training: filterPublished(raw.training),
  };
}

/**
 * Get interests data (soft skills and interests).
 */
export function getInterests(): { softSkills: SoftSkill[]; interests: Interest[] } {
  const raw = readYaml<{ soft_skills: SoftSkill[]; interests: Interest[] }>('interests.yml');
  return {
    softSkills: raw.soft_skills,
    interests: raw.interests,
  };
}
