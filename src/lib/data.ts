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
 * Filters entries by display flag.
 * Entries with display: false are excluded from the public site.
 * Entries with display: true or no display field are included.
 */
function filterDisplay<T>(entries: T[]): T[] {
  return entries.filter((entry) => (entry as unknown as { display?: boolean }).display !== false);
}

/**
 * Localize helper: returns obj[field + '_' + lang]
 */
export function localize<T>(obj: T, field: string, lang: Lang): string {
  return (obj as Record<string, unknown>)[`${field}_${lang}`] as string;
}

/**
 * Get profile data.
 */
export function getProfile(): Profile {
  const raw = readYaml<Record<string, unknown>>('profile.yml');
  return raw as unknown as Profile;
}

/**
 * Get experiences filtered by display flag.
 */
export function getExperiences(): Experience[] {
  const raw = readYaml<{ experiences: Experience[] }>('experiences.yml');
  return filterDisplay(raw.experiences);
}

/**
 * Get skill categories (filter individual skills by display flag).
 */
export function getSkills(): SkillCategory[] {
  const raw = readYaml<{ categories: SkillCategory[] }>('skills.yml');
  return raw.categories
    .filter((cat) => (cat as unknown as { display?: boolean }).display !== false)
    .map((cat) => ({
      ...cat,
      skills: cat.skills.filter((s) => (s as unknown as { display?: boolean }).display !== false),
    }));
}

/**
 * Get projects filtered by display flag.
 */
export function getProjects(): Project[] {
  const raw = readYaml<{ projects: Project[] }>('projects.yml');
  return filterDisplay(raw.projects);
}

/**
 * Get education data (diplomas and training) filtered by display flag.
 */
export function getEducation(): { diplomas: Diploma[]; training: Training[] } {
  const raw = readYaml<{ diplomas: Diploma[]; training: Training[] }>('education.yml');
  return {
    diplomas: filterDisplay(raw.diplomas),
    training: filterDisplay(raw.training),
  };
}

/**
 * Get interests data (soft skills and interests) filtered by display flag.
 */
export function getInterests(): { softSkills: SoftSkill[]; interests: Interest[] } {
  const raw = readYaml<{ soft_skills: SoftSkill[]; interests: Interest[] }>('interests.yml');
  return {
    softSkills: (raw.soft_skills || []).filter((s) => (s as unknown as { display?: boolean }).display !== false),
    interests: (raw.interests || []).filter((i) => (i as unknown as { display?: boolean }).display !== false),
  };
}
