# Ultra-Light Vanilla SPA Portfolio Plan

## 1. Goal

Build a **very lightweight personal portfolio SPA** inspired by:

- Caroline Dinh's portfolio structure and smooth SPA navigation
- Claude's warm, minimal, editorial visual style
- A strong engineering-focused presentation

The site should feel polished and modern while keeping runtime overhead as close to zero as practical.

---

## 2. Core Principles

### Technical

- No frontend framework
- No React
- No Vue
- No Svelte
- No runtime dependencies
- No router library
- No animation library
- No CSS framework
- No icon library
- No backend
- No database
- No Node.js required in production
- Progressive enhancement where practical

### Design

- Warm and calm
- Minimal
- Editorial
- Technical
- Spacious
- Few borders
- Almost no shadows
- Very subtle animation
- Content-first

---

## 3. Stack

Use only:

- HTML5
- CSS3
- Vanilla JavaScript
- Native ES modules if needed
- Inline SVG or small local SVG files
- AVIF/WebP images

Development server:

```bash
python3 -m http.server 8080
```

No package manager is required for the initial version.

---

## 4. SPA Architecture

Use a **single-document hash-router SPA**.

Routes:

```text
/#/
/#/experience
/#/projects
/#/about
```

All primary page content lives inside `index.html`.

Example:

```html
<main>
    <section data-route="/" id="home">
        ...
    </section>

    <section data-route="/experience" id="experience">
        ...
    </section>

    <section data-route="/projects" id="projects">
        ...
    </section>

    <section data-route="/about" id="about">
        ...
    </section>
</main>
```

JavaScript only decides which section is visible.

---

## 5. Router

Keep the router extremely small.

```js
const pages = document.querySelectorAll("[data-route]");

function route() {
    const path = location.hash.slice(1) || "/";

    pages.forEach(page => {
        page.hidden = page.dataset.route !== path;
    });

    window.scrollTo(0, 0);
}

window.addEventListener("hashchange", route);
route();
```

Responsibilities:

- Read the current hash
- Show the matching page
- Hide other pages
- Scroll to the top after navigation
- Update active navigation state
- Optionally update the document title

Avoid building a complex router.

---

## 6. Progressive Enhancement

The site should remain readable even if JavaScript fails.

Base HTML should contain all major content.

JavaScript should only add:

- SPA navigation
- active navigation state
- page transitions
- optional theme switching
- optional scroll effects

Do not make JavaScript responsible for generating the entire portfolio.

---

## 7. Recommended Project Structure

```text
portfolio/
│
├── index.html
│
├── css/
│   ├── variables.css
│   ├── base.css
│   ├── layout.css
│   └── components.css
│
├── js/
│   ├── app.js
│   └── router.js
│
├── assets/
│   ├── images/
│   ├── projects/
│   └── icons/
│
└── README.md
```

If the project remains tiny, CSS can later be merged into one `styles.css`.

---

## 8. Visual Direction

### Claude-Inspired Theme

The visual language should be inspired by Claude rather than copied exactly.

Characteristics:

- warm off-white background
- warm dark-gray text
- muted secondary text
- subtle beige/tan borders
- restrained terracotta/orange accent
- large whitespace
- soft corners
- almost no shadows
- typography-driven hierarchy

Initial CSS variables:

```css
:root {
    --bg: #f7f6f2;
    --surface: #efede7;
    --surface-hover: #e8e5de;

    --text: #292724;
    --text-secondary: #6b6862;
    --text-muted: #95918a;

    --border: #dedbd4;

    --accent: #c15f3c;
    --accent-hover: #a94f32;

    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 18px;

    --content-width: 1080px;
}
```

These are custom Claude-inspired tokens, not copied internal values.

---

## 9. Typography

Start with zero downloaded fonts.

```css
body {
    font-family:
        ui-sans-serif,
        system-ui,
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        sans-serif;
}
```

For editorial headings, optionally use:

```css
h1,
h2,
.display {
    font-family:
        Georgia,
        "Times New Roman",
        serif;
}
```

Goal:

```text
Font download size: 0 KB
```

A custom `.woff2` can be added later only if typography really needs it.

---

## 10. Main Routes

### Home

Purpose:

- immediately explain who I am
- show my engineering identity
- direct users toward work and experience

Suggested structure:

```text
Thu Cuc

Software Engineer

I enjoy understanding software from
high-level applications down to
databases, networking, and systems.

[View Experience]
[View Projects]
```

Optional small section:

```text
Currently exploring

Java · Linux · Networking · Distributed Systems
```

Avoid:

- skill progress bars
- rotating text
- particles
- GitHub stats clutter
- giant lists of technologies

---

### Experience

Use a clean vertical timeline.

```text
2026 — Present

Ringme
Software Engineer / Intern

Worked with production backend
systems and infrastructure.

Java · Spring Boot · MongoDB
Redis · Kafka · MySQL
```

Possible timeline appearance:

```text
2026
│
●  Ringme
│
│  Software Engineer
│
│  Production backend systems...
│
●  University / Thesis
│
│  Invoice AI System
│
...
```

Prefer content directly on the page instead of wrapping everything in cards.

---

### Projects

Present projects like engineering documents, not flashy portfolio cards.

```text
Selected Projects


Invoice AI System                         2026

AI-powered system for extracting and
managing structured invoice information.

Qwen3-VL · Flask · PostgreSQL · React

View →
```

Each project preview should include:

- title
- year
- one short description
- important technologies
- link to detail view

---

### About

Keep it short.

Possible topics:

- how I think about engineering
- why I enjoy low-level/system concepts
- what I am currently learning
- what kind of work interests me

Avoid turning this page into a biography.

---

### Contact

Keep contact information globally available, probably in the footer.

Possible links:

- GitHub
- LinkedIn
- Email

No separate contact page is required initially.

---

## 11. Project Detail Pages

Project pages should feel like small technical case studies.

Suggested structure:

```text
Project Name

Short summary


Overview
────────

What problem does this solve?


Architecture
────────────

System diagram


Engineering Decisions
─────────────────────

01. Design choice
02. Tradeoff
03. Data model
04. Performance decision


Challenges
──────────

What was difficult?


Lessons Learned
───────────────

What did I learn?


Technologies
────────────

Java · Redis · Kafka · ...
```

This is more valuable for an engineering portfolio than just screenshots.

---

## 12. Navigation

Desktop:

```text
Thu Cuc                       Experience   Projects   About
```

Suggested behavior:

- sticky navigation
- active route indicator
- no large sidebar
- no complex dropdowns

Mobile:

```text
Thu Cuc                                  Menu
```

The mobile menu should remain very small and simple.

---

## 13. Animation

Use CSS first.

```css
[data-route].active {
    animation: page-enter 280ms ease-out;
}

@keyframes page-enter {
    from {
        opacity: 0;
        transform: translateY(6px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

Project hover:

```css
.project-title {
    transition: transform 180ms ease;
}

.project:hover .project-title {
    transform: translateX(4px);
}
```

Animation rules:

- keep movement around 4–10 px
- keep duration around 150–300 ms
- avoid large entrance motion
- avoid constant animation
- no animation library

---

## 14. Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
}
```

---

## 15. Theme System

Prepare the CSS for light/dark themes even if dark mode is not implemented immediately.

```css
:root {
    --bg: ...;
    --text: ...;
}

[data-theme="dark"] {
    --bg: ...;
    --text: ...;
}
```

Possible future modes:

```text
Light
Dark
System
```

Version 1 can ship with only the warm Claude-inspired light theme.

---

## 16. Images

Images are likely to be the largest part of the site.

Prefer:

- AVIF
- WebP

Avoid unnecessarily large PNG files.

```html
<img
    src="assets/projects/invoice-ai.avif"
    alt="Invoice AI application"
    width="1200"
    height="750"
    loading="lazy"
    decoding="async"
>
```

Optimization rules:

- lazy-load images below the fold
- always specify width and height
- compress screenshots before deployment
- avoid background videos
- avoid animated GIFs

---

## 17. Icons

Do not install an icon library for a few icons.

Use:

- inline SVG
- small local SVG files

Likely required icons:

- GitHub
- LinkedIn
- Email
- External link
- Menu
- Close

---

## 18. Performance Budget

### Application Code

Target:

```text
HTML             < 40 KB
CSS              < 30 KB
JavaScript       < 10 KB
─────────────────────────
Total code       < 80 KB uncompressed
```

### Initial Page

Target:

```text
Fonts            0 KB
Libraries        0 KB
Initial images   < 500 KB
```

---

## 19. Accessibility

Minimum requirements:

- semantic HTML
- correct heading hierarchy
- keyboard-accessible navigation
- visible focus states
- descriptive image alt text
- sufficient color contrast
- reduced-motion support
- no important information encoded only by color

---

## 20. Responsive Design

Suggested breakpoints:

```css
/* Mobile first */

@media (min-width: 640px) {
    ...
}

@media (min-width: 900px) {
    ...
}
```

Do not create many breakpoints unless the layout genuinely needs them.

Primary goal:

- comfortable reading width
- readable typography
- no horizontal scrolling
- project layouts collapse naturally

---

## 21. Content Width

```css
.container {
    width: min(100% - 32px, 1080px);
    margin-inline: auto;
}
```

For long prose:

```css
.prose {
    max-width: 720px;
}
```

This supports the Claude/editorial feel.

---

## 22. SEO and Metadata

Even though the site behaves like an SPA, keep useful metadata in the HTML.

```html
<title>Thu Cuc — Software Engineer</title>

<meta
    name="description"
    content="Software engineering portfolio of Thu Cuc."
>
```

Also consider later:

- Open Graph metadata
- favicon
- canonical URL
- sitemap
- robots.txt

---

## 23. Deployment

The site is completely static.

Possible deployment targets:

- GitHub Pages
- Cloudflare Pages
- Netlify
- Vercel static hosting
- any simple nginx server

Production does not need:

- Docker
- Node.js
- Java
- database
- application server

Architecture:

```text
Browser
   │
   ▼
Static CDN / Web Server
   │
   ├── index.html
   ├── CSS
   ├── JavaScript
   └── images
```

---

## 24. Implementation Phases

### Phase 1 — Skeleton

Create:

- `index.html`
- base CSS
- route sections
- navigation
- footer

Goal: a fully readable portfolio with no JavaScript.

### Phase 2 — Claude-Inspired Theme

Implement:

- color variables
- typography
- spacing
- content widths
- borders
- navigation styling
- responsive layout

Goal: get the visual identity right before adding behavior.

### Phase 3 — SPA Router

Implement:

- hash routing
- route visibility
- active navigation state
- page title updates
- scroll reset

Goal: convert the static document into a tiny SPA.

### Phase 4 — Content

Add real content for:

- Home
- Experience
- Projects
- About
- Contact/footer

### Phase 5 — Project Case Studies

Create detailed technical project sections.

Each should explain:

- problem
- architecture
- engineering decisions
- challenges
- lessons

### Phase 6 — Motion

Add only:

- page fade/slide
- subtle project hover
- navigation transitions

Then add reduced-motion support.

### Phase 7 — Responsive Polish

Test:

- small phone
- large phone
- tablet
- laptop
- large desktop

### Phase 8 — Asset Optimization

Convert screenshots to AVIF/WebP.

Check:

- dimensions
- compression
- lazy loading
- initial transfer size

### Phase 9 — Performance Review

Check:

- total JS size
- total CSS size
- network requests
- unused assets
- layout shifts
- Lighthouse performance
- accessibility

---

## 25. Things We Intentionally Will Not Add

Unless a real need appears:

- React
- Vue
- Svelte
- Angular
- Tailwind
- Bootstrap
- Framer Motion
- GSAP
- jQuery
- router packages
- icon packages
- state management libraries
- analytics libraries
- CMS
- backend API
- database
- contact form backend
- web fonts
- heavy build system

---

## 26. Future Enhancements

Only consider these after the core portfolio is complete:

- dark mode
- View Transitions API
- small local custom font
- blog/articles
- project filtering
- lightweight analytics
- downloadable résumé
- custom domain
- minification build step

These should remain optional.

---

## 27. Final Architecture

```text
                  Browser
                     │
                     ▼
                 index.html
               /      |      \
              /       |       \
           CSS      app.js    assets
                      │
                      ▼
                 Hash Router
              /       |       \
             /        |        \
           Home   Experience   Projects
                              \
                               About
```

Runtime dependencies:

```text
0
```

Frameworks:

```text
0
```

Backend services:

```text
0
```

---

## 28. Final Direction

> **Claude-inspired editorial design + Caroline-style SPA portfolio structure + engineering case-study content.**

The result should feel:

- warm
- minimal
- technical
- calm
- fast
- intentional

The portfolio itself should demonstrate an engineering principle:

> Use the platform directly when the platform already solves the problem.
