# Personal Website Refactor — Implementation Plan

## Overview

Rebuild joyces-website from a Bootstrap 5 pastel-band single page into a recruiter-first, single-page Astro site deployed on Vercel — neutral warm canvas, blush-rose accent system, Fraunces/Work Sans typography, projects front and center, MP4 demo videos instead of GIFs. All design decisions are already locked in `thoughts/shared/decisions/2026-07-27-website-refactor.md`; this plan is the execution spec.

## Current State Analysis

- Entire site is `index.html` (261 lines) + `style.css` (72 lines); Bootstrap 5.3.3 via CDN (`index.html:8`, `index.html:259`); Google Fonts Montserrat + Playfair Display.
- Full-bleed pastel bands (pink `#facfcf`, yellow `#fef0d6`, blue `#d2dae9` — `style.css:1-11`) carry the personality; reads "Bootstrap template painted pink".
- Broken heading hierarchy: `h1` reused for every project title (`index.html:187`, `index.html:204`, `index.html:226`).
- No GitHub/LinkedIn/resume/email links anywhere; footer has Goodreads + Instagram only (`index.html:250-254`) and a dead `#bootstrap` SVG ref (`index.html:244`).
- Demo media: `closetdemo.gif` (650 KB), `cakequestdemo.gif` (5.1 MB), `game2048demo.gif` (166 KB) at repo root.
- **New source recordings (untracked, added 2026-07-27)**: `TheHumorProjectRatingApp.mov` (6.9 MB), `TheHumorProjectPiplineApp.mov` (14 MB) — demos for the two Humor Project apps.
- `images/profilepic.JPG` (555 KB, new photo — use this) and `images/profile.JPG` (3 MB, old — delete).
- `.DS_Store` and `images/.DS_Store` are tracked in git.
- Deployed via GitHub Pages at juniemu.github.io/joyces-website; remote `github.com/JunieMu/joyces-website`.
- Environment: Node v25.5.0, npm 11.8.0 installed; **ffmpeg NOT installed** (Phase 2 installs it). macOS.

## Desired End State

A single-page Astro site in this same repo, deployed on Vercel with Web Analytics enabled and GitHub Pages disabled:

- **Sections in order**: sticky slim header (anchor nav) → Hero → Projects (2 featured + 2 secondary) → Experience → About → Footer.
- **Featured projects**: Joyce's Closet (live link) and The Humor Project (two labeled demo videos, two repo links, honest offline note). Secondary: CakeQuest + 2048 as text-only compact cards.
- All demo media is compressed H.264 MP4 behaving like GIFs (`autoplay muted loop playsinline`, poster frames, reduced-motion fallback).
- Verify: `npm run build` succeeds; dist has exactly one `h1`; every decided link present (GitHub, LinkedIn, resume, mailto, Goodreads), Instagram absent; site live on a `*.vercel.app` URL.

### Confirmed Inputs (from Joyce)

| Item | Value |
|---|---|
| GitHub profile | https://github.com/JunieMu |
| LinkedIn | https://www.linkedin.com/in/joyce-ma-b26759381 |
| Email (public) | jm6140@columbia.edu |
| Goodreads | https://www.goodreads.com/juniemu |
| Closet app (live) | https://juniemu.github.io/joyces-closet/ |
| Humor Project — rating app repo | https://github.com/JunieMu/TheHumorProject1 |
| Humor Project — pipeline repo | https://github.com/JunieMu/TheHumorProjectHumorModel |
| HeyBuddy | Software Engineering Intern, May – Aug 2026 · https://www.joinheybuddy.ai/ |
| Profile photo | `images/profilepic.JPG` (new) |
| Resume | Not ready — ship placeholder PDF at `/resume.pdf`, Joyce overwrites later |
| Analytics | Vercel Web Analytics: yes |
| Repo strategy | Refactor in-place, keep history |

### Key Discoveries

- The Humor Project is **two apps**: a public caption-voting site (Joyce's version of humorstudy.org — loads a study, shows images + candidate captions, collects "this is funny" votes into a shared Supabase research dataset) and a prompt/pipeline workbench (her version of matrix.almostcrackd.ai — edit prompt steps, run test generations against known image sets, inspect failures, iterate on a "humor flavor"). The featured card is designed around this pairing.
- `cakequestdemo.gif` never enters the new site (secondary cards are text-only) — no conversion needed; 5.1 MB stays only in git history, which Joyce accepted.
- Verified color system (WCAG ratios computed, all AA-pass — see Phase 1 tokens).

## What We're NOT Doing

- No dark mode; no per-project case-study pages; no blog (structure must not preclude them — components + anchors keep that door open).
- Not resurrecting the meme-rater backend (Supabase) — the "demo offline" note is the plan.
- No custom domain (deployment-time concern, later).
- No git history rewrite to purge old GIFs.
- Not migrating high-school achievement lists (CyberStart, UIL, picoCTF, CyberPatriot, FBLA) or hobby icon-cards — cut per Decisions 7 and 11.
- No Instagram link anywhere.
- Not committing the `.mov` source recordings (gitignored, kept on disk).

## Implementation Approach

Five phases, each independently verifiable, committed separately. Scaffold Astro minimal in-place first so every later phase runs inside a building project; convert media second so section-building has real assets; sections third; polish fourth; deploy last. Copy drafts are included in Phase 3 so implementation is deterministic — Joyce adjusts words during manual review, not by leaving blanks.

---

## Phase 1: Scaffold & Teardown

### Overview

Replace the Bootstrap site with a building Astro skeleton: scaffold, gitignore, delete old files, install self-hosted fonts, create design tokens + base layout.

### Changes Required

#### 1. Scaffold Astro (via official installer, into temp dir to avoid non-empty-dir prompts)

```bash
cd /private/tmp/claude-501/-Users-joycema-Documents-joyces-website/dbdf5807-b93d-40d9-8f58-18447dceb4e4/scratchpad
npm create astro@latest astro-scaffold -- --template minimal --no-git --no-install --yes
# Move generated files into the repo root:
cd /Users/joycema/Documents/joyces-website
mv <scratchpad>/astro-scaffold/{package.json,astro.config.mjs,tsconfig.json} .
mv <scratchpad>/astro-scaffold/src .
mv <scratchpad>/astro-scaffold/public .
npm install
npm i @fontsource-variable/fraunces @fontsource-variable/work-sans
```

In `astro.config.mjs`, set `site: 'https://joyces-website.vercel.app'` (update if Vercel assigns a different slug).

#### 2. `.gitignore` (new file)

```gitignore
node_modules/
dist/
.astro/
.DS_Store
*.mov
.vercel/
```

Untrack committed junk: `git rm --cached .DS_Store images/.DS_Store`

#### 3. Delete Bootstrap-era files

`git rm index.html style.css` (GIFs are deleted in Phase 2 after conversion; README.txt replaced in Phase 5).

#### 4. Design tokens — **File**: `src/styles/global.css`

Verified palette (WCAG 2.1 ratios against `#FFFCFA` canvas unless noted; computed 2026-07-27):

```css
:root {
  /* canvas & text */
  --color-bg: #fffcfa;        /* warm off-white canvas */
  --color-ink: #241d20;       /* headings/body — 16.17:1 AA */
  --color-muted: #6e5a5e;     /* secondary text — 6.25:1 AA */
  /* accent system: blush is decorative; rose does the interactive work */
  --color-accent: #a84e59;    /* links, buttons — 5.27:1 AA; white-on-accent 5.39:1 AA */
  --color-accent-deep: #96404c; /* text sitting ON blush tint — 4.75:1 AA vs #facfcf */
  --color-blush: #facfcf;     /* THE Joyce pink — borders, hovers, underlines, tints only */
  --color-blush-wash: #fceae8; /* section wash, decorative */
  --color-cream: #fdf3e3;     /* optional secondary wash, decorative */

  --font-display: 'Fraunces Variable', Georgia, serif;
  --font-body: 'Work Sans Variable', system-ui, sans-serif;
  --measure: 65ch;
  --space-section: clamp(4rem, 10vw, 7rem);
}
```

Plus base styles: body on `--color-bg`/`--color-ink`/`--font-body`; `h1–h3` in `--font-display`; links `--color-accent` with `--color-blush` underline/hover treatment; visible `:focus-visible` outline in `--color-accent`; `html { scroll-behavior: smooth }` wrapped in `@media (prefers-reduced-motion: no-preference)`.

#### 5. Base layout — **File**: `src/layouts/Base.astro`

```astro
---
import '@fontsource-variable/fraunces';
import '@fontsource-variable/work-sans';
import '../styles/global.css';
const { title = 'Joyce Ma', description = 'CS student at Columbia building personal software — projects, experience, and a very fluffy cat.' } = Astro.props;
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <!-- Vercel Web Analytics (no-op / 404 in local dev — expected) -->
    <script defer src="/_vercel/insights/script.js"></script>
  </head>
  <body>
    <slot />
    <script is:inline>
      // Decision 13: pause GIF-style autoplay for reduced-motion users
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        addEventListener('DOMContentLoaded', () => {
          document.querySelectorAll('video[autoplay]').forEach((v) => {
            v.removeAttribute('autoplay');
            v.pause();
            v.controls = true;
          });
        });
      }
    </script>
  </body>
</html>
```

`src/pages/index.astro` renders `<Base>` with placeholder section stubs (`<main>` with empty `<section id="projects">` etc.) so anchors exist from day one.

### Success Criteria

#### Automated Verification

- [x] `npm run build` exits 0
- [x] `test ! -f index.html && test ! -f style.css` (old files gone from working tree)
- [x] `grep -ri bootstrap src/ | wc -l` → 0
- [x] `git ls-files | grep -c '\.DS_Store'` → 0
- [x] `grep -c 'a84e59' src/styles/global.css` ≥ 1 (tokens landed)

#### Manual Verification

- [ ] `npm run dev` → warm off-white page renders with Fraunces headings / Work Sans body (use a temporary "Joyce Ma" h1 to eyeball fonts)

**Implementation Note**: Pause after this phase for Joyce to confirm fonts/canvas feel right before media + sections build on them.

---

## Phase 2: Media Pipeline

### Overview

Install ffmpeg; produce three compressed MP4s + posters; optimize/move images; create the resume placeholder.

### Changes Required

#### 1. Install ffmpeg

```bash
brew install ffmpeg
```

#### 2. Convert demos → `public/videos/`

```bash
mkdir -p public/videos
# Closet (GIF source — already small)
ffmpeg -i closetdemo.gif -movflags faststart -pix_fmt yuv420p \
  -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" public/videos/closet.mp4
# Humor Project screen recordings (strip audio; cap width 1280; 30fps)
ffmpeg -i TheHumorProjectRatingApp.mov -vf "scale='min(1280,iw)':-2,fps=30" \
  -c:v libx264 -crf 28 -preset slow -an -movflags faststart -pix_fmt yuv420p \
  public/videos/humor-rating.mp4
ffmpeg -i TheHumorProjectPiplineApp.mov -vf "scale='min(1280,iw)':-2,fps=30" \
  -c:v libx264 -crf 28 -preset slow -an -movflags faststart -pix_fmt yuv420p \
  public/videos/humor-pipeline.mp4
# Posters (first frame)
for v in closet humor-rating humor-pipeline; do
  ffmpeg -i public/videos/$v.mp4 -frames:v 1 -q:v 4 public/videos/$v-poster.jpg
done
```

**Size budget**: each MP4 ≤ 2.5 MB, `public/videos/` total ≤ 6 MB. If the 14 MB pipeline `.mov` lands over budget at crf 28, re-run at `-crf 30` (then 32) before considering anything else.

#### 3. Images

- `git mv` is N/A (untracked) — `mv images/profilepic.JPG src/assets/profile.jpg` (Astro `<Image>` will emit optimized WebP at build; used in About, Phase 3).
- `mv images/goodreads.svg src/assets/goodreads.svg`.
- Delete: `git rm images/profile.JPG closetdemo.gif cakequestdemo.gif game2048demo.gif` (converted or demoted; sources remain in history). The `.mov` files stay on disk, gitignored.

#### 4. Resume placeholder — `public/resume.pdf`

Generate a minimal one-page PDF ("Joyce Ma — resume coming soon") with a small no-dependency Node script (build the PDF objects as strings, compute xref offsets programmatically, write with `fs`). Joyce overwrites this file with her real resume later; the site link never 404s.

### Success Criteria

#### Automated Verification

- [x] All 6 files exist in `public/videos/` (3 MP4 + 3 posters)
- [x] `du -ck public/videos | tail -1` ≤ 6144 (KB) — actual **2472 KB**
- [x] `test -f public/resume.pdf && test -f src/assets/profile.jpg`
- [x] `ls *.gif 2>/dev/null | wc -l` → 0; `git ls-files | grep -c '\.gif$'` → 0
- [x] `npm run build` still exits 0

#### Manual Verification

- [ ] Each MP4 plays in QuickTime/browser, looks crisp, loops content intact
- [ ] Posters show a representative first frame (if frame 0 is blank, re-extract with `-ss 1`)
- [ ] Placeholder PDF opens in Preview

---

## Phase 3: Sections & Copy

### Overview

Build all components and write the actual copy. Content lives in `src/data/`, presentation in `src/components/`.

### Changes Required

#### 1. **File**: `src/data/site.ts` — the confirmed-inputs table as exported consts (`GITHUB`, `LINKEDIN`, `EMAIL`, `GOODREADS`, `RESUME: '/resume.pdf'`, `HEYBUDDY_URL`).

#### 2. **File**: `src/data/projects.ts` — typed arrays:

- `featured`: Joyce's Closet `{ title, blurb, tech, liveUrl, repoUrl: 'https://github.com/JunieMu/joyces-closet', videos: [{src: '/videos/closet.mp4', poster, label: ''}] }`; The Humor Project `{ ..., repos: [rating, pipeline], videos: [rating, pipeline] w/ labels, offlineNote }`. *(During implementation: confirm the closet repo URL and pull each Humor repo's actual stack line from its README for the tech chips; adjust if reality differs.)*
- `secondary`: CakeQuest + 2048 `{ title, blurb, repoUrl }` — no media.

#### 3. Components — **Files**: `src/components/*.astro`

- `Header.astro` — slim sticky bar: "Joyce Ma" (plain text link to `#top`, Fraunces) left; right: `#projects` · `#experience` · `#about` · `/resume.pdf`.
- `Hero.astro` — the page's only `<h1>` ("Joyce Ma"), intro sentence, link row: GitHub · LinkedIn · Resume · jm6140@columbia.edu (`mailto:`). No photo (Decision 8 — photo lives in About).
- `DemoVideo.astro` — reusable per Decision 13:

```astro
---
const { src, poster, label } = Astro.props;
---
<figure>
  <video autoplay muted loop playsinline preload="metadata"
    poster={poster} src={src} aria-label={label || 'project demo video'}></video>
  {label && <figcaption>{label}</figcaption>}
</figure>
```

- `ProjectCard.astro` — featured: alternating two-column media+text rows (media flips sides per index; stacks on mobile). Humor card renders its two `DemoVideo`s side-by-side (stacked on mobile) with labels "Rating app" / "Pipeline workbench", both repo links, and the offline note styled as a quiet `--color-muted` line — honest, not apologetic.
- `MiniProjectCard.astro` — secondary two-up row: title (h3), one-liner, GitHub link. Blush top-border accent.
- `Experience.astro`, `About.astro` (uses `<Image src={profile}>` from `astro:assets`, circular crop, plus Goodreads link with `goodreads.svg`), `Footer.astro` (email repeat, GitHub · LinkedIn · Goodreads, "© 2026 Joyce Ma").
- `index.astro` composes: Header → Hero → Projects (h2, `id="projects"`) → Experience (h2, `id="experience"`) → About (h2, `id="about"`) → Footer.

#### 4. Copy (drafts — Joyce tunes wording during review, structure is fixed)

- **Hero**: "I'm a CS student at Columbia who builds small, personal software — a wardrobe planner I use every morning, games, and experiments in whether an AI can learn to be funny. Off-screen: painting, fantasy novels, and a very fluffy cat named Louis."
- **Joyce's Closet**: "Built because I kept staring at my closet every morning: add your clothes, plan outfits from what you actually own, or hit shuffle when you can't decide. Recently refactored top to bottom — and still in daily use." Tech: HTML · CSS · JavaScript. Buttons: Live site / GitHub.
- **The Humor Project**: "Built for a humor-research course: can you teach an AI what's funny? The rating app is a public voting site — it loads a study, shows images with candidate captions, and collects 'this one's funny' votes into a shared Supabase research dataset (OAuth sign-in). The pipeline workbench is where the humor model gets made: edit prompt steps, run test generations against known image sets, inspect the failures, adjust, repeat." Offline note: "The class's shared Supabase instance has been retired, so the live demo is offline — the videos below show both apps running, and all the code is on GitHub."
- **CakeQuest**: "A Java platformer where a cat gathers cake ingredients across three worlds of randomly placed obstacles."
- **2048**: "A Java remake of 2048 — with sound effects on every move and memes when you lose."
- **Experience — HeyBuddy · Software Engineering Intern · May – Aug 2026**: "HeyBuddy is B2B SaaS for customer-success teams. I build software that helps CSMs manage their book of business — from auto-drafted emails to Buddy investigating accounts so humans don't have to dig." (links joinheybuddy.ai)
- **About**: "When I'm not in class or shipping side projects, I'm painting (seriously since 2020, digitally since last year), rereading The Poppy War or Red Rising — my Goodreads is public and honest — or hanging out with Louis, the fluffiest cat alive. Strawberry cheesecake enthusiast." + photo.

### Success Criteria

#### Automated Verification

- [x] `npm run build` exits 0
- [x] `grep -o '<h1' dist/index.html | wc -l` → 1
- [x] dist/index.html contains: `linkedin.com/in/joyce-ma-b26759381`, `github.com/JunieMu`, `mailto:jm6140@columbia.edu`, `resume.pdf`, `goodreads.com/juniemu`, `TheHumorProject1`, `TheHumorProjectHumorModel`, `joinheybuddy.ai`
- [x] `grep -ci instagram dist/index.html` → 0
- [x] `grep -c '<video' dist/index.html` → 3

#### Manual Verification

- [ ] Full read-through of all copy — Joyce's voice, no typos, wording tweaks applied
- [ ] Videos autoplay muted and loop; Humor card's paired videos read clearly as two apps
- [ ] Anchor nav scrolls to correct sections
- [ ] Section order and alternating featured layout match Decision 8/9

**Implementation Note**: Pause here — this is the main review gate. Joyce approves copy + layout before polish.

### Deviations found during implementation (2026-07-27)

Verified against the live repos/URLs, per the plan's instruction to confirm and adjust:

1. **Closet live URL was dead.** `https://juniemu.github.io/joyces-closet/` returns **404**; GitHub Pages is off for that repo. The working live URL is **`https://joyces-closet.vercel.app/`** (200, and the repo's own `homepage` field + README point there). Site links the Vercel URL.
2. **Closet tech chips corrected.** Plan said "HTML · CSS · JavaScript"; the repo is **React 19 · TypeScript · Vite · Tailwind CSS · Zustand**. The README confirms it began as a 2024 HTML/CSS/JS project and was rebuilt as a typed, tested React app — so the blurb now names that rewrite explicitly (stronger signal than "recently refactored").
3. **Humor Project stack from READMEs**: Next.js · React 19 · TypeScript · Supabase · Tailwind CSS (both apps share it, so tech sits at card level, not per-video).
4. **Humor card layout changed from the spec.** Two demos side-by-side *inside* a half-width media column rendered each video ~240px wide — failing the plan's own check that they "read clearly as two apps." Featured projects with 2+ demos now go **full width**: text on top, both recordings side by side across the row (stacking on mobile). Single-demo cards keep the alternating two-column layout.
5. **Demo labels moved above the videos** so the paired labels align despite differing aspect ratios.
6. **Videos carry `width`/`height` and never upscale** — `closet.mp4` is only 360px wide natively, so it is capped at natural width and centered rather than blown up to fill the column.
7. **The rating app's URL still responds** (`thehumorproject1.vercel.app` → 200) even though its Supabase backend is retired; the offline note was reworded to "signing in no longer works" rather than claiming the whole site is down. Worth a second look from Joyce.

---

## Phase 4: Polish & Accessibility

### Overview

Heading/meta/a11y/responsive pass; favicon; OG tags.

### Changes Required

1. **Favicon** — `public/favicon.svg`: blush `#facfcf` rounded square, serif "J" in `--color-accent-deep` (SVG `<text>` with `font-family="Georgia, serif"` is fine at favicon size).
2. **OG/meta** in `Base.astro`: `og:title`, `og:description`, `og:type=website`, `og:url` from `Astro.site`. (No og:image in v1 — no asset that crops well; add later if wanted.)
3. **A11y sweep**: alt text on profile image ("Joyce Ma") and goodreads icon; `aria-label`s already on videos via DemoVideo; keyboard tab order sane; focus-visible ring verified on all interactive elements; color usage double-checked — no normal-size text in `--color-accent` on blush (that combo is reserved for `--color-accent-deep`).
4. **Responsive pass**: 375px / 768px / 1280px. Featured rows stack media-first on mobile; Humor's paired videos stack; header collapses gracefully (anchors can wrap — no hamburger needed at this content volume).
5. **Reduced motion**: verify the Phase 1 script (videos pause + show controls) and smooth-scroll disable.

### Success Criteria

#### Automated Verification

- [x] `npm run build` exits 0
- [x] `test -f public/favicon.svg`
- [x] `grep -c 'og:title' dist/index.html` ≥ 1 (plus `og:description`, `og:type`, `og:url`, `twitter:card`, canonical)
- [~] `grep -c 'alt=' dist/index.html` ≥ 2 — **actual: 1, and that is correct.** The page has exactly one `<img>` (the profile photo, `alt="Joyce Ma"`). The Goodreads mark is an inline `<svg aria-hidden="true">` next to the visible text "My Goodreads", which is the right pattern — adding an `alt`-bearing `<img>` purely to satisfy the count would make it worse. Accessible names verified instead: 1 img alt + 3 `aria-label`ed videos + 1 `aria-label`ed nav.

Additional automated verification run beyond the plan:

- [x] **Zero horizontal overflow** at 320 / 375 / 414 / 500 / 768 / 1024 / 1280 px (measured `documentElement.scrollWidth − innerWidth`; sub-500px widths measured through a same-origin iframe, since headless Chrome clamps its window to 500px minimum)
- [x] **Reduced motion works**: with `--force-prefers-reduced-motion=reduce`, all three videos lose `autoplay` and gain `controls`
- [x] **Every colour pair used on the page passes WCAG AA** (≥ 4.5:1), including two the plan had not checked: `--color-accent` on `--color-blush-wash` (footer/hero links) = 4.64:1, `--color-muted` on `--color-blush-wash` = 5.50:1
- [x] **Heading outline**: h1 → h2 ×3 → h3 ×5, no skipped levels, exactly one h1
- [x] **All outbound links resolve** (LinkedIn returns 999, its standard bot response)

#### Manual Verification

- [ ] Lighthouse (Chrome DevTools, mobile) ≥ 90 on Performance / Accessibility / Best Practices / SEO
- [ ] macOS System Settings → Accessibility → Display → Reduce motion ON → videos don't autoplay, controls appear
- [ ] 375px-wide check: no horizontal scroll, videos and text legible
- [ ] Keyboard-only pass: every link reachable, focus visible

---

## Phase 5: Deploy

### Overview

README, commit/push, Vercel import + Analytics, retire GitHub Pages.

### Changes Required

1. **README** — `git rm README.txt`; new `README.md`: what the site is, stack (Astro + Vercel), `npm install` / `npm run dev` / `npm run build`, note that `/resume.pdf` is a placeholder to overwrite.
2. **Commit & push** all phases' work to `main` (phases should have been committed separately as they completed).
3. **Manual — Vercel** (Joyce, in browser; needs her GitHub login):
   - vercel.com → Add New → Project → Import `JunieMu/joyces-website` → Framework preset auto-detects **Astro** → Deploy (no env vars, no config).
   - Project → **Analytics** tab → Enable Web Analytics (the script tag from Phase 1 starts reporting once enabled).
   - Note the assigned URL; if it isn't `joyces-website.vercel.app`, update `site` in `astro.config.mjs` and push.
4. **Manual — retire GitHub Pages**: github.com/JunieMu/joyces-website → Settings → Pages → Source: **None**. (Old juniemu.github.io/joyces-website URL will 404 — accepted; custom domain is out of scope.)

### Success Criteria

#### Automated Verification

- [x] `git status --porcelain` clean; `git push` accepted — `2f6fb61..8bfe0d2 main -> main`
- [ ] `curl -s -o /dev/null -w '%{http_code}' https://<assigned>.vercel.app` → 200 *(blocked on Joyce's Vercel import)*
- [ ] `curl -s https://<assigned>.vercel.app | grep -c '<h1'` → 1 *(blocked on Joyce's Vercel import)*

#### Manual Verification

- [ ] Production site: videos play, resume placeholder downloads, mailto opens, all external links correct
- [ ] Vercel Analytics dashboard shows your own visit within a few minutes
- [ ] Old GitHub Pages URL no longer serves the Bootstrap site
- [ ] Per-commit preview deploys appear on a test branch push (the workflow Joyce wanted from Vercel)

---

## Testing Strategy

No JS framework and no test suite is warranted for a static one-pager; verification is build-success + grep assertions on `dist/` (per-phase above) + the manual gates. The two hard review gates are after Phase 1 (fonts/canvas feel) and Phase 3 (copy + layout).

### Manual Testing Steps (final, on production)

1. Cold-load on phone (real cellular, not wifi) — hero readable < 2s, videos lazy-fill in.
2. Click every link: GitHub ×3 repos + profile, LinkedIn, Goodreads, HeyBuddy, live Closet app, mailto, resume.
3. Reduce-motion ON revisit; keyboard-only pass.

## Performance Considerations

- Weight budget: ≤ 6 MB total video (enforced Phase 2), fonts ~2 variable woff2 files self-hosted, zero JS beyond the analytics script and the 6-line reduced-motion inline script. Everything else is static HTML/CSS.
- `preload="metadata"` + posters keep initial payload to poster JPGs; faststart flag makes MP4s stream immediately.
- Profile photo served as build-time-optimized WebP via `astro:assets` (555 KB source → ~40-80 KB served).

## Migration Notes

- Old GIFs/HTML/CSS are deleted from the working tree but recoverable from git history (`2f6fb61` and earlier).
- `.mov` source recordings stay on Joyce's disk only (gitignored) — re-encode source if compression settings ever need revisiting.
- GitHub Pages is disabled, not deleted; re-enabling is a settings toggle if ever needed.
- Old inbound links to juniemu.github.io/joyces-website will 404 (accepted; decisions doc scopes custom-domain/redirect work out).

## References

- Design decisions (all rationale): `thoughts/shared/decisions/2026-07-27-website-refactor.md`
- Current implementation being replaced: `index.html`, `style.css` (repo root, pre-Phase-1)
- Contrast verification script: scratchpad `contrast.mjs` (ratios recorded in Phase 1 tokens)
