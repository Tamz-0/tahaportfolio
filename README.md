# Taha Murad Zaman — Portfolio

A premium, production-grade personal portfolio built as a React single-page application. It pulls projects and blog posts live from GitHub at runtime, presents in-depth case studies (problem, solution, architecture, trade-offs) for featured work, and ships with a hand-built design system — no CSS framework, no UI library.

## Tech Stack

- **React 19 + Vite** — component architecture, fast HMR
- **Vanilla CSS** — single global stylesheet, no Tailwind/Bootstrap/etc.
- **GitHub REST API** — live data fetching for projects and writing, with `localStorage` caching (10 min TTL) and graceful static fallback
- **Custom markdown parser** — renders blog post frontmatter + content fetched from a separate GitHub `taha-writing` repo
- **Custom hooks** — `useDarkMode`, `useFadeIn` (scroll-triggered reveal), `useScrolled` (nav state)

## Features

- **Live project sync** — featured projects are curated via `public/featured.json`; additional projects are pulled automatically from any GitHub repo tagged with the `portfolio` topic
- **Case-study depth** — featured projects include structured problem statements, solution narratives, architecture decisions, and trade-offs, not just a tech-stack badge list
- **Live blog feed** — fetches markdown posts directly from a GitHub repo, parses frontmatter (title, tags, summary, read time), and falls back to static posts if the GitHub fetch fails
- **Blog reader modal** — portal-rendered modal for distraction-free reading without leaving the page
- **Proof & credentials section** — quantified, evidence-first presentation of experience and certifications
- **Dark / light mode** — persisted across visits
- **Scroll-based fade-in animations** — sections animate in via `IntersectionObserver`
- **Mobile sidebar navigation** — dedicated responsive nav for small screens
- **Resume download** — direct link to `TahaCV.pdf`

## Project Structure

```
tahaportfolio/
├── public/
│   ├── featured.json       # Curated featured projects (case studies, metrics, tech)
│   ├── favicon.png
│   └── TahaCV.pdf
├── src/
│   ├── components/
│   │   ├── icons/          # Icon set
│   │   ├── layout/         # Navbar, MobileSidebar
│   │   ├── sections/       # Hero, About, Experience, Projects, Proof, Writing, Contact, Footer
│   │   └── ui/             # BlogModal, FeaturedCard, LiveBtn
│   ├── data/
│   │   ├── experience.js   # Work history + certifications
│   │   ├── skills.js       # Skill categories
│   │   ├── staticProjects.js  # Fallback project data
│   │   └── staticBlogs.js     # Fallback blog data
│   ├── hooks/               # useDarkMode, useFadeIn, useScrolled
│   ├── lib/
│   │   ├── github.js        # GitHub API fetch logic (repos, topics)
│   │   ├── blogs.js         # Blog fetch + frontmatter parsing
│   │   ├── cache.js         # localStorage TTL cache
│   │   └── markdown.js      # Markdown → HTML parsing
│   ├── pages/
│   │   └── Home.jsx
│   ├── styles/
│   │   └── global.css       # Entire design system in one file
│   ├── App.jsx
│   └── main.jsx
├── vite.config.js
└── package.json
```

## Setup (Local)

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Adding a Featured Project

Edit `public/featured.json` and add an entry with `id`, `title`, `tagline`, `status`, `tech`, `github`, `livePreview`, `metrics`, and a `caseStudy` object (`problem`, `solution`, `architecture`, `decisions`). No code changes required — the Projects section reads this file directly.

## Adding a Blog Post

Push a new `.md` file (with frontmatter: `title`, `summary`, `tags`, `readTime`, `date`) to the `/blogs` folder of the `taha-writing` GitHub repo. It will appear automatically on next load (subject to the 10-minute cache).

## Build & Deploy

```bash
npm run build
```

Outputs to `dist/`. Deploys cleanly to Vercel, Netlify, or any static host — no server-side rendering required.
