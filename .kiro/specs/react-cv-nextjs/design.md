# Design Document

## Overview

This design describes the architecture for rebuilding the Nicolas DAVAL CV website using Next.js 14+ with App Router and static export. The application reads bilingual content from YAML data files at build time, renders it through React components styled with Tailwind CSS in a Material Design aesthetic, and deploys as a static site to GitHub Pages. A Python script generates PDF versions of the CV in both languages.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     GitHub Actions Pipeline                       │
│  ┌──────────────┐   ┌──────────────────┐   ┌────────────────┐  │
│  │ Next.js Build │   │ PDF Generation   │   │ Deploy to GH   │  │
│  │ (npm run build)│   │ (python gen_pdf) │   │ Pages (out/)   │  │
│  └──────┬───────┘   └────────┬─────────┘   └────────────────┘  │
│         │                     │                                   │
└─────────┼─────────────────────┼───────────────────────────────────┘
          │                     │
          ▼                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                        data/*.yml (Source of Truth)               │
│  profile.yml │ experiences.yml │ education.yml │ skills.yml      │
│  projects.yml │ interests.yml                                    │
└─────────────────────────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Next.js App (Static Export)                   │
│                                                                   │
│  ┌─────────────┐  ┌──────────────────────────────────────────┐  │
│  │ Data Loader  │  │              App Router                   │  │
│  │ (lib/data.ts)│  │  /[lang]/         → Landing Page         │  │
│  │              │  │  /[lang]/cv       → CV Page              │  │
│  │  - YAML parse│  │  /[lang]/projects → Projects Page        │  │
│  │  - Filter    │  │                                          │  │
│  │  - Sanitize  │  └──────────────────────────────────────────┘  │
│  └─────────────┘                                                  │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────────┐│
│  │                    React Components                           ││
│  │  Timeline │ SkillBar │ Card │ TOC │ LanguageSwitcher │ ...   ││
│  └──────────────────────────────────────────────────────────────┘│
│                                                                   │
│  ┌──────────────────────────────────────────────────────────────┐│
│  │                    Tailwind CSS + Design Tokens               ││
│  └──────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

### Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | Next.js 14+ (App Router) | Static site generation with `output: 'export'` |
| Styling | Tailwind CSS 3.4+ | Utility-first CSS with custom design tokens |
| Data Parsing | js-yaml | YAML file parsing at build time |
| Language | TypeScript | Type safety for data models and components |
| PDF Generation | Python + WeasyPrint | HTML-to-PDF rendering with CSS styling |
| CI/CD | GitHub Actions | Automated build, PDF generation, and deployment |
| Hosting | GitHub Pages | Static file hosting |

## Project Structure

```
cv_nicolas_daval/
├── data/                          # YAML data files (source of truth)
│   ├── profile.yml
│   ├── experiences.yml
│   ├── education.yml
│   ├── skills.yml
│   ├── projects.yml
│   └── interests.yml
├── src/
│   ├── app/
│   │   ├── [lang]/               # Dynamic route for language (fr/en)
│   │   │   ├── page.tsx          # Landing page
│   │   │   ├── cv/
│   │   │   │   └── page.tsx      # CV page
│   │   │   ├── projects/
│   │   │   │   └── page.tsx      # Projects page
│   │   │   └── layout.tsx        # Language-specific layout
│   │   ├── layout.tsx            # Root layout (html, body, fonts)
│   │   ├── page.tsx              # Root redirect to /fr
│   │   └── globals.css           # Tailwind directives + custom tokens
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx        # Top navigation bar
│   │   │   ├── Footer.tsx        # Footer with links
│   │   │   └── TOCNavigation.tsx # Left-side table of contents
│   │   ├── cv/
│   │   │   ├── Timeline.tsx      # Experience timeline
│   │   │   ├── TimelineItem.tsx  # Single timeline entry
│   │   │   ├── SkillCategory.tsx # Skill category with bars
│   │   │   ├── SkillBar.tsx      # Individual skill bar
│   │   │   ├── EducationCard.tsx # Education/diploma card
│   │   │   └── InterestsSection.tsx # Soft skills & interests
│   │   ├── projects/
│   │   │   └── ProjectCard.tsx   # Project card component
│   │   ├── landing/
│   │   │   └── HeroSection.tsx   # Landing page hero
│   │   └── shared/
│   │       ├── LanguageSwitcher.tsx # FR/EN toggle
│   │       ├── PdfDownloadButton.tsx # PDF download CTA
│   │       └── TechBadge.tsx     # Technology tag badge
│   ├── lib/
│   │   ├── data.ts               # YAML loading & filtering logic
│   │   ├── types.ts              # TypeScript interfaces for data models
│   │   └── i18n.ts               # Internationalization utilities
│   └── config/
│       └── navigation.ts         # Navigation structure config
├── scripts/
│   └── generate_pdf.py           # Python PDF generation script
├── public/
│   └── pdf/                      # Generated PDFs (output target)
├── next.config.js                # Next.js configuration
├── tailwind.config.ts            # Tailwind configuration with design tokens
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Node.js dependencies
└── .github/
    └── workflows/
        └── deploy.yml            # GitHub Actions pipeline
```

## Component Design

### Data Layer (`src/lib/data.ts`)

The data loader reads YAML files at build time using Node.js `fs` module (available in Server Components and `generateStaticParams`).

```typescript
// Key responsibilities:
// 1. Read YAML files from data/ directory
// 2. Parse with js-yaml
// 3. Filter by published flag
// 4. Strip private fields (salary, mobility)
// 5. Return typed data for the requested language

interface DataLoaderOptions {
  lang: 'fr' | 'en';
  includeUnpublished?: boolean; // always false for public site
}
```

**Private data stripping**: The `getProfile()` function explicitly destructures and omits `salary` and `mobility` fields before returning data. This is a build-time operation — private data never reaches the static output.

**Published flag logic**: Entries without a `published` field default to `true` (included). Only explicit `published: false` excludes an entry.

### Type Definitions (`src/lib/types.ts`)

```typescript
type Lang = 'fr' | 'en';

interface Profile {
  name: string;
  title: string;
  location: string;
  contact: { email: string; linkedin: string; github: string };
  languages: { name: string; level: string }[];
  summary_fr: string;
  summary_en: string;
}

interface Experience {
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

interface SkillCategory {
  name_fr: string;
  name_en: string;
  skills: { name: string; level: number }[];
}

interface Project {
  title_fr: string;
  title_en: string;
  company: string;
  period: string;
  description_fr: string;
  description_en: string;
  technologies: string[];
  outcomes_fr: string[];
  outcomes_en: string[];
  published?: boolean;
}

interface Diploma {
  title_fr: string;
  title_en: string;
  institution: string | null;
  year: number;
  published?: boolean;
}

interface Training {
  name: string;
  provider: string | null;
  published?: boolean;
}
```

### Internationalization Strategy

The app uses a file-system based routing approach with `[lang]` dynamic segment:

- `/fr/` — French landing page
- `/fr/cv` — French CV
- `/en/projects` — English projects
- Root `/` redirects to `/fr/`

`generateStaticParams` returns `[{ lang: 'fr' }, { lang: 'en' }]` to pre-render both languages.

Content selection uses a helper:

```typescript
function localize<T>(obj: T, field: string, lang: Lang): string {
  return obj[`${field}_${lang}`] as string;
}
```

UI labels (section headers, button text) are stored in a simple dictionary object in `src/lib/i18n.ts`.

### Component Details

#### Timeline Component
- Renders a vertical gradient line (blue → purple) on the left
- Each `TimelineItem` has an animated marker dot, date badge, and content card
- Content card shows title, company, description bullets, and tech badges
- Hover effect: card shifts right, marker scales up

#### SkillBar Component
- Horizontal bar with gradient fill (blue → purple)
- Label on left (fixed width), track in middle, percentage on right
- Fill width animated on mount using CSS transitions
- Grouped by `SkillCategory` with uppercase category headers

#### ProjectCard Component
- Elevated card with top gradient border on hover
- Shows title, company, period, description, tech badges, and outcomes list
- Hover: lifts with increased shadow

#### TOCNavigation Component
- Fixed position on left side (desktop only)
- Uses Intersection Observer API to detect which section is in viewport
- Highlights active section with blue left border and background
- Smooth scroll on click
- Hidden below 768px viewport width

#### LanguageSwitcher Component
- Toggle button in the header showing "FR | EN"
- Active language highlighted with primary color
- Navigates to equivalent path with new language prefix
- Preserves current page context during switch

### Tailwind Configuration

Custom design tokens mapped to Tailwind theme extension:

```typescript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      primary: { DEFAULT: '#1a73e8', dark: '#1557b0', light: '#e8f0fe' },
      secondary: { DEFAULT: '#7c3aed', light: '#ede9fe' },
      accent: { DEFAULT: '#f97316', dark: '#ea580c' },
    },
    borderRadius: {
      card: '12px',
      sm: '8px',
      lg: '16px',
    },
    boxShadow: {
      card: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
      'card-hover': '0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)',
      elevated: '0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06)',
    },
    fontFamily: {
      sans: ['Inter', 'Google Sans', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
  }
}
```

### PDF Generation Design (`scripts/generate_pdf.py`)

The Python script:
1. Reads all YAML files from `data/`
2. Filters by `published` flag
3. Strips private data (salary, mobility)
4. Renders an HTML template with CSS styling (classic professional theme)
5. Converts HTML to PDF using WeasyPrint
6. Outputs to `public/pdf/cv-nicolas-daval-fr.pdf` and `public/pdf/cv-nicolas-daval-en.pdf`

PDF layout:
- Header: Name, title, contact info (email, LinkedIn, GitHub)
- Sections: Summary, Experience, Skills, Education, Training
- No photo
- Clean typography, subtle section dividers
- A4 format with proper margins

### GitHub Actions Pipeline

```yaml
# Workflow steps:
# 1. Checkout code
# 2. Setup Node.js 20 + cache npm
# 3. Install Node dependencies
# 4. Setup Python 3.12 + cache pip
# 5. Install Python dependencies (weasyprint, pyyaml)
# 6. Run PDF generation script
# 7. Build Next.js static export (npm run build)
# 8. Deploy out/ directory to GitHub Pages using actions/deploy-pages
```

The pipeline uses the newer `actions/deploy-pages` approach (with `actions/upload-pages-artifact`) instead of the legacy `gh-deploy` method.

### Routing and Static Export Considerations

Since Next.js static export doesn't support middleware or server-side redirects:
- Root `page.tsx` uses a client-side redirect (`useEffect` + `router.push`) or a meta refresh to `/fr/`
- All pages use `generateStaticParams` to pre-render both language variants
- Links use `<Link>` component with explicit language prefix paths
- `trailingSlash: true` in next.config.js for GitHub Pages compatibility

### Performance Considerations

- All data loading happens at build time (zero runtime data fetching)
- Images optimized with `next/image` where applicable (using `unoptimized: true` for static export)
- Tailwind CSS purges unused styles in production
- Minimal client-side JavaScript (only for TOC scroll spy and language switcher navigation)
- Font loading via `next/font` for optimal web font performance

## Correctness Properties

### Property 1: Data Loader filters unpublished entries
- FOR ALL YAML entries with `published: false`, the Data_Loader output SHALL NOT contain those entries
- FOR ALL YAML entries with `published: true` or no `published` field, the Data_Loader output SHALL contain those entries

### Property 2: Private data never appears in output
- FOR ALL pages rendered by the Next_App, the output HTML SHALL NOT contain any value from the `salary` or `mobility` fields of `profile.yml`

### Property 3: Language content consistency
- FOR ALL pages, WHEN rendered with lang='fr', all displayed text SHALL come from `_fr` suffixed fields
- FOR ALL pages, WHEN rendered with lang='en', all displayed text SHALL come from `_en` suffixed fields

### Property 4: Static export completeness
- The build output SHALL contain HTML files for all combinations of languages (fr, en) and pages (index, cv, projects)

### Property 5: YAML parse round-trip integrity
- FOR ALL valid YAML data files, parsing then accessing fields SHALL return values identical to the source file content

### Property 6: Published flag default behavior
- FOR ALL entries without an explicit `published` field, the Data_Loader SHALL treat them as `published: true`
