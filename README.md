# punit461.github.io

Personal site and portfolio for Punit Bharadwaj — a React single-page app for the
portfolio itself, plus generated static pages for the blog and legal content.

## Stack

- **React 19 + TypeScript**, built with **Vite**
- **GSAP + ScrollTrigger** for scroll animation, **Lenis** for smooth scrolling
- **Three.js** (`@react-three/fiber`) for the hero scene, lazy-loaded and skipped on mobile
- **MUI** for the theme and tab primitives, **Framer Motion** for panel transitions
- Deployed to **GitHub Pages** by `.github/workflows/deploy.yml` on every push to `main`

## Commands

```bash
npm install
npm run dev      # dev server with HMR
npm run build    # tsc + vite build, then generates the static pages into dist/
npm run preview  # serve the built dist/ locally
npm run lint     # oxlint
```

## How the site is assembled

`npm run build` runs two stages:

1. **`vite build`** compiles the single-page app from `index.html` → `dist/index.html`.
   This is the portfolio: hero, about, skills, projects, journey, writing, contact.
2. **`node scripts/build-static.mjs`** generates everything that isn't the SPA —
   the blog index, one page per article, the legal pages, redirect stubs,
   `sitemap.xml` and `feed.xml`.

The articles are plain static HTML with no JavaScript, which keeps them fast and
fully crawlable for search and AdSense.

### URLs are deliberately preserved

Article and legal URLs match the previous Jekyll site exactly
(`/blog-building-toolzonex.html`, `/privacy.html`, …) so existing search rankings
and inbound links keep working. The old standalone `about.html`, `projects.html`
and `contact.html` pages are now sections of the SPA, so the generator emits
canonical redirect stubs at those paths instead of letting them 404.

## Where the content lives

| What | File |
| --- | --- |
| Bio, skills, awards, stats, milestones | `src/constants/data.ts` |
| Projects (shared by the SPA and generator) | `src/content/projects.json` |
| Article metadata | `src/content/blog.json` |
| Article bodies | `src/content/posts/*.html` |
| Privacy / terms copy | `src/content/legal/*.html` |
| Site-wide config (URL, email, AdSense ID) | `src/content/site.json` |
| Styling for generated pages | `scripts/templates/page.css` |

### Adding an article

1. Write the body as an HTML fragment in `src/content/posts/<slug>.html`
   (`<h2>`, `<p>`, `<ul>` — no `<html>` or `<body>` wrapper).
2. Add an entry to `src/content/blog.json`. The `url` field is the published path.
3. Optionally set `relatedProject` to a project `id` to render a related-project card.

The blog index, sitemap, RSS feed and the SPA's Writing section all pick it up
automatically.

## Unfinished content

Experience, education, and certifications are populated from the LinkedIn profile
export. What's still open is marked `TODO(punit)` in `src/constants/data.ts`:

- **Certification issuers and dates** — most weren't in the export, so only the name
  renders. Add `organization`, `date`, and `credentialUrl` and the UI fills them in.
- **`resumeUrl`** — unset, so the Download Resume buttons are hidden. Drop a file at
  `public/resume.pdf` and set `resumeUrl: "/resume.pdf"` to enable them.
- **`avatar` / `aboutImage`** — unset, so a `PB.` monogram renders instead of a photo.
- **Skill proficiency meters** — no `level` values are set, so no bars render. Add
  `level: 0-100` to any skill to show its meter.

Deliberately left off the public site: the home street address and phone number from
the LinkedIn export. The site is indexed and carries ads; publishing either invites
scraping. `location` is set to "Bengaluru, India" only.

## Contact form

The site is statically hosted, so there is no server to post to. The form currently
composes the message in the visitor's mail client. To receive submissions in the
background instead, create a free endpoint (Formspree, Web3Forms, …) and set
`FORM_ENDPOINT` in `src/services/contactService.ts`.
