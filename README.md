# Premium Minimalist Developer Portfolio

A high-performance, dark-mode-only developer portfolio built with React 18, Vite, TypeScript, and Tailwind CSS. The design is inspired by the premium minimalist aesthetics of modern developer workspaces, featuring dynamic layouts, micro-animations, client-side Markdown parsing, and fast fuzzy search.

![Portfolio Preview](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop&auto=format)

---

## 🚀 Key Features

* **Dynamic Markdown CMS**: Blog-style dynamic parser for projects, timeline events, and biography. Simply edit `.md` files in the `content/` folder to update your portfolio details.
* **Fuzzy Search & Filters**: Built-in client-side searching powered by **Fuse.js**, matching titles, descriptions, and tags.
* **Premium Micro-Animations**: Viewport-triggered scroll entries, route page transitions, and responsive spring animations powered by **Framer Motion**.
* **Tech Stack SVGs**: Inline brand-colored icons (React, TypeScript, Next.js, PostgreSQL, etc.) mapped dynamically to tag labels.
* **Responsive Image Lightbox**: High-fidelity fullscreen preview overlay when clicking on project mockups or screenshots.
* **Email Clipboard Tool**: Instant email copy action in the contact section with status feedback.
* **Optimized SEO**: Integrated Open Graph properties, Twitter cards, custom `robots.txt`, sitemaps, and lazy-loaded image files.

---

## 🛠️ Technology Stack

* **Core**: React 18, TypeScript, React Router Dom (HashRouter)
* **Build/Compile Tooling**: Vite, PostCSS, Autoprefixer
* **Styling**: Tailwind CSS v3
* **Libraries**: Framer Motion, Fuse.js, React Icons, React Markdown

---

## 📁 Project Structure

```
├── .github/workflows/      # Automated deployment actions
├── content/                # Markdown CMS folder
│   ├── projects/           # Case study files (mercato.md, baesys.md, etc.)
│   ├── experience.md       # Professional roles timeline
│   ├── profile.md          # Personal bio, contact, and portrait links
│   └── skills.md           # Skills categories
├── docs/                   # Documentation and deployment guides
├── public/                 # Static public files (sitemap, robots, icons)
├── src/
│   ├── components/         # Reusable presentation views
│   ├── pages/              # Main routing views (Home, ProjectDetails)
│   ├── services/           # CMS glob fetching hooks
│   ├── utils/              # Indentation-aware YAML parser & icon resolver
│   ├── App.tsx             # Route configurations
│   └── main.tsx            # Main boot entry
```

---

## 💻 Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Dev Server**:
   ```bash
   npm run dev
   ```

3. **Verify Build Output**:
   ```bash
   npm run build
   ```

---

## 📦 GitHub Pages Deployment

This project is optimized for deployment to GitHub Pages. See the detailed [GitHub Pages Deployment Guide](docs/GITHUB-PAGES-DEPLOYMENT.md) for step-by-step instructions.
