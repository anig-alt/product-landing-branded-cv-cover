# Picsart – Professional CV & Cover Letter Design

Product showcase landing page for Picsart’s AI platform: turn your CV into a branded identity with matching cover letters.

## Features

**v1 (core landing page)**  
- Hero with headline, tagline, and CTA  
- Stats section  
- Features cards (Upload CV, AI Design Analysis, Generate Cover Letter)  
- Benefits section  
- Testimonials  
- Pricing (Free / Pro with Monthly / Yearly toggle)  
- Footer with links  

**Merged features**  
- Sticky navbar with smooth scrolling to sections  
- Active section highlight in the nav  
- Gallery (CV and cover letter examples) with Resume / Cover letter filters  
- Lightbox: click image to enlarge; prev/next buttons; keyboard (arrows, Escape)  
- CTA login modal (username or email + password, validation)  
- Dark mode toggle (preference saved in `localStorage`)  
- Responsive layout  

## How to run locally

1. Clone the repo: `git clone https://github.com/anig-alt/product-landing-branded-cv-cover.git`
2. Open the project folder and serve it (e.g. **Live Server** in VS Code, or `npx serve .`).
3. Open the URL in a browser (e.g. `http://localhost:3000`).

You can also open `index.html` directly in a browser (some behavior may differ without a server).

## Repo structure

```
├── index.html      # Main page markup
├── style.css       # Styles (including dark theme)
├── app.js          # Nav, modal, gallery lightbox & filters, pricing toggle, theme
├── assets/         # Images (CV & cover letter examples)
├── README.md
├── .gitignore
└── PULL_REQUEST*.md
```

## Live demo

**https://cv-cover-maker.netlify.app/**

## Team members

- [anig-alt](https://github.com/anig-alt)
