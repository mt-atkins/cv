# mea-tech.co.uk

Static CV site for Morgan Thomas Atkins, served from Cloudflare Pages (project `mea-tech-cv`).

- Site source: `public/` (plain HTML/CSS, no build step)
- Analytics: PostHog (EU), initialised in `public/index.html`
- Deploy: push to `main` (Cloudflare Pages Git integration), or manually:
  `npx wrangler pages deploy public --project-name mea-tech-cv`
- Print / "Download CV (PDF)" uses the print stylesheet in `public/styles.css`
