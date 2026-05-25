#!/usr/bin/env python3
"""
Generate PDF versions of the CV for both French and English.
Reads YAML data files, filters by published flag, strips private data,
and renders professional CV PDFs using WeasyPrint.
"""

import os
import yaml
from weasyprint import HTML

DATA_DIR = os.path.join(os.path.dirname(__file__), '..', 'data')
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'pdf')


def read_yaml(filename):
    """Read and parse a YAML file from the data directory."""
    filepath = os.path.join(DATA_DIR, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        return yaml.safe_load(f)


def filter_published(entries):
    """Filter entries by published flag. Exclude published: false."""
    if not entries:
        return []
    return [e for e in entries if e.get('published', True) is not False]


def get_profile():
    """Get profile data, stripping private fields (salary, mobility)."""
    data = read_yaml('profile.yml')
    data.pop('salary', None)
    data.pop('mobility', None)
    return data


def get_experiences():
    """Get experiences filtered by published flag."""
    data = read_yaml('experiences.yml')
    return filter_published(data.get('experiences', []))


def get_skills():
    """Get skill categories."""
    data = read_yaml('skills.yml')
    return data.get('categories', [])


def get_education():
    """Get education data filtered by published flag."""
    data = read_yaml('education.yml')
    return {
        'diplomas': filter_published(data.get('diplomas', [])),
        'training': filter_published(data.get('training', []))
    }


def localize(obj, field, lang):
    """Get the localized value of a field."""
    return obj.get(f'{field}_{lang}', obj.get(field, ''))


def generate_html(lang):
    """Generate HTML content for the CV in the specified language."""
    profile = get_profile()
    experiences = get_experiences()
    skills = get_skills()
    education = get_education()

    name = profile['name']
    title = profile['title']
    summary = profile.get(f'summary_{lang}', '')
    contact = profile.get('contact', {})

    # Section headers
    headers = {
        'fr': {
            'summary': 'Résumé',
            'experience': 'Parcours Professionnel',
            'skills': 'Compétences',
            'education': 'Formation',
            'training': 'Formations Professionnelles',
        },
        'en': {
            'summary': 'Summary',
            'experience': 'Career History',
            'skills': 'Skills',
            'education': 'Education',
            'training': 'Professional Training',
        }
    }
    h = headers[lang]

    # Build experience HTML
    exp_html = ''
    for exp in experiences:
        exp_title = localize(exp, 'title', lang)
        company = exp.get('company', '')
        start = exp.get('start', '')
        end = exp.get('end', '')
        period = f"{start} — {end}"
        descriptions = exp.get(f'description_{lang}', [])
        techs = exp.get('technologies', [])

        desc_items = ''.join(f'<li>{d}</li>' for d in descriptions)
        tech_str = ', '.join(techs) if techs else ''

        exp_html += f'''
        <div class="experience-item">
            <div class="exp-header">
                <strong>{exp_title}</strong> — {company}
                <span class="period">{period}</span>
            </div>
            <ul>{desc_items}</ul>
            {f'<p class="technologies"><em>{tech_str}</em></p>' if tech_str else ''}
        </div>
        '''

    # Build skills HTML
    skills_html = ''
    for category in skills:
        cat_name = localize(category, 'name', lang)
        skill_items = ', '.join(s['name'] for s in category.get('skills', []))
        skills_html += f'''
        <div class="skill-category">
            <strong>{cat_name}:</strong> {skill_items}
        </div>
        '''

    # Build education HTML
    edu_html = ''
    for diploma in education['diplomas']:
        diploma_title = localize(diploma, 'title', lang)
        institution = diploma.get('institution', '')
        year = diploma.get('year', '')
        edu_html += f'<div class="edu-item"><strong>{diploma_title}</strong> — {institution} ({year})</div>'

    # Build training HTML
    training_html = ''
    for t in education['training']:
        t_name = t.get('name', '')
        provider = t.get('provider', '')
        provider_str = f' — {provider}' if provider else ''
        training_html += f'<div class="training-item">{t_name}{provider_str}</div>'

    # Contact line
    contact_parts = []
    if contact.get('email'):
        contact_parts.append(contact['email'])
    if contact.get('linkedin'):
        contact_parts.append(contact['linkedin'])
    if contact.get('github'):
        contact_parts.append(contact['github'])
    contact_line = ' | '.join(contact_parts)

    html = f'''<!DOCTYPE html>
<html lang="{lang}">
<head>
    <meta charset="UTF-8">
    <title>CV — {name}</title>
    <style>
{get_css()}
    </style>
</head>
<body>
    <header>
        <h1>{name}</h1>
        <p class="title">{title}</p>
        <p class="contact">{contact_line}</p>
    </header>

    <section>
        <h2>{h['summary']}</h2>
        <p class="summary">{summary.strip()}</p>
    </section>

    <section>
        <h2>{h['experience']}</h2>
        {exp_html}
    </section>

    <section>
        <h2>{h['skills']}</h2>
        {skills_html}
    </section>

    <section>
        <h2>{h['education']}</h2>
        {edu_html}
    </section>

    <section>
        <h2>{h['training']}</h2>
        {training_html}
    </section>
</body>
</html>'''

    return html


def get_css():
    """Return the CSS for the PDF layout."""
    return '''
        @page {
            size: A4;
            margin: 20mm 18mm 20mm 18mm;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            font-size: 9.5pt;
            line-height: 1.4;
            color: #1a1a1a;
        }

        header {
            text-align: center;
            margin-bottom: 16pt;
            padding-bottom: 12pt;
            border-bottom: 1.5pt solid #2563eb;
        }

        h1 {
            font-size: 20pt;
            font-weight: 700;
            color: #111827;
            margin-bottom: 2pt;
        }

        .title {
            font-size: 12pt;
            color: #2563eb;
            margin-bottom: 6pt;
        }

        .contact {
            font-size: 8.5pt;
            color: #4b5563;
        }

        h2 {
            font-size: 11pt;
            font-weight: 700;
            color: #1e40af;
            margin-top: 14pt;
            margin-bottom: 8pt;
            padding-bottom: 3pt;
            border-bottom: 0.5pt solid #dbeafe;
            text-transform: uppercase;
            letter-spacing: 0.5pt;
        }

        .summary {
            font-size: 9.5pt;
            color: #374151;
            line-height: 1.5;
        }

        .experience-item {
            margin-bottom: 10pt;
            page-break-inside: avoid;
        }

        .exp-header {
            margin-bottom: 3pt;
        }

        .exp-header .period {
            float: right;
            font-size: 8.5pt;
            color: #6b7280;
        }

        ul {
            margin-left: 14pt;
            margin-top: 2pt;
        }

        li {
            margin-bottom: 1pt;
            font-size: 9pt;
            color: #374151;
        }

        .technologies {
            font-size: 8.5pt;
            color: #6b7280;
            margin-top: 3pt;
        }

        .skill-category {
            margin-bottom: 6pt;
            font-size: 9.5pt;
        }

        .edu-item {
            margin-bottom: 4pt;
            font-size: 9.5pt;
        }

        .training-item {
            margin-bottom: 3pt;
            font-size: 9pt;
            color: #374151;
        }

        section {
            page-break-inside: avoid;
        }
    '''


def main():
    """Generate PDFs for both languages."""
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    for lang in ['fr', 'en']:
        html_content = generate_html(lang)
        output_path = os.path.join(OUTPUT_DIR, f'cv-nicolas-daval-{lang}.pdf')

        html_doc = HTML(string=html_content)
        html_doc.write_pdf(output_path)

        print(f"Generated: {output_path}")


if __name__ == '__main__':
    main()
