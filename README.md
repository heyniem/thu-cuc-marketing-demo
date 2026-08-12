# Thu Cúc Nguyễn — Portfolio

A lightweight, accessible portfolio for Thu Cúc Nguyễn, a Marketing & Growth Specialist.

## What is included

- Source-backed work across OneLife membership, Garnier Vietnam and EVN Vietnam
- Clear labels that distinguish reported outcomes, campaign reach, programme targets and planned strategy
- Responsive hash routes for Home, Work, Experience, About and Contact
- Direct email, phone and CV links instead of a non-functional contact form
- A warm ivory and aubergine visual system with keyboard focus, reduced-motion support and responsive layouts

## Work on the source

This is a dependency-free static site. The editable source is in the project root.

## Publish safely

Use the `public/` folder for hosting. It contains only the finished site, its approved assets and the downloadable CV. It deliberately excludes the source portfolio deck and old planning material, which should stay private.

Refresh the folder after source edits:

```bash
./scripts/prepare-public.sh
```

Then serve only that folder with any static web server, for example:

```bash
cd public
python3 -m http.server 8080 --bind 127.0.0.1
```

## Routes

- `/#/`
- `/#/projects`
- `/#/projects/onelife`
- `/#/projects/garnier`
- `/#/projects/evn`
- `/#/experience`
- `/#/about`
- `/#/contact`

## Before public launch

Confirm permission to use client names, logos, campaign art and any third-party likenesses. CRM and Zalo screenshots that contained customer data were intentionally excluded.
