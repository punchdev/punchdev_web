# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website repository for punchDev Marketing (punchdev.net), hosted via GitHub Pages with a custom domain. The site serves as a landing page for an AI-powered B2B SaaS lead generation service, with additional pages for PlantWatch app privacy policy and data deletion requests.

## Repository Structure

- **index.html** - Main landing page for punchDev Marketing with AI lead generation services
- **book.html** - Calendly redirect for booking discovery calls
- **plantwatch_privacy.html** - Privacy policy for the PlantWatch mobile app
- **plantwatch_delete.html** - Data deletion request form for PlantWatch users
- **gdpic.png** - Profile photo (Georges Duplessy)
- **CNAME** - Custom domain configuration for GitHub Pages (punchdev.net)

## Key Architecture Details

### Main Landing Page (index.html)

The landing page is a single-file HTML application with embedded CSS and JavaScript. Key architectural elements:

- **Color Scheme**: Uses CSS custom properties (`:root` variables) for brand colors:
  - Primary: `--punch-red: #C41E3A`
  - Background: `--black: #0A0A0B`
  - Grays for hierarchy

- **Typography**:
  - Headers: 'Space Grotesk' (Google Fonts)
  - Body: 'DM Sans' (Google Fonts)

- **Visual Effects**:
  - SVG-based grain overlay for texture (fixed position, `::before` pseudo-element)
  - Radial gradients for hero background
  - CSS grid pattern background with masking
  - Intersection Observer API for scroll-based animations

- **Sections**:
  1. Navigation (sticky, with scroll effects)
  2. Hero (value proposition)
  3. Problem (pain points with stat cards)
  4. Solution (4-column feature grid)
  5. Social Proof (currently commented out)
  6. About (2-column grid with photo)
  7. CTA (call-to-action with rotating glow animation)
  8. Footer

- **Analytics**: Google Analytics (gtag.js) with ID `G-NMK55H6FW2`

### PlantWatch Pages

- **plantwatch_privacy.html**: Markdown-to-HTML privacy policy covering Supabase, PlantNet API, and Anthropic Claude API
- **plantwatch_delete.html**: Formspree-integrated deletion request form (form ID: `xnjnegkw`)

## Development Workflow

### Viewing Changes Locally

Since this is a static site, you can:
1. Open HTML files directly in a browser
2. Use a local server: `python -m http.server 8000` or `npx serve`

### Deploying Changes

This repository uses GitHub Pages for hosting:
1. Commit changes to the `main` branch
2. Push to GitHub: `git push origin main`
3. GitHub Pages automatically deploys from the `main` branch
4. Site is accessible at https://punchdev.net

### Git Commands

```bash
# View current status
git status

# Stage and commit changes
git add <files>
git commit -m "Description of changes"

# Push to GitHub Pages
git push origin main

# View commit history
git log --oneline
```

## Design System

### Responsive Breakpoints

- Desktop: Default (>1024px)
- Tablet: 768px - 1024px (features grid: 2 columns)
- Mobile: <768px (single column layouts, adjusted padding)

### Animation Patterns

- **Fade-in-up**: Used for hero content and section headers (30px Y-translate)
- **Hover transforms**: Consistent -4px to -8px translateY on cards/buttons
- **Stagger delays**: Feature cards (0.1s increments), stat cards (0.15s increments)
- **Transitions**: Consistent 0.3s - 0.6s ease timing

## Important Notes

- All CTAs link to `/book.html` which redirects to Calendly
- The social proof section is commented out (awaiting client testimonials)
- Profile photo `gdpic.png` is 1.5MB - consider optimizing if performance is a concern
- No build process or dependencies - pure HTML/CSS/JS
- Google Analytics is configured for production tracking
