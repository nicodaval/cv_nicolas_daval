#!/usr/bin/env python3
"""
Generate public/cv.json from YAML data files.
This JSON file is consumable by AI agents, search engines, and APIs.
Respects display flag. Strips private data (salary, mobility).

Usage:
  python scripts/generate_json.py
"""

import os
import json
import yaml

DATA_DIR = os.path.join(os.path.dirname(__file__), '..', 'data')
OUTPUT_FILE = os.path.join(os.path.dirname(__file__), '..', 'public', 'cv.json')


def read_yaml(filename):
    filepath = os.path.join(DATA_DIR, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        return yaml.safe_load(f)


def filter_display(entries):
    if not entries:
        return []
    return [e for e in entries if e.get('display', True) is not False]


def clean_entry(entry):
    """Remove display flag from output."""
    cleaned = {k: v for k, v in entry.items() if k != 'display'}
    return cleaned


def main():
    profile = read_yaml('profile.yml')
    # Strip private data
    profile.pop('salary', None)
    profile.pop('mobility', None)
    profile.pop('personal_status', None)

    experiences = [clean_entry(e) for e in filter_display(
        read_yaml('experiences.yml').get('experiences', [])
    )]

    skills_raw = read_yaml('skills.yml').get('categories', [])
    skills = []
    for cat in skills_raw:
        if cat.get('display', True) is not False:
            cleaned_cat = {
                'name_fr': cat['name_fr'],
                'name_en': cat['name_en'],
                'skills': [
                    {'name': s['name'], 'level': s.get('level', '')}
                    for s in cat.get('skills', [])
                    if s.get('display', True) is not False
                ]
            }
            skills.append(cleaned_cat)

    education = read_yaml('education.yml')
    diplomas = [clean_entry(d) for d in filter_display(education.get('diplomas', []))]
    training = [clean_entry(t) for t in filter_display(education.get('training', []))]

    interests = read_yaml('interests.yml')
    soft_skills = [clean_entry(s) for s in filter_display(interests.get('soft_skills', []))]
    hobbies = [clean_entry(i) for i in filter_display(interests.get('interests', []))]

    cv_json = {
        "$schema": "https://schema.org",
        "@type": "Person",
        "profile": profile,
        "experiences": experiences,
        "skills": skills,
        "education": {
            "diplomas": diplomas,
            "training": training
        },
        "softSkills": soft_skills,
        "interests": hobbies,
        "metadata": {
            "generated": True,
            "source": "data/*.yml",
            "languages": ["fr", "en"]
        }
    }

    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(cv_json, f, ensure_ascii=False, indent=2)

    print(f"Generated: {OUTPUT_FILE}")


if __name__ == '__main__':
    main()
