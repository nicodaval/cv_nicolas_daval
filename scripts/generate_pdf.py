#!/usr/bin/env python3
"""
Generate PDF versions of the CV for both French and English.
Two-column layout: dark sidebar (left) + content area (right).
Style inspired by modern CV templates (Lucas Fontaine style, no photo).

Usage:
  python scripts/generate_pdf.py          # Public mode: respects display flag
  python scripts/generate_pdf.py --full   # Full mode: includes all entries
"""

import os
import sys
import yaml
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm, cm
from reportlab.lib.colors import HexColor, white, Color
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.platypus import Paragraph, Spacer
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# Parse --full flag
FULL_MODE = '--full' in sys.argv

DATA_DIR = os.path.join(os.path.dirname(__file__), '..', 'data')
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'pdf')

# Colors
SIDEBAR_BG = HexColor('#1e293b')       # Dark slate
SIDEBAR_ACCENT = HexColor('#3b82f6')   # Blue accent
SIDEBAR_TEXT = HexColor('#e2e8f0')     # Light gray text
SIDEBAR_HEADING = HexColor('#ffffff')   # White headings
MAIN_BG = HexColor('#ffffff')
MAIN_TEXT = HexColor('#1e293b')
MAIN_SECONDARY = HexColor('#64748b')
MAIN_ACCENT = HexColor('#2563eb')
SECTION_LINE = HexColor('#3b82f6')

# Page dimensions
PAGE_W, PAGE_H = A4
SIDEBAR_W = 65 * mm
MAIN_X = SIDEBAR_W + 8 * mm
MAIN_W = PAGE_W - MAIN_X - 12 * mm
MARGIN_TOP = 15 * mm
SIDEBAR_PADDING = 8 * mm


def read_yaml(filename):
    filepath = os.path.join(DATA_DIR, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        return yaml.safe_load(f)


def filter_entries(entries):
    if not entries:
        return []
    if FULL_MODE:
        return entries
    return [e for e in entries if e.get('display', True) is not False]


def get_profile():
    data = read_yaml('profile.yml')
    return data


def get_experiences():
    data = read_yaml('experiences.yml')
    return filter_entries(data.get('experiences', []))


def get_skills():
    data = read_yaml('skills.yml')
    cats = data.get('categories', [])
    if not FULL_MODE:
        cats = [c for c in cats if c.get('display', True) is not False]
        for c in cats:
            c['skills'] = [s for s in c.get('skills', []) if s.get('display', True) is not False]
    return cats


def get_education():
    data = read_yaml('education.yml')
    return {
        'diplomas': filter_entries(data.get('diplomas', [])),
        'training': filter_entries(data.get('training', []))
    }


def get_interests():
    data = read_yaml('interests.yml')
    return {
        'soft_skills': filter_entries(data.get('soft_skills', [])),
        'interests': filter_entries(data.get('interests', []))
    }


def localize(obj, field, lang):
    return obj.get(f'{field}_{lang}', obj.get(field, ''))


def draw_sidebar(c, profile, skills, education, interests_data, lang):
    """Draw the dark sidebar on the left."""
    # Background
    c.setFillColor(SIDEBAR_BG)
    c.rect(0, 0, SIDEBAR_W, PAGE_H, fill=1, stroke=0)

    y = PAGE_H - MARGIN_TOP
    x = SIDEBAR_PADDING

    # Name
    c.setFillColor(SIDEBAR_HEADING)
    c.setFont('Helvetica-Bold', 16)
    c.drawString(x, y, profile['name'].split()[0])
    y -= 18
    c.drawString(x, y, profile['name'].split()[-1])
    y -= 22

    # Title
    c.setFillColor(SIDEBAR_ACCENT)
    c.setFont('Helvetica', 9)
    c.drawString(x, y, profile['title'])
    y -= 20

    # Blue accent line
    c.setStrokeColor(SIDEBAR_ACCENT)
    c.setLineWidth(2)
    c.line(x, y, SIDEBAR_W - SIDEBAR_PADDING, y)
    y -= 15

    # Contact
    c.setFillColor(SIDEBAR_HEADING)
    c.setFont('Helvetica-Bold', 8)
    c.drawString(x, y, 'CONTACT')
    y -= 14

    c.setFillColor(SIDEBAR_TEXT)
    c.setFont('Helvetica', 7.5)
    contact = profile.get('contact', {})

    if profile.get('location'):
        c.drawString(x + 2, y, f"📍 {profile['location']}")
        y -= 11
    if contact.get('email'):
        c.drawString(x + 2, y, f"✉ {contact['email']}")
        y -= 11
    if contact.get('linkedin'):
        linkedin_short = contact['linkedin'].replace('https://', '')
        c.drawString(x + 2, y, f"🔗 {linkedin_short}")
        y -= 11

    y -= 10

    # Languages
    c.setFillColor(SIDEBAR_HEADING)
    c.setFont('Helvetica-Bold', 8)
    lang_header = 'LANGUES' if lang == 'fr' else 'LANGUAGES'
    c.drawString(x, y, lang_header)
    y -= 14

    c.setFillColor(SIDEBAR_TEXT)
    c.setFont('Helvetica', 7.5)
    for language in profile.get('languages', []):
        c.drawString(x + 2, y, f"• {language['name']}")
        y -= 10
        c.setFont('Helvetica', 6.5)
        c.drawString(x + 8, y, language['level'])
        c.setFont('Helvetica', 7.5)
        y -= 12

    y -= 8

    # Skills (compact with level)
    c.setFillColor(SIDEBAR_HEADING)
    c.setFont('Helvetica-Bold', 8)
    skills_header = 'COMPÉTENCES' if lang == 'fr' else 'SKILLS'
    c.drawString(x, y, skills_header)
    y -= 12

    sidebar_text_w = SIDEBAR_W - SIDEBAR_PADDING * 2 - 4
    for category in skills:
        if y < 25 * mm:
            break
        cat_name = localize(category, 'name', lang)
        c.setFillColor(SIDEBAR_ACCENT)
        c.setFont('Helvetica-Bold', 6.5)
        c.drawString(x + 2, y, cat_name)
        y -= 9

        c.setFont('Helvetica', 6.5)
        for skill in category.get('skills', []):
            if y < 20 * mm:
                break
            name = skill['name']
            level = skill.get('level', '')

            # Draw skill name on left, level on right
            c.setFillColor(SIDEBAR_TEXT)
            # Truncate name only if really necessary (very tight)
            max_name_w = sidebar_text_w - pdfmetrics.stringWidth(level, 'Helvetica', 6) - 8
            display_name = name
            while pdfmetrics.stringWidth(display_name, 'Helvetica', 6.5) > max_name_w and len(display_name) > 3:
                display_name = display_name[:-2] + '…'

            c.drawString(x + 4, y, f"• {display_name}")
            # Level aligned right in lighter color
            c.setFillColor(SIDEBAR_ACCENT)
            c.setFont('Helvetica', 5.5)
            c.drawRightString(SIDEBAR_W - SIDEBAR_PADDING, y, level)
            c.setFont('Helvetica', 6.5)
            y -= 8
        y -= 3

    # Soft skills at bottom if space
    if y > 50 * mm:
        y -= 8
        c.setFillColor(SIDEBAR_HEADING)
        c.setFont('Helvetica-Bold', 8)
        ss_header = 'SOFT SKILLS' if lang == 'fr' else 'SOFT SKILLS'
        c.drawString(x, y, ss_header)
        y -= 14

        c.setFillColor(SIDEBAR_TEXT)
        c.setFont('Helvetica', 7)
        sidebar_ss_w = SIDEBAR_W - SIDEBAR_PADDING * 2 - 4
        for ss in interests_data.get('soft_skills', [])[:4]:
            name = localize(ss, 'name', lang)
            text = f"• {name}"
            text_w = pdfmetrics.stringWidth(text, 'Helvetica', 7)
            if text_w > sidebar_ss_w:
                words = name.split()
                line1 = '• '
                line2_words = []
                for word in words:
                    test = line1 + word + ' '
                    if pdfmetrics.stringWidth(test, 'Helvetica', 7) < sidebar_ss_w:
                        line1 = test
                    else:
                        line2_words.append(word)
                c.drawString(x + 2, y, line1.strip())
                y -= 9
                if line2_words:
                    c.drawString(x + 8, y, ' '.join(line2_words))
                    y -= 9
            else:
                c.drawString(x + 2, y, text)
                y -= 10

    # Interests (hobbies) at the very bottom if space
    if y > 30 * mm and interests_data.get('interests'):
        y -= 8
        c.setFillColor(SIDEBAR_HEADING)
        c.setFont('Helvetica-Bold', 8)
        int_header = "CENTRES D'INTÉRÊT" if lang == 'fr' else 'INTERESTS'
        c.drawString(x, y, int_header)
        y -= 12

        c.setFillColor(SIDEBAR_TEXT)
        c.setFont('Helvetica', 7)
        for interest in interests_data.get('interests', []):
            if y < 15 * mm:
                break
            name = localize(interest, 'name', lang)
            detail = localize(interest, 'detail', lang)
            c.setFont('Helvetica-Bold', 6.5)
            c.drawString(x + 2, y, f"• {name}")
            y -= 9
            if detail:
                c.setFont('Helvetica', 6)
                c.setFillColor(SIDEBAR_TEXT)
                # Wrap detail if needed
                sidebar_int_w = SIDEBAR_W - SIDEBAR_PADDING * 2 - 8
                detail_w = pdfmetrics.stringWidth(detail, 'Helvetica', 6)
                if detail_w > sidebar_int_w:
                    words = detail.split()
                    line = ''
                    for word in words:
                        test = f"{line} {word}".strip()
                        if pdfmetrics.stringWidth(test, 'Helvetica', 6) < sidebar_int_w:
                            line = test
                        else:
                            if line:
                                c.drawString(x + 8, y, line)
                                y -= 8
                            line = word
                    if line:
                        c.drawString(x + 8, y, line)
                        y -= 8
                else:
                    c.drawString(x + 8, y, detail)
                    y -= 9


def draw_main_content(c, profile, experiences, education, lang):
    """Draw the main content area on the right."""
    y = PAGE_H - MARGIN_TOP
    x = MAIN_X
    max_w = MAIN_W

    headers = {
        'fr': {
            'summary': 'PROFIL PROFESSIONNEL',
            'experience': 'EXPÉRIENCES PROFESSIONNELLES',
            'education': 'FORMATION',
            'training': 'FORMATIONS PROFESSIONNELLES',
        },
        'en': {
            'summary': 'PROFESSIONAL PROFILE',
            'experience': 'PROFESSIONAL EXPERIENCE',
            'education': 'EDUCATION',
            'training': 'PROFESSIONAL TRAINING',
        }
    }
    h = headers[lang]

    # Summary
    y = draw_section_header(c, h['summary'], x, y)
    summary = profile.get(f'summary_{lang}', '').strip()
    if summary:
        y = draw_wrapped_text(c, summary, x, y, max_w, 'Helvetica', 8, MAIN_SECONDARY, leading=11)
    y -= 8

    # Experience
    y = draw_section_header(c, h['experience'], x, y)

    for exp in experiences:
        if y < 40 * mm:
            c.showPage()
            draw_sidebar_bg(c)
            y = PAGE_H - MARGIN_TOP

        exp_title = localize(exp, 'title', lang)
        company = exp.get('company', '')
        start = exp.get('start', '')
        end = exp.get('end', '')
        if end == 'present':
            end = 'Présent' if lang == 'fr' else 'Present'
        period = f"{start} - {end}"

        # Company and period
        c.setFillColor(MAIN_ACCENT)
        c.setFont('Helvetica-Bold', 7)
        c.drawString(x, y, f"{company}")
        c.setFillColor(MAIN_SECONDARY)
        c.setFont('Helvetica', 7)
        c.drawRightString(x + max_w, y, period)
        y -= 12

        # Title
        c.setFillColor(MAIN_TEXT)
        c.setFont('Helvetica-Bold', 9)
        c.drawString(x, y, exp_title)
        y -= 12

        # Description bullets
        descriptions = exp.get(f'description_{lang}', [])
        c.setFont('Helvetica', 7)
        c.setFillColor(MAIN_SECONDARY)
        for desc in descriptions[:4]:  # Limit to 4 bullets for space
            if y < 25 * mm:
                break
            y = draw_wrapped_text(c, f"• {desc}", x + 3, y, max_w - 6, 'Helvetica', 7, MAIN_SECONDARY, leading=9)

        # Technologies
        techs = exp.get('technologies', [])
        if techs:
            c.setFont('Helvetica-Oblique', 6.5)
            c.setFillColor(MAIN_ACCENT)
            tech_str = ', '.join(techs)
            # Wrap tech line if too wide
            y = draw_wrapped_text(c, tech_str, x + 3, y, max_w - 6, 'Helvetica-Oblique', 6.5, MAIN_ACCENT, leading=9)

        y -= 4

    # Education
    if y < 45 * mm:
        c.showPage()
        draw_sidebar_bg(c)
        y = PAGE_H - MARGIN_TOP

    y = draw_section_header(c, h['education'], x, y)

    for diploma in education['diplomas']:
        diploma_title = localize(diploma, 'title', lang)
        institution = diploma.get('institution') or ''
        year = diploma.get('year', '')

        c.setFillColor(MAIN_TEXT)
        c.setFont('Helvetica-Bold', 8)
        c.drawString(x, y, diploma_title)
        c.setFillColor(MAIN_SECONDARY)
        c.setFont('Helvetica', 7)
        c.drawRightString(x + max_w, y, str(year))
        y -= 10
        if institution:
            c.drawString(x + 2, y, institution)
            y -= 10
        y -= 4

    # Training
    if education['training']:
        y -= 4
        y = draw_section_header(c, h['training'], x, y)
        c.setFillColor(MAIN_SECONDARY)
        c.setFont('Helvetica', 7.5)
        for t in education['training']:
            t_name = t.get('name', '')
            provider = t.get('provider')
            text = f"• {t_name}" + (f" ({provider})" if provider else "")
            c.drawString(x + 2, y, text)
            y -= 10


def draw_sidebar_bg(c):
    """Draw just the sidebar background (for additional pages)."""
    c.setFillColor(SIDEBAR_BG)
    c.rect(0, 0, SIDEBAR_W, PAGE_H, fill=1, stroke=0)


def draw_section_header(c, text, x, y):
    """Draw a section header with blue underline."""
    c.setFillColor(MAIN_TEXT)
    c.setFont('Helvetica-Bold', 9)
    c.drawString(x, y, text)
    y -= 3
    c.setStrokeColor(SECTION_LINE)
    c.setLineWidth(1.5)
    c.line(x, y, x + 40 * mm, y)
    y -= 12
    return y


def draw_wrapped_text(c, text, x, y, max_width, font, size, color, leading=10):
    """Draw text that wraps within max_width."""
    c.setFont(font, size)
    c.setFillColor(color)

    # Simple word wrapping
    words = text.split()
    line = ''
    for word in words:
        test_line = f"{line} {word}".strip()
        if pdfmetrics.stringWidth(test_line, font, size) < max_width:
            line = test_line
        else:
            if line:
                c.drawString(x, y, line)
                y -= leading
            line = word
    if line:
        c.drawString(x, y, line)
        y -= leading

    return y


def build_pdf(lang):
    """Build the PDF for a given language."""
    profile = get_profile()
    experiences = get_experiences()
    skills = get_skills()
    education = get_education()
    interests_data = get_interests()

    os.makedirs(OUTPUT_DIR, exist_ok=True)
    output_path = os.path.join(OUTPUT_DIR, f'cv-nicolas-daval-{lang}.pdf')

    c = canvas.Canvas(output_path, pagesize=A4)

    # Draw sidebar
    draw_sidebar(c, profile, skills, education, interests_data, lang)

    # Draw main content
    draw_main_content(c, profile, experiences, education, lang)

    c.save()
    print(f"Generated: {output_path}")


def main():
    mode = "FULL (all entries)" if FULL_MODE else "PUBLIC (display: true only)"
    print(f"Generating PDFs in {mode} mode...")
    for lang in ['fr', 'en']:
        build_pdf(lang)


if __name__ == '__main__':
    main()
