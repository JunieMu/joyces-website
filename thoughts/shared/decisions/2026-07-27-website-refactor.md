---
date: 2026-07-27
source: grill-to-decisions
input: Full refactor of Joyce's personal website (architecture, design, colors, structure, content) — raw brief from Joyce
status: decided
---

# Design Decisions: Personal Website Refactor

## Decision 1: Primary audience

**Context**: The site must blend personal and professional; that blend needs a ranking function.
**Options**: A — recruiter/engineer-first (everything ranked by "does this help someone decide to interview Joyce in 30 seconds?") · B — general "this is me" page (personality structural, not seasoning).
**Decision**: **A — recruiter-first.** Joyce is a rising sophomore studying CS at Columbia; the site's job for the next few years is internship/new-grad hiring. Personality comes through voice, details, and design — not through hobbies getting equal billing with projects.

## Decision 2: Primary visitor action

**Context**: Decides the hero and layout priority.
**Decision**: **Projects are the main event**, front and center on the page. Resume, GitHub, and LinkedIn are one click away from the hero/nav. Projects are the proof for a student; the resume is the artifact recruiters save.

## Decision 3: Single page vs. multi-page

**Options**: A — single scrolling page with anchored nav · B — multi-page with per-project pages.
**Decision**: **A — single scrolling page.** Content volume (2 featured + 2 secondary projects, one job, short bio) fits one page; a tight single page reads more polished than sparse multi-pages. Design so per-project case-study pages can be added later without restructuring.

## Decision 4: Stack and hosting

**Context**: Current site is hand-written HTML + Bootstrap 5 via CDN (`index.html:8`), deployed to GitHub Pages. Joyce wants the rebuild to also be a learning artifact.
**Options**: Modern vanilla HTML/CSS (least maintenance) · Astro (components, static-first, modern talking point) · Next.js/React (heavier, industry-standard resume line).
**Decision**: **Astro, deployed on Vercel.** Joyce is moving off GitHub Pages to Vercel (her call, stated explicitly). Bootstrap is dropped entirely. Astro gives real components and a build step while staying static and zero-JS by default; Vercel gives zero-config deploys and per-commit previews.

## Decision 5: Visual direction

**Context**: Current personality is carried by full-bleed pastel bands (pink `#facfcf`, yellow `#fef0d6`, blue `#d2dae9` — `style.css:1-11`), which is what reads as unprofessional ("Bootstrap template painted pink").
**Options**: A — neutral canvas with pastel accents · B — muted color-blocked sections · C — full rebrand to editorial/moody.
**Decision**: **A — neutral canvas (white/warm off-white), generous whitespace, blush pink as THE accent color** (links, buttons, hovers, small details), warm cream as optional secondary. Yellow/blue bands are gone. The site stays unmistakably Joyce's — just quieter about it. No dark mode in v1; single light editorial theme.

## Decision 6: Typography

**Context**: Playfair Display (`style.css:19`) reads wedding-invitation; Montserrat is generic.
**Decision**: **Fraunces for display/headings, Work Sans for body.** Keeps the serif-display-plus-sans-body contrast (that contrast is part of the personal touch) but in an editorial, contemporary register. Chosen explicitly by Joyce.

## Decision 7: Cut the high-school achievement lists

**Context**: "Competitions/Events" (CyberStart, CS UIL, picoCTF, CyberPatriot, FBLA — `index.html:150-156`) and "High School Projects" list (`index.html:167-171`) read younger than a Columbia CS student and work against the professional read.
**Decision**: **Cut both lists entirely.** Joyce confirmed nothing there is worth fighting for. HS-era *projects* survive only as demoted portfolio items (see Decision 9).

## Decision 8: Page structure (single-page section order)

**Decision**:
1. **Hero** — "Joyce Ma" (not "Joyce's Website"), one-sentence intro doing the personal/professional blend in prose (CS @ Columbia, building things, reader/painter/cat person), links: GitHub · LinkedIn · Resume · Email.
2. **Projects** — featured work (see Decision 9).
3. **Experience** — HeyBuddy (see Decision 10).
4. **About** — compressed personal section, prose-first; profile photo lives here, not the hero.
5. **Footer** — contact repeat + socials.

Projects before Experience: for a rising sophomore, projects are stronger evidence than short work stints.

## Decision 9: Project lineup

**Context**: Inventory from Joyce — (1) closet planning app, recently refactored, live at https://juniemu.github.io/joyces-closet/; (2) meme-rating app for AI-generated memes built for a class with OAuth + Supabase, **demo permanently offline** (lost access to the class Supabase instance); (3) HS-era CakeQuest (github.com/JunieMu/CakeQuest) and 2048 (github.com/JunieMu/Game2048).
**Decision**:
- **Featured (with visuals): Closet app + meme-rating app.** Closet leads as live + personal + refactored. Meme rater is featured for technical depth (OAuth, Supabase); present with screenshots/GIF and GitHub link plus an honest "demo currently offline" note — the code and stack carry the value.
- **Secondary: CakeQuest + 2048 in a compact "more projects" row** — demoted, not cut; they're the personal-touch survivors.

## Decision 10: Experience section content

**Decision**: **HeyBuddy** — B2B SaaS; built software for CSMs and businesses to manage their portfolio of customers, automatically draft emails, and have Buddy investigate their book of business. Short, resume-style entry but written with voice. Room for future TA/research entries.

## Decision 11: Personal content budget

**Context**: Current site has a 2×2 hobby icon-card grid (reading, coding, art, nails — `index.html:71-115`), cat Louis, cheesecake, favorite books, Goodreads + Instagram in footer.
**Decision**: **Keep the texture, compress the format.** About section is a short prose paragraph with genuine specifics (Louis, The Poppy War / Red Rising, painting/digital art) instead of hobby cards. **Goodreads link stays** (great personal-professional blend signal). **Instagram is dropped** (Joyce's explicit call).

## Decision 12: Resume and contact

**Decision**: **Host a resume PDF, link it from hero/nav; display email visibly** (hero links + footer). For internship season, friction kills.

## Decision 13: Demo media format — video, not GIF

**Context**: Current demos are GIFs; `cakequestdemo.gif` alone is 5.1 MB (repo root). GIF = 256 colors, no real compression — huge files, worse quality.
**Options**: GIFs (zero markup effort, massive files) · embedded `<video autoplay muted loop playsinline>` (GIF-identical behavior incl. mobile, ~5–10× smaller, higher quality, poster + lazy-load support).
**Decision**: **MP4 (H.264) videos styled to behave like GIFs** — `autoplay muted loop playsinline`, `poster` frame, `preload="metadata"`/lazy loading, and pause autoplay under `prefers-reduced-motion`. Convert existing GIFs once via ffmpeg (`ffmpeg -i in.gif -movflags faststart -pix_fmt yuv420p out.mp4`); record future demos as screen recordings directly.

## Codebase Findings

- Entire site is one `index.html` (261 lines) + `style.css` (72 lines); Bootstrap 5.3.3 CSS+JS via CDN (`index.html:8`, `index.html:259`); Google Fonts Montserrat + Playfair Display.
- Existing assets: `closetdemo.gif`, `cakequestdemo.gif`, `game2048demo.gif` (repo root), `images/profile.JPG`, `images/goodreads.svg`.
- Heading hierarchy is broken — `h1` reused for every project title mid-page (`index.html:187`, `index.html:204`, `index.html:226`).
- No GitHub profile link, LinkedIn, resume, or email anywhere on the current site; only Goodreads (goodreads.com/juniemu) and Instagram in the footer (`index.html:250-254`).
- Dead SVG reference in footer (`xlink:href="#bootstrap"`, `index.html:244`) — symbol never defined.
- Repo currently deployed at https://juniemu.github.io/joyces-website/ (per README.txt); moving to Vercel.

**Assets the planner must collect from Joyce** (not in repo): resume PDF; GitHub + LinkedIn URLs; meme-rater repo link and screenshots/GIF of it working; HeyBuddy role title + dates; confirm current profile photo or a new one.

## Open Questions (deliberately left to /create_plan)

- Astro project scaffolding details (repo layout, whether to keep this repo or start fresh in-place).
- Exact accent-color values (refine blush pink from `#facfcf` to something with enough contrast for links/buttons on white — needs a contrast-checked pass).
- Project card/row layout specifics within the decided structure.
- Analytics (Vercel Analytics is a cheap optional add).
- Copywriting passes for hero one-liner, project blurbs, About prose — decisions above fix the content and tone; exact words at implementation time.

## Out of Scope

- Resurrecting the meme-rater backend (new Supabase instance) — future project, not part of the website refactor.
- Custom domain purchase/setup on Vercel — later, deployment-time concern.
- Dark mode.
- Per-project case-study pages and any blog — structure should not preclude them, but v1 ships without.
