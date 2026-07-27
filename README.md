# joyces-website

My personal site — a single scrolling page with my projects, experience, and a
short about section. Built with [Astro](https://astro.build) and deployed on
Vercel.

## Stack

- **Astro** — static output, components, zero client JS by default
- **Fraunces** (display) + **Work Sans** (body), self-hosted via Fontsource
- Plain CSS with design tokens in `src/styles/global.css`
- Demos are H.264 MP4s that behave like GIFs (`autoplay muted loop playsinline`),
  with poster frames and autoplay disabled under `prefers-reduced-motion`

## Running it

```bash
npm install
npm run dev      # dev server at localhost:4321
npm run build    # static build into dist/
npm run preview  # serve the built site locally
```

## Layout

```
src/
  data/         site links and project content — edit copy here
  components/   one file per section, plus ProjectCard / DemoVideo
  layouts/      Base.astro — head, meta, reduced-motion script
  styles/       global.css — design tokens and base styles
  assets/       images optimized at build time
public/
  videos/       demo MP4s + poster frames
  resume.pdf    ← placeholder, overwrite with the real resume
```

## Notes

- **`public/resume.pdf` is a placeholder.** Drop the real resume in at that exact
  path and the hero/nav/footer links pick it up with no code change.
- Demo videos are generated from screen recordings with ffmpeg; the source
  `.mov` files are gitignored and live only on my machine. To re-encode:

  ```bash
  ffmpeg -i in.mov -vf "scale='min(1280,iw)':-2,fps=30" \
    -c:v libx264 -crf 28 -preset slow -an -movflags faststart \
    -pix_fmt yuv420p public/videos/out.mp4
  ffmpeg -i public/videos/out.mp4 -frames:v 1 -q:v 4 public/videos/out-poster.jpg
  ```

- Design rationale and the build plan are in `thoughts/shared/`.
