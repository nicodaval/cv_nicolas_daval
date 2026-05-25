# Implementation Plan: Modern CV MkDocs

## Overview

This plan implements a bilingual (French/English) CV website using MkDocs with the Material theme, deployed on GitHub Pages. Tasks are ordered to establish project structure first, then build content and styling incrementally, and finally wire up deployment and ancillary files.

## Tasks

- [x] 1. Set up project structure and MkDocs configuration
  - [x] 1.1 Create `requirements.txt` with Python dependencies (`mkdocs>=1.6.0`, `mkdocs-material>=9.5.0`, `mkdocs-static-i18n>=1.2.0`)
    - _Requirements: 1.1_
  - [x] 1.2 Create `mkdocs.yml` with site metadata, Material theme settings, i18n plugin configuration, `extra.alternate` language selector, custom CSS reference, and navigation structure
    - Define `site_name`, `site_url`, `site_description`, `site_author`
    - Configure Material theme with indigo primary, teal accent, Inter/JetBrains Mono fonts, and navigation features
    - Configure `i18n` plugin with `fr` as default language and `en` as secondary
    - Configure `extra.alternate` for the language switcher in the header
    - Define `nav` with CV and Key Projects entries
    - Reference `stylesheets/custom.css` in `extra_css`
    - _Requirements: 1.1, 1.2, 4.1, 4.2, 4.4, 4.5, 11.1, 11.3_
  - [x] 1.3 Create directory structure: `docs/`, `docs/stylesheets/`, `docs/assets/pdf/`, `docs/assets/images/`, `.github/workflows/`
    - _Requirements: 1.3, 1.4_

- [x] 2. Implement custom CSS stylesheet
  - [x] 2.1 Create `docs/stylesheets/custom.css` with CSS custom properties (design tokens) for colors, spacing, shadows, and typography
    - Define all `--cv-*` variables as specified in the design
    - _Requirements: 5.4, 5.5_
  - [x] 2.2 Implement Timeline component CSS styles
    - Style `.timeline`, `.timeline-item`, `.timeline-marker`, `.timeline-date`, `.timeline-content`, `.timeline-company`
    - Include connecting vertical line and circular markers
    - _Requirements: 5.1_
  - [x] 2.3 Implement Skill Bar component CSS styles
    - Style `.skills-section`, `.skill-bar`, `.skill-label`, `.skill-track`, `.skill-fill`, `.skill-percent`
    - Skill fill uses accent color with smooth width transitions
    - _Requirements: 5.2_
  - [x] 2.4 Implement Card component CSS styles
    - Style `.card-grid`, `.card`, `.card-icon`, `.card-subtitle`, `.card-date`
    - Include subtle shadows, rounded corners, and consistent spacing
    - _Requirements: 5.3_
  - [x] 2.5 Implement PDF download button CSS styles
    - Style `.pdf-download-btn` as a prominent call-to-action button
    - _Requirements: 8.1_
  - [x] 2.6 Add responsive media queries for mobile (<768px) and tablet (768px-1024px) breakpoints
    - Timeline stacks vertically without horizontal overflow on mobile
    - Cards display single-column on mobile, 2-column on tablet
    - Skill bars remain readable on all viewports
    - Adjust font sizes for narrow viewports
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 6_

- [x] 3. Checkpoint - Verify project builds
  - Ensure `mkdocs build --strict` passes with the configuration and empty content stubs, ask the user if questions arise.

- [x] 4. Create French CV page (default landing page)
  - [x] 4.1 Create `docs/index.fr.md` with front matter (title, description meta tags) and full French CV content
    - Header section: name, title, location, contact links, PDF download button
    - Profile summary: 3-4 sentence professional summary in French
    - Key Skills section: skill bars grouped by category (Data & Cloud, Development, Architecture, etc.) using HTML skill bar components
    - Career History section: timeline component with all positions in reverse chronological order
    - Education & Certifications section: card grid with education and certification cards
    - Soft Skills & Interests section
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 8.1, 8.2, 11.2_

- [x] 5. Create English CV page
  - [x] 5.1 Create `docs/index.en.md` with front matter and full English CV content
    - Same structure as French page with all content translated to English
    - PDF download button linking to English PDF
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 8.1, 8.2_

- [x] 6. Create Key Projects pages
  - [x] 6.1 Create `docs/projects.fr.md` with 3-5 key project cards in French
    - Introduction paragraph
    - Each project card includes: title, context/company, technologies (as tags), key outcomes/metrics
    - Uses card component HTML structure
    - _Requirements: 9.1, 9.2, 9.3, 9.4_
  - [x] 6.2 Create `docs/projects.en.md` with equivalent content in English
    - Same projects translated to English
    - _Requirements: 9.1, 9.2, 9.3, 9.4_

- [x] 7. Checkpoint - Verify full site builds and i18n works
  - Run `mkdocs build --strict` and verify both languages build correctly, ask the user if questions arise.

- [x] 8. Add PDF placeholder files and download integration
  - [x] 8.1 Create placeholder PDF files at `docs/assets/pdf/cv-nicolas-daval-fr.pdf` and `docs/assets/pdf/cv-nicolas-daval-en.pdf`
    - These are placeholder files; actual PDFs will be generated externally and committed later
    - _Requirements: 8.2, 8.3, 8.4_

- [x] 9. Create GitHub Actions deployment workflow
  - [x] 9.1 Create `.github/workflows/deploy.yml` with the CI/CD pipeline
    - Trigger on push to `main` branch
    - Set up Python 3.12, cache pip dependencies
    - Install dependencies from `requirements.txt`
    - Build site with `mkdocs build --strict`
    - Deploy with `mkdocs gh-deploy --force`
    - Set `permissions: contents: write`
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [x] 10. Create LinkedIn-ready content file
  - [x] 10.1 Create `linkedin-content.md` at project root with structured LinkedIn content in English
    - Headline section
    - About/Summary section
    - Experience entries with title, company, dates, and bullet points
    - Skills list formatted for LinkedIn
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6_

- [x] 11. Create README with setup and deployment instructions
  - [x] 11.1 Create `README.md` at project root
    - Project description and purpose
    - Prerequisites (Python, pip)
    - Local development setup instructions (`pip install -r requirements.txt`, `mkdocs serve`)
    - Deployment information (automatic via GitHub Actions on push to main)
    - Project structure overview
    - How to update content and regenerate PDFs
    - _Requirements: 1.5_

- [x] 12. Final checkpoint - Full build validation
  - Run `mkdocs build --strict` to ensure the complete site builds without errors or warnings, ask the user if questions arise.

## Notes

- No property-based tests are included as this project is entirely declarative (YAML, CSS, Markdown, HTML) with no algorithmic logic
- PDF files are pre-generated externally; placeholder files are created during implementation and should be replaced with actual styled PDFs
- Content for Nicolas DAVAL's actual career history, skills, and projects should be provided by the user during implementation
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation of the build pipeline
