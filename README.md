# Nicolas DAVAL - CV Website

Bilingual (French/English) CV website for Nicolas DAVAL, Data Architect & Tech Lead with 22+ years of experience. Built with MkDocs and the Material theme, deployed on GitHub Pages.

🌐 **Live site**: [https://nicodaval.github.io/](https://nicodaval.github.io/)

## Prerequisites

- Python 3.12+
- pip

## Local Development

```bash
pip install -r requirements.txt
mkdocs serve
```

Then visit [http://127.0.0.1:8000](http://127.0.0.1:8000)

## Deployment

Deployment is automatic via GitHub Actions on every push to the `main` branch.

The workflow:
1. Builds the site with `mkdocs build --strict` (fails on warnings)
2. Deploys to GitHub Pages with `mkdocs gh-deploy --force`

No manual deployment steps are needed.

## Project Structure

```
├── mkdocs.yml                        # MkDocs configuration
├── requirements.txt                  # Python dependencies
├── README.md                         # This file
├── linkedin-content.md               # LinkedIn-ready content (English)
├── .github/workflows/deploy.yml      # CI/CD pipeline
└── docs/
    ├── index.fr.md                   # French CV (default)
    ├── index.en.md                   # English CV
    ├── projects.fr.md                # Key Projects (French)
    ├── projects.en.md                # Key Projects (English)
    ├── stylesheets/custom.css        # Custom CSS components
    └── assets/pdf/
        ├── cv-nicolas-daval-fr.pdf   # French PDF
        └── cv-nicolas-daval-en.pdf   # English PDF
```

## How to Update Content

1. Edit the `.md` files in `docs/`
2. Preview locally with `mkdocs serve`
3. Commit and push to `main` — deployment is automatic

## How to Update PDFs

PDFs are generated externally (e.g., export from a word processor, or print-to-PDF from the live site).

1. Generate the updated PDF
2. Replace the file in `docs/assets/pdf/`
3. Commit and push to `main`
