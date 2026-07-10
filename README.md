# Personal Portfolio & Blog

My personal website — a portfolio and blog built with the Next.js App Router and powered by a headless Sanity CMS.

🔗 **Live site:** [domarkas.co](https://domarkas.co)

<p>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-14-000000?logo=next.js&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" />
  <img alt="Sanity" src="https://img.shields.io/badge/Sanity-CMS-F03E2F?logo=sanity&logoColor=white" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white" />
  <img alt="Vercel" src="https://img.shields.io/badge/Deployed_on-Vercel-000000?logo=vercel&logoColor=white" />
</p>

---

## Overview

This is a personal website that pairs a portfolio with a fully content-managed blog. Posts and page content are authored in [Sanity](https://www.sanity.io/) and rendered through Next.js using [Portable Text](https://github.com/portabletext/react), so content can be updated without touching the codebase. The UI is built on [shadcn/ui](https://ui.shadcn.com/) components (Radix primitives), styled with Tailwind CSS and SCSS, animated with Framer Motion, and supports light/dark themes.

## Features

- **Headless CMS** — blog posts and content managed in Sanity, rendered via Portable Text
- **App Router** — built on Next.js 14 with React Server Components
- **Dark / light mode** — theme switching with `next-themes`
- **Accessible UI** — shadcn/ui components built on Radix primitives (accordion, dialog, dropdown, drawer)
- **Motion** — page and component animations with Framer Motion
- **Responsive design** — Tailwind CSS with SCSS for custom styling
- **Optimized images** — served and transformed through Sanity's image pipeline
- **Analytics & performance** — Vercel Speed Insights and third-party analytics integration
- **Type-safe** — written end-to-end in TypeScript

## Tech Stack

| Area | Tools |
| --- | --- |
| Framework | [Next.js 14](https://nextjs.org/) (App Router) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| CMS | [Sanity](https://www.sanity.io/) · `next-sanity` · `@sanity/image-url` · `@portabletext/react` |
| Styling | [Tailwind CSS](https://tailwindcss.com/) · SCSS (Sass) · `@tailwindcss/typography` · `tailwindcss-animate` |
| UI components | [shadcn/ui](https://ui.shadcn.com/) · [Radix UI](https://www.radix-ui.com/) · `vaul` · `class-variance-authority` · `clsx` · `tailwind-merge` |
| Animation | [Framer Motion](https://www.framer.com/motion/) · `react-dom-confetti` |
| Theming | [`next-themes`](https://github.com/pacocoursey/next-themes) |
| Icons | [Lucide](https://lucide.dev/) |
| Analytics | `@vercel/speed-insights` · `@next/third-parties` |
| Deployment | [Vercel](https://vercel.com/) |

## Project Structure

```
.
├── app/          # Next.js App Router — routes, layouts, and pages
├── components/   # Reusable UI and layout components
├── lib/          # Utilities and helpers
├── sanity/       # Sanity config, schemas, and client setup
├── public/       # Static assets
├── components.json   # shadcn/ui configuration
├── next.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18.17 or later
- A [Sanity](https://www.sanity.io/) project (project ID + dataset)

### Installation

```bash
# Clone the repository
git clone https://github.com/vidomarkas/portfolio-blog-website.git
cd portfolio-blog-website

# Install dependencies
npm install
```

### Environment variables

Create a `.env.local` file in the project root. The exact variables depend on your Sanity setup, but they typically look like this:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2024-01-01"
```

> Check the files in the `sanity/` directory to confirm the exact variable names this project expects, and add any analytics keys (e.g. a Google Analytics ID) if you use them.

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site. The page auto-updates as you edit files.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build locally |
| `npm run lint` | Run ESLint |

## Deployment

The site is deployed on [Vercel](https://vercel.com/). To deploy your own copy:

1. Push the repository to GitHub.
2. Import the project into Vercel.
3. Add the environment variables from your `.env.local` to the Vercel project settings.
4. Deploy — Vercel builds and hosts the app automatically on every push.

See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contact

**Vidas Domarkas** — [domarkas.co](https://domarkas.co)
