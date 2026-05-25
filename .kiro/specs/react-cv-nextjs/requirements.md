# Requirements Document

## Introduction

This document specifies the requirements for rebuilding the bilingual CV website of Nicolas DAVAL (Data Architect & Tech Lead) using Next.js with static export (SSG), replacing the current MkDocs-based implementation. The site is deployed on GitHub Pages and all content is driven from YAML data files in the `data/` directory. The rebuild preserves the existing Material Design styling, bilingual FR/EN support, PDF generation, and left-side table of contents navigation while leveraging React components for better maintainability and extensibility.

## Glossary

- **Next_App**: The Next.js 14+ application using App Router with static export (`output: 'export'`)
- **Data_Loader**: The build-time module that reads and parses YAML files from the `data/` directory
- **Language_Switcher**: The UI component that allows users to toggle between French and English content
- **TOC_Navigation**: The left-side table of contents component that provides section navigation on CV and Projects pages
- **PDF_Generator**: The Python script that reads YAML data files and generates professional CV PDFs in both languages
- **Landing_Page**: The root page (`/`) displaying name, title, and navigation links to CV and Projects
- **CV_Page**: The page (`/cv`) displaying the full curriculum vitae with timeline, skills, education, and interests
- **Projects_Page**: The page (`/projects`) displaying key projects with descriptions, technologies, and outcomes
- **Published_Flag**: The `published` boolean field in YAML entries that controls whether an entry is rendered on the public site
- **Private_Data**: Fields in `data/profile.yml` that must never be displayed publicly (salary, mobility information)
- **GitHub_Actions_Pipeline**: The CI/CD workflow that builds the static site, generates PDFs, and deploys to GitHub Pages
- **Static_Export**: The Next.js build output mode that generates pure HTML/CSS/JS files suitable for static hosting

## Requirements

### Requirement 1: Static Site Generation with Next.js

**User Story:** As a site owner, I want the CV website built with Next.js static export, so that it can be deployed on GitHub Pages without a server.

#### Acceptance Criteria

1. THE Next_App SHALL use Next.js 14+ with App Router and `output: 'export'` configuration
2. WHEN the build command is executed, THE Next_App SHALL generate a fully static site in the `out/` directory
3. THE Next_App SHALL produce HTML, CSS, and JavaScript files that function without a server runtime
4. THE Next_App SHALL use Tailwind CSS for styling

### Requirement 2: Data-Driven Content from YAML Files

**User Story:** As a site owner, I want all content read from YAML data files at build time, so that I can update my CV by editing data files without touching code.

#### Acceptance Criteria

1. WHEN the site is built, THE Data_Loader SHALL read content from `data/profile.yml`, `data/experiences.yml`, `data/education.yml`, `data/skills.yml`, `data/projects.yml`, and `data/interests.yml`
2. THE Data_Loader SHALL parse YAML files using js-yaml at build time
3. WHEN a YAML file contains a syntax error, THE Data_Loader SHALL fail the build with a descriptive error message indicating the file and line number
4. THE Data_Loader SHALL serve as the single source of truth for all displayed content

### Requirement 3: Published Flag Filtering

**User Story:** As a site owner, I want to control which entries appear on the public site using a `published` field, so that I can hide draft or outdated entries without deleting them.

#### Acceptance Criteria

1. WHEN an entry in a YAML file has `published: false`, THE Data_Loader SHALL exclude that entry from the rendered output
2. WHEN an entry in a YAML file has `published: true` or no `published` field, THE Data_Loader SHALL include that entry in the rendered output
3. THE Data_Loader SHALL apply the published flag filtering to experiences, education, projects, and skills entries

### Requirement 4: Private Data Protection

**User Story:** As a site owner, I want salary and mobility information to never appear on the public site, so that my private negotiation data remains confidential.

#### Acceptance Criteria

1. THE Next_App SHALL exclude the `salary` field from `data/profile.yml` from all rendered pages
2. THE Next_App SHALL exclude the `mobility` field from `data/profile.yml` from all rendered pages
3. WHEN the static export is generated, THE Next_App SHALL verify that no salary or mobility data is present in the output HTML files

### Requirement 5: Landing Page

**User Story:** As a visitor, I want a clean landing page with the owner's name, title, and navigation links, so that I can quickly access the CV or Projects sections.

#### Acceptance Criteria

1. THE Landing_Page SHALL display the name and title from `data/profile.yml`
2. THE Landing_Page SHALL display a brief professional summary in the active language
3. THE Landing_Page SHALL provide navigation links to the CV_Page and the Projects_Page
4. THE Landing_Page SHALL provide links to LinkedIn and GitHub profiles from `data/profile.yml`
5. THE Landing_Page SHALL provide a download link for the PDF CV in the active language

### Requirement 6: CV Page

**User Story:** As a visitor, I want a comprehensive CV page with professional experience, skills, education, and interests, so that I can evaluate the candidate's qualifications.

#### Acceptance Criteria

1. THE CV_Page SHALL display professional experiences in a timeline component ordered by start date (most recent first)
2. THE CV_Page SHALL display skills grouped by category with animated skill bars showing proficiency levels
3. THE CV_Page SHALL display education diplomas and training in a card layout
4. THE CV_Page SHALL display soft skills and interests
5. THE CV_Page SHALL display a PDF download button for the CV in the active language
6. WHEN the page loads, THE CV_Page SHALL render all content in the currently selected language

### Requirement 7: Projects Page

**User Story:** As a visitor, I want a dedicated projects page showcasing key achievements, so that I can understand the candidate's major contributions.

#### Acceptance Criteria

1. THE Projects_Page SHALL display each project in a card component with title, company, period, description, technologies, and outcomes
2. THE Projects_Page SHALL display projects ordered by period (most recent first)
3. THE Projects_Page SHALL display technology tags as styled badges on each project card
4. WHEN the page loads, THE Projects_Page SHALL render all content in the currently selected language

### Requirement 8: Bilingual Support (FR/EN)

**User Story:** As a visitor, I want to switch between French and English, so that I can read the CV in my preferred language.

#### Acceptance Criteria

1. THE Language_Switcher SHALL allow users to toggle between French and English
2. WHEN the user selects a language, THE Next_App SHALL re-render all content using the corresponding `_fr` or `_en` suffixed fields from the YAML data
3. THE Next_App SHALL default to French as the primary language
4. THE Next_App SHALL persist the selected language preference across page navigations within the same session
5. WHEN a page is loaded, THE Next_App SHALL generate static routes for both `/fr/` and `/en/` prefixed paths

### Requirement 9: Left-Side Table of Contents Navigation

**User Story:** As a visitor, I want a left-side table of contents on the CV and Projects pages, so that I can quickly jump to specific sections.

#### Acceptance Criteria

1. THE TOC_Navigation SHALL appear on the left side of the CV_Page and Projects_Page
2. THE TOC_Navigation SHALL list all major sections of the current page as clickable links
3. WHEN the user scrolls, THE TOC_Navigation SHALL highlight the currently visible section
4. WHILE the viewport width is less than 768px, THE TOC_Navigation SHALL be hidden to preserve mobile readability
5. WHEN a TOC link is clicked, THE CV_Page or Projects_Page SHALL smooth-scroll to the corresponding section

### Requirement 10: Material Design Styling

**User Story:** As a site owner, I want a modern Material Design look with the existing Google-inspired palette, so that the site appears professional and visually appealing.

#### Acceptance Criteria

1. THE Next_App SHALL use a color palette with blue primary (#1a73e8), purple gradient accents (#7c3aed), and orange CTAs (#f97316)
2. THE Next_App SHALL render experience entries using a timeline component with a gradient vertical line and animated markers
3. THE Next_App SHALL render skills using horizontal bar components with gradient fills and percentage labels
4. THE Next_App SHALL render projects and education using elevated card components with hover effects
5. THE Next_App SHALL use Material-style elevation shadows, rounded corners (12px default), and smooth transitions
6. THE Next_App SHALL be fully responsive with optimized layouts for mobile (<768px), tablet (768px-1024px), and desktop (>1024px)

### Requirement 11: PDF Generation

**User Story:** As a site owner, I want professional CV PDFs generated automatically in both languages, so that visitors can download a printable version.

#### Acceptance Criteria

1. THE PDF_Generator SHALL read data from the YAML files in the `data/` directory
2. THE PDF_Generator SHALL generate one PDF in French (`cv-nicolas-daval-fr.pdf`) and one in English (`cv-nicolas-daval-en.pdf`)
3. THE PDF_Generator SHALL use a classic professional theme without a photo
4. THE PDF_Generator SHALL respect the `published` flag and exclude unpublished entries
5. THE PDF_Generator SHALL exclude private data (salary, mobility) from the generated PDFs
6. THE PDF_Generator SHALL be implemented as a Python script using WeasyPrint or ReportLab

### Requirement 12: GitHub Actions Deployment

**User Story:** As a site owner, I want the site automatically built and deployed on every push to main, so that updates are published without manual intervention.

#### Acceptance Criteria

1. WHEN a push is made to the `main` branch, THE GitHub_Actions_Pipeline SHALL trigger automatically
2. THE GitHub_Actions_Pipeline SHALL install Node.js dependencies and build the Next.js static export
3. THE GitHub_Actions_Pipeline SHALL install Python dependencies and run the PDF_Generator
4. THE GitHub_Actions_Pipeline SHALL deploy the static output and generated PDFs to GitHub Pages
5. IF the build or PDF generation fails, THEN THE GitHub_Actions_Pipeline SHALL report the failure without deploying

### Requirement 13: Accessibility and SEO

**User Story:** As a site owner, I want the site to be accessible and SEO-friendly, so that it ranks well in search engines and is usable by all visitors.

#### Acceptance Criteria

1. THE Next_App SHALL generate semantic HTML with appropriate heading hierarchy (h1, h2, h3)
2. THE Next_App SHALL include meta tags for title, description, and Open Graph in both languages
3. THE Next_App SHALL ensure all interactive elements are keyboard-navigable
4. THE Next_App SHALL maintain a color contrast ratio of at least 4.5:1 for body text
