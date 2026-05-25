# Requirements Document

## Introduction

This document defines the requirements for a modern, bilingual (French + English) CV website for Nicolas DAVAL, deployed as a GitHub Pages site using MkDocs with the Material theme. The site targets Data Architect / Cloud + Data + Software Solution Architect positions and presents 22+ years of experience in a visually appealing, responsive format.

## Glossary

- **CV_Site**: The MkDocs-based static website hosting the bilingual CV, deployed on GitHub Pages
- **Material_Theme**: The MkDocs Material theme providing modern UI components and responsive design
- **French_Page**: The CV page written in French language
- **English_Page**: The CV page written in English language
- **Timeline_Component**: A visual CSS component displaying career history in chronological order with styled markers
- **Skill_Bar**: A visual CSS component displaying technical skill proficiency levels as horizontal bars
- **Card_Component**: A styled container used to group and highlight sections of content (education, certifications, interests)
- **GitHub_Actions_Workflow**: The CI/CD pipeline configuration that automatically builds and deploys the site to GitHub Pages
- **Language_Switcher**: A navigation element allowing users to switch between French and English versions of the CV
- **Custom_CSS**: Additional stylesheet rules applied on top of the Material theme for distinctive visual styling

## Requirements

### Requirement 1: MkDocs Project Structure

**User Story:** As a site owner, I want a well-organized MkDocs project structure with Material theme, so that the CV site is maintainable and uses modern web design patterns.

#### Acceptance Criteria

1. THE CV_Site SHALL use MkDocs with Material_Theme as the documentation framework
2. THE CV_Site SHALL include a `mkdocs.yml` configuration file at the project root defining site metadata, theme settings, and navigation
3. THE CV_Site SHALL organize content files in a `docs/` directory with subdirectories for French and English content
4. THE CV_Site SHALL include a `docs/stylesheets/` directory containing Custom_CSS files
5. THE CV_Site SHALL include a `README.md` file at the project root with setup and deployment instructions

### Requirement 2: French CV Page

**User Story:** As a French-speaking recruiter, I want to read the CV in French, so that I can evaluate the candidate in my native language.

#### Acceptance Criteria

1. THE French_Page SHALL present the candidate profile summary including name, title, location, and contact information
2. THE French_Page SHALL display the career history using the Timeline_Component in reverse chronological order
3. THE French_Page SHALL display technical skills grouped by category using Skill_Bar components
4. THE French_Page SHALL display education and certifications using Card_Component elements
5. THE French_Page SHALL display soft skills and interests sections
6. THE French_Page SHALL be written entirely in French language
7. THE French_Page SHALL serve as the default landing page of the CV_Site

### Requirement 3: English CV Page

**User Story:** As an English-speaking recruiter, I want to read the CV in English, so that I can evaluate the candidate for international positions.

#### Acceptance Criteria

1. THE English_Page SHALL present the same content structure as the French_Page
2. THE English_Page SHALL be written entirely in English language
3. THE English_Page SHALL be accessible via the Language_Switcher from the French_Page
4. THE English_Page SHALL contain equivalent professional information translated from the French_Page

### Requirement 4: Bilingual Navigation via i18n Plugin

**User Story:** As a site visitor, I want to easily switch between French and English versions via a global language toggle, so that I can read the CV in my preferred language.

#### Acceptance Criteria

1. THE CV_Site SHALL use the MkDocs Material i18n plugin for native multilingual support
2. THE CV_Site SHALL provide a Language_Switcher button in the top navigation bar visible on every page
3. WHEN a visitor activates the Language_Switcher, THE CV_Site SHALL navigate to the equivalent page in the other language
4. THE Language_Switcher SHALL clearly indicate the currently active language
5. THE CV_Site SHALL set French as the default language

### Requirement 5: Modern Visual Styling

**User Story:** As a site owner, I want a modern, distinctive visual style that is balanced between sober and colorful, so that the CV stands out while remaining professional.

#### Acceptance Criteria

1. THE Custom_CSS SHALL define a Timeline_Component with visual markers, connecting lines, and date labels for career history display
2. THE Custom_CSS SHALL define Skill_Bar components with category labels and visual proficiency indicators
3. THE Custom_CSS SHALL define Card_Component styles with subtle shadows, rounded corners, and consistent spacing
4. THE Custom_CSS SHALL use a color palette that is modern and distinctive while remaining professional and not overly colorful
5. THE Custom_CSS SHALL apply consistent typography with clear hierarchy between headings, subheadings, and body text
6. THE CV_Site SHALL render correctly on desktop, tablet, and mobile screen sizes

### Requirement 6: GitHub Pages Deployment

**User Story:** As a site owner, I want the CV to be automatically deployed to GitHub Pages on every push, so that updates are published without manual intervention.

#### Acceptance Criteria

1. THE GitHub_Actions_Workflow SHALL trigger on pushes to the main branch
2. WHEN the GitHub_Actions_Workflow is triggered, THE GitHub_Actions_Workflow SHALL build the MkDocs site using the project configuration
3. WHEN the build succeeds, THE GitHub_Actions_Workflow SHALL deploy the built site to GitHub Pages
4. THE CV_Site SHALL be accessible at the GitHub Pages URL associated with the repository

### Requirement 7: Responsive Design

**User Story:** As a mobile user, I want the CV to be readable on any device, so that I can review it on my phone or tablet.

#### Acceptance Criteria

1. THE CV_Site SHALL adapt layout and font sizes for viewports narrower than 768 pixels
2. THE Timeline_Component SHALL stack vertically on mobile viewports without horizontal overflow
3. THE Skill_Bar components SHALL remain readable and properly sized on mobile viewports
4. THE Card_Component elements SHALL display in a single-column layout on mobile viewports

### Requirement 8: PDF Download

**User Story:** As a recruiter, I want to download the CV as a PDF file, so that I can save it locally or print it for review.

#### Acceptance Criteria

1. THE CV_Site SHALL provide a visible download button on each CV page (French and English)
2. WHEN a visitor clicks the download button, THE CV_Site SHALL serve a pre-generated PDF version of the CV in the corresponding language
3. THE PDF SHALL maintain a professional layout consistent with the site's visual style
4. THE PDF files SHALL be stored in the project and deployed alongside the site

### Requirement 9: Key Projects Section

**User Story:** As a recruiter, I want to see highlighted key projects, so that I can quickly assess the candidate's most impactful achievements without reading the full timeline.

#### Acceptance Criteria

1. THE CV_Site SHALL include a dedicated "Key Projects" page accessible from the main navigation
2. THE Key Projects page SHALL present 3 to 5 major achievements as Card_Component elements
3. EACH project card SHALL include a title, context, technologies used, and key outcomes
4. THE Key Projects page SHALL be available in both French and English versions

### Requirement 10: LinkedIn-Ready Content

**User Story:** As a site owner, I want a pre-formatted file with my CV content structured for LinkedIn sections, so that I can easily update my LinkedIn profile by copy-pasting.

#### Acceptance Criteria

1. THE project SHALL include a `linkedin-content.md` file at the project root
2. THE linkedin-content.md SHALL contain content formatted for the LinkedIn Headline section
3. THE linkedin-content.md SHALL contain content formatted for the LinkedIn About/Summary section
4. THE linkedin-content.md SHALL contain content formatted for each LinkedIn Experience entry with title, company, dates, and bullet points
5. THE linkedin-content.md SHALL contain a list of skills formatted for the LinkedIn Skills section
6. THE linkedin-content.md SHALL be written in English (LinkedIn's primary professional language)

### Requirement 11: Site Metadata and SEO

**User Story:** As a site owner, I want proper metadata configured, so that the site is discoverable and presents well when shared.

#### Acceptance Criteria

1. THE CV_Site SHALL define a site name, description, and author in the MkDocs configuration
2. THE CV_Site SHALL include appropriate meta tags for social sharing (Open Graph)
3. THE CV_Site SHALL set the site URL to the GitHub Pages deployment URL
