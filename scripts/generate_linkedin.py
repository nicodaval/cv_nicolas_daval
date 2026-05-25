#!/usr/bin/env python3
"""
Generate linkedin-content.md from YAML data files using Jinja2 template.
Respects display flag (only includes display: true entries).

Usage:
  python scripts/generate_linkedin.py
"""

import os
import sys
import yaml
from jinja2 import Template

DATA_DIR = os.path.join(os.path.dirname(__file__), '..', 'data')
OUTPUT_FILE = os.path.join(os.path.dirname(__file__), '..', 'linkedin-content.md')


def read_yaml(filename):
    filepath = os.path.join(DATA_DIR, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        return yaml.safe_load(f)


def filter_display(entries):
    if not entries:
        return []
    return [e for e in entries if e.get('display', True) is not False]


def main():
    profile = read_yaml('profile.yml')
    experiences = filter_display(read_yaml('experiences.yml').get('experiences', []))
    skills_data = read_yaml('skills.yml')
    education = read_yaml('education.yml')
    interests = read_yaml('interests.yml')

    # Flatten all skills
    all_skills = []
    for cat in skills_data.get('categories', []):
        if cat.get('display', True) is not False:
            for s in cat.get('skills', []):
                if s.get('display', True) is not False:
                    all_skills.append(s['name'])

    # Soft skills
    soft_skills = filter_display(interests.get('soft_skills', []))

    template = Template(TEMPLATE, trim_blocks=True, lstrip_blocks=True)
    output = template.render(
        profile=profile,
        experiences=experiences,
        all_skills=all_skills,
        soft_skills=soft_skills,
        diplomas=filter_display(education.get('diplomas', [])),
        training=filter_display(education.get('training', [])),
    )

    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(output)

    print(f"Generated: {OUTPUT_FILE}")


TEMPLATE = """# LinkedIn Profile Content

> Pre-formatted content for LinkedIn sections. Generated from data/*.yml files.

---

## Headline

{{ profile.title }} | {{ all_skills[:6] | join(' | ') }} | 22+ years at {{ experiences[0].company if experiences else 'Stellantis Financial Services' }}

---

## About

{{ profile.summary_en | trim }}

---

## Experience

{% for exp in experiences %}
### {{ exp.title_en }}
**{{ exp.company }}**
{{ exp.start }} - {{ 'Present' if exp.end == 'present' else exp.end }}

{% for desc in exp.description_en[:5] %}
- {{ desc }}
{% endfor %}
- Technologies: {{ exp.technologies | join(', ') }}

{% endfor %}

---

## Skills

{{ all_skills | join(', ') }}

---

## Soft Skills

{% for ss in soft_skills %}
- {{ ss.name_en }}: {{ ss.detail_en }}
{% endfor %}

---

## Education

{% for d in diplomas %}
- {{ d.title_en }}{% if d.institution %} — {{ d.institution }}{% endif %} ({{ d.year }})
{% endfor %}

## Training

{% for t in training %}
- {{ t.name }}{% if t.provider %} ({{ t.provider }}){% endif %}
{% endfor %}
"""


if __name__ == '__main__':
    main()
