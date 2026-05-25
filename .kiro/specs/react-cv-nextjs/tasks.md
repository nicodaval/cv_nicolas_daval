# Implementation Tasks

## Task 1: Project Initialization and Configuration

- [x] 1.1 Initialize Next.js 14+ project with App Router, TypeScript, and Tailwind CSS in the repository root
- [x] 1.2 Configure `next.config.js` with `output: 'export'`, `trailingSlash: true`, `images: { unoptimized: true }`, and `basePath` for GitHub Pages
- [x] 1.3 Configure `tailwind.config.ts` with custom design tokens (colors, shadows, border-radius, fonts) matching the Material Design palette
- [x] 1.4 Create `src/app/globals.css` with Tailwind directives and any custom CSS variables needed
- [x] 1.5 Create `tsconfig.json` with path aliases (`@/` for `src/`)
- [x] 1.6 Add `package.json` scripts: `dev`, `build`, `start`, `lint`

## Task 2: Data Layer and Type Definitions

- [x] 2.1 Create `src/lib/types.ts` with TypeScript interfaces for Profile, Experience, SkillCategory, Project, Diploma, Training, Interest, and SoftSkill
- [x] 2.2 Create `src/lib/data.ts` with functions to read and parse YAML files: `getProfile(lang)`, `getExperiences(lang)`, `getSkills(lang)`, `getProjects(lang)`, `getEducation(lang)`, `getInterests(lang)`
- [x] 2.3 Implement published flag filtering logic: exclude entries with `published: false`, include entries with `published: true` or no `published` field
- [x] 2.4 Implement private data stripping: ensure `salary` and `mobility` fields from profile.yml are never returned by `getProfile()`
- [x] 2.5 Implement language field selection helper: `localize(obj, field, lang)` that returns the `_fr` or `_en` suffixed field value

## Task 3: Internationalization Setup

- [x] 3.1 Create `src/lib/i18n.ts` with UI label dictionaries for both languages (section headers, button labels, navigation items)
- [x] 3.2 Set up `[lang]` dynamic route segment in `src/app/[lang]/layout.tsx` with `generateStaticParams` returning `['fr', 'en']`
- [x] 3.3 Create root `src/app/page.tsx` that redirects to `/fr/` (client-side redirect for static export)
- [x] 3.4 Create `src/app/layout.tsx` root layout with HTML lang attribute, font loading (Inter via next/font), and metadata

## Task 4: Shared Layout Components

- [x] 4.1 Create `src/components/layout/Header.tsx` with site title, navigation links (CV, Projects), and language switcher slot
- [x] 4.2 Create `src/components/shared/LanguageSwitcher.tsx` as a toggle between FR and EN that navigates to the equivalent path with the other language prefix
- [x] 4.3 Create `src/components/layout/Footer.tsx` with copyright, LinkedIn, and GitHub links
- [x] 4.4 Create `src/components/layout/TOCNavigation.tsx` with Intersection Observer-based scroll spy, active section highlighting, smooth scroll on click, and responsive hiding below 768px
- [x] 4.5 Create `src/app/[lang]/layout.tsx` that composes Header, Footer, and provides the language context to child pages

## Task 5: Landing Page

- [x] 5.1 Create `src/components/landing/HeroSection.tsx` displaying name, title, summary, and profile links (LinkedIn, GitHub)
- [x] 5.2 Create `src/app/[lang]/page.tsx` landing page composing HeroSection with navigation cards linking to CV and Projects pages
- [x] 5.3 Add PDF download button on landing page using `src/components/shared/PdfDownloadButton.tsx`

## Task 6: CV Page Components

- [x] 6.1 Create `src/components/cv/TimelineItem.tsx` with marker dot, date badge, content card (title, company, description bullets, tech badges), and hover animation
- [x] 6.2 Create `src/components/cv/Timeline.tsx` that renders the vertical gradient line and maps experiences to TimelineItem components
- [x] 6.3 Create `src/components/cv/SkillBar.tsx` with label, gradient-filled track, and percentage display with mount animation
- [x] 6.4 Create `src/components/cv/SkillCategory.tsx` that groups SkillBar components under a category header
- [x] 6.5 Create `src/components/cv/EducationCard.tsx` for diplomas and training entries with card styling
- [x] 6.6 Create `src/components/cv/InterestsSection.tsx` for soft skills and personal interests

## Task 7: CV Page Assembly

- [x] 7.1 Create `src/app/[lang]/cv/page.tsx` that loads all CV data at build time and composes Timeline, SkillCategory, EducationCard, InterestsSection, and PdfDownloadButton
- [x] 7.2 Integrate TOCNavigation on the CV page with section anchors for Experience, Skills, Education, Training, Soft Skills, and Interests
- [x] 7.3 Add proper heading hierarchy (h1 for page title, h2 for sections) and section IDs for TOC linking

## Task 8: Projects Page

- [x] 8.1 Create `src/components/projects/ProjectCard.tsx` with title, company, period, description, technology badges, outcomes list, and hover effects
- [x] 8.2 Create `src/components/shared/TechBadge.tsx` for styled technology tag badges
- [x] 8.3 Create `src/app/[lang]/projects/page.tsx` that loads projects data and renders ProjectCard components with TOCNavigation

## Task 9: PDF Generation Script

- [x] 9.1 Create `scripts/generate_pdf.py` that reads YAML data files, filters by published flag, and strips private data
- [x] 9.2 Create HTML/CSS template within the script for a classic professional CV layout (A4, no photo, clean typography)
- [x] 9.3 Implement PDF rendering for both languages outputting to `public/pdf/cv-nicolas-daval-fr.pdf` and `public/pdf/cv-nicolas-daval-en.pdf`
- [x] 9.4 Create `requirements-pdf.txt` with Python dependencies (weasyprint, pyyaml)

## Task 10: GitHub Actions Pipeline

- [x] 10.1 Create `.github/workflows/deploy.yml` with trigger on push to main, Node.js 20 setup, npm cache, and Next.js build step
- [x] 10.2 Add Python 3.12 setup, pip cache, and PDF generation step to the workflow
- [x] 10.3 Add GitHub Pages deployment using `actions/upload-pages-artifact` and `actions/deploy-pages` targeting the `out/` directory
- [x] 10.4 Configure repository permissions (`pages: write`, `id-token: write`) and environment settings in the workflow

## Task 11: SEO and Metadata

- [x] 11.1 Add `generateMetadata` to each page with title, description, and Open Graph tags in the appropriate language
- [x] 11.2 Create a `robots.txt` and `sitemap.xml` generation in the public directory or via Next.js metadata API
- [x] 11.3 Ensure semantic HTML structure with proper ARIA labels on navigation, TOC, and interactive elements

## Task 12: Testing and Validation

- [x] 12.1 Verify the build completes successfully with `npm run build` producing the `out/` directory
- [x] 12.2 Verify all 6 page variants are generated (fr/index, fr/cv, fr/projects, en/index, en/cv, en/projects)
- [x] 12.3 Verify no private data (salary, mobility) appears in any generated HTML file
- [x] 12.4 Verify the published flag filtering works correctly by adding a `published: false` test entry
