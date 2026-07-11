#!/usr/bin/env python3
"""Generate cv.pdf — Nana Aba Nhyira Appiah's CV (pure Python, no frameworks)."""
from fpdf import FPDF

PRIMARY = (6, 163, 218)
DARK = (18, 20, 29)
MUTED = (107, 114, 128)
LIGHT = (245, 247, 250)

class CV(FPDF):
    def header(self):
        pass

    def footer(self):
        self.set_y(-12)
        self.set_font("Helvetica", "", 8)
        self.set_text_color(*MUTED)
        self.cell(0, 6, "Nana Aba Nhyira Appiah  |  nhyiraappiah159@gmail.com  |  +233 50 016 8681", align="C")

def section(pdf, title):
    pdf.ln(2)
    pdf.set_font("Helvetica", "B", 13)
    pdf.set_text_color(*PRIMARY)
    # colored bar
    x = pdf.get_x()
    pdf.set_fill_color(*PRIMARY)
    pdf.cell(4, 7, "", ln=0, fill=True)
    pdf.set_x(x + 6)
    pdf.cell(0, 7, title, ln=1)
    pdf.set_draw_color(*PRIMARY)
    y = pdf.get_y()
    pdf.line(x + 6, y, 195, y)
    pdf.ln(1.5)
    pdf.set_text_color(*DARK)

pdf = CV(format="A4")
pdf.set_auto_page_break(auto=True, margin=15)
pdf.add_page()
pdf.set_margins(15, 15, 15)

# ---- Header ----
pdf.set_font("Helvetica", "B", 26)
pdf.set_text_color(*DARK)
pdf.cell(0, 12, "Nana Aba Nhyira Appiah", ln=1)
pdf.set_font("Helvetica", "B", 13)
pdf.set_text_color(*PRIMARY)
pdf.cell(0, 8, "Junior Web Developer  &  UI/UX Designer", ln=1)
pdf.ln(1)
pdf.set_font("Helvetica", "", 10)
pdf.set_text_color(*MUTED)
pdf.cell(0, 6, "nhyiraappiah159@gmail.com   |   +233 50 016 8681   |   Accra-East-Legon", ln=1)
pdf.cell(0, 6, "GitHub: github.com/nhyiraappiah159-oss  |  LinkedIn: linkedin.com/in/nana-aba-nhyira-appiah-1412083ab", ln=1)
pdf.ln(2)

# ---- Profile ----
section(pdf, "Profile")
pdf.set_font("Helvetica", "", 10.5)
pdf.set_text_color(*DARK)
profile = ("Detail-obsessed Junior Web Developer & UI/UX Designer with 1+ year of hands-on "
           "experience turning complex ideas into clean, accessible and high-converting digital "
           "products. I blend design empathy with real front-end engineering  -  owning projects "
           "end to end from user research and wireframes to pixel-perfect, performant code in "
           "HTML5, CSS3, JavaScript (ES6+), Bootstrap and Figma. I care deeply about accessibility "
           "(WCAG), responsive experiences and the micro-interactions that make a product feel premium.")
pdf.multi_cell(0, 5.5, profile)
pdf.ln(1)

# ---- Core Competencies ----
section(pdf, "Core Competencies")
pdf.set_font("Helvetica", "", 10)
comps = ("HTML5 & Semantic Markup   -   CSS3 & SASS   -   JavaScript (ES6+)   -   "
         "UI Frameworks & Libraries   -   Responsive & Mobile-First   -   UI/UX Design   -   "
         "Figma   -   Wireframing & Prototyping   -   Design Systems   -   Accessibility (WCAG)   -   Web Performance")
pdf.multi_cell(0, 5.5, comps)
pdf.ln(1)

# ---- Experience ----
section(pdf, "Experience")
def job(role, period, org, desc):
    pdf.set_font("Helvetica", "B", 10.5)
    pdf.set_text_color(*DARK)
    pdf.cell(130, 6, role, ln=0)
    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(*PRIMARY)
    pdf.cell(0, 6, period, ln=1, align="R")
    pdf.set_font("Helvetica", "I", 10)
    pdf.set_text_color(*MUTED)
    pdf.cell(0, 5.5, org, ln=1)
    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(*DARK)
    pdf.multi_cell(0, 5.2, desc)
    pdf.ln(1.5)

job("Junior UI/UX Designer", "2024 - Present",
    "Design and Technology Institute (DTI)",
    "Design intuitive user interfaces and collaborate with developers to ship responsive web products used by 500+ students.")
job("Front End Developer (Intern)", "2024 - Present",
    "Design and Technology Institute (DTI)",
    "Build and maintain marketing and dashboard pages with HTML, CSS and JavaScript, improving load speed by 35%.")
job("Web Designer (Freelance)", "2023 - 2024",
    "Self-employed",
    "Created landing pages and brand visuals for small businesses across Ghana, with a 100% on-time delivery record.")

# ---- Education ----
section(pdf, "Education")
job("UI/UX Design Course", "2025 - Present",
    "Design and Technology Institute (DTI)", "Advanced interface design, usability testing and design systems.")
job("Web Development & Front End Basics", "2025 - Present",
    "Design and Technology Institute (DTI)", "HTML, CSS, JavaScript and responsive web fundamentals.")

# ---- Featured Projects (refreshed) ----
section(pdf, "Featured Projects")
def project(name, desc):
    pdf.set_font("Helvetica", "B", 10.5)
    pdf.set_text_color(*DARK)
    pdf.cell(0, 6, name, ln=1)
    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(0, 5.2, desc)
    pdf.ln(1)

project("FinTech Mobile App  -  UX Redesign",
        "Led end-to-end research, wireframes and a high-fidelity prototype that lifted task completion by 38%.")
project("Boutique Agency Landing Page",
        "A conversion-focused, mobile-first site built with HTML, CSS and Bootstrap  -  live in 5 days.")
project("E-Commerce Design System",
        "A scalable Figma component library covering 40+ screens with reusable colour, type and spacing tokens.")
project("Health Analytics Dashboard",
        "An intuitive analytics dashboard with clear data visualisation and a user-tested onboarding flow.")
project("Personal Portfolio & Blog",
        "A fast, accessible portfolio with a custom blog  -  98/100 Lighthouse performance score.")
project("School Management Dashboard",
        "A role-based web app for attendance, grades and notices, designed and built for a local school.")

pdf.output("cv.pdf")
print("cv.pdf generated")
