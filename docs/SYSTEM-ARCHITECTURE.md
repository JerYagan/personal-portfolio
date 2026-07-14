# Portfolio Website System Architecture

> A static, database-free portfolio website that uses Markdown as the content source and Git as the version control system. The application is deployed to GitHub Pages or Vercel and automatically updates whenever new content is pushed.

---

# High-Level System Architecture

```text
                           ┌──────────────────────────┐
                           │        Developer         │
                           │ (Creates & Edits Content)│
                           └────────────┬─────────────┘
                                        │
                              Edit Markdown Files
                              Add Images / Screenshots
                                        │
                                        ▼
                    ┌──────────────────────────────────┐
                    │          Git Repository          │
                    │                                  │
                    │  Markdown Files                  │
                    │  Images                          │
                    │  React Source Code              │
                    └───────────────┬──────────────────┘
                                    │
                              git push origin main
                                    │
                                    ▼
                     ┌────────────────────────────────┐
                     │ GitHub / Vercel Build Process │
                     │                                │
                     │ npm install                    │
                     │ npm run build                  │
                     │ Static Site Generation         │
                     └───────────────┬────────────────┘
                                     │
                                     ▼
                   ┌──────────────────────────────────┐
                   │      Static Website Hosting      │
                   │                                  │
                   │ GitHub Pages / Vercel            │
                   └───────────────┬──────────────────┘
                                   │
                          HTTPS Request
                                   │
                                   ▼
                    ┌──────────────────────────────┐
                    │           Visitors           │
                    └──────────────────────────────┘
```

---

# Application Architecture

```text
                    Portfolio Website

                           React
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
   UI Components        Pages / Routes      Utility Functions
        │                    │                    │
        └──────────────┬─────┴────────────────────┘
                       │
                       ▼
                Content Service Layer
                       │
          Reads Markdown / JSON Files
                       │
        ┌──────────────┴──────────────┐
        │                             │
        ▼                             ▼
 Markdown Files                Static Images
(content/projects)           (public/images)
```

---

# Folder Architecture

```text
portfolio/

├── public/
│
│   ├── images/
│   │   ├── profile/
│   │   ├── projects/
│   │   └── icons/
│   │
│   └── resume.pdf
│
├── content/
│
│   ├── profile.md
│   ├── skills.md
│   ├── experience.md
│   │
│   └── projects/
│       ├── mercato.md
│       ├── baesys.md
│       ├── hris.md
│
├── src/
│
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   ├── hooks/
│   ├── services/
│   ├── utils/
│   ├── types/
│   └── assets/
│
└── package.json
```

---

# Component Architecture

```text
                     App.tsx
                        │
         ┌──────────────┴──────────────┐
         │                             │
         ▼                             ▼
    Navigation                     Footer
         │
         ▼
     React Router
         │
         ├──────────────┐
         │              │
         ▼              ▼
      Home          About
         │              │
         ├──────────────┤
         ▼              ▼
    Projects      Experience
         │
         ▼
  Project Details
```

---

# Content Flow

```text
Markdown File

        │

        ▼

Gray Matter

        │

        ▼

Extract Frontmatter

        │

        ▼

React Markdown

        │

        ▼

Project Object

        │

        ▼

React Components

        │

        ▼

Rendered Project Page
```

---

# Data Flow

```text
User Opens Website

        │

        ▼

React Router

        │

        ▼

Requested Page

        │

        ▼

Load Markdown Content

        │

        ▼

Parse Metadata

        │

        ▼

Render Components

        │

        ▼

Display to User
```

---

# Project Rendering Flow

```text
projects/

mercato.md

        │

        ▼

Project Loader

        │

        ▼

Project Interface

        │

        ▼

Project Card

        │

        ▼

Projects Grid

        │

        ▼

User Clicks Project

        │

        ▼

Dynamic Project Page
```

---

# Search Flow

```text
Projects

      │

      ▼

Generate Search Index

      │

      ▼

Fuse.js

      │

      ▼

Search Query

      │

      ▼

Filtered Results

      │

      ▼

Projects Display
```

---

# Deployment Flow

```text
Developer

      │

      ▼

Edit Markdown

      │

      ▼

Commit Changes

      │

      ▼

Push to GitHub

      │

      ▼

Automatic Build

      │

      ▼

Deploy to Vercel

      │

      ▼

Website Updated
```

---

# Optional Contact Flow

```text
Visitor

    │

    ▼

Contact Form

    │

    ▼

EmailJS / Formspree

    │

    ▼

Email Sent

    │

    ▼

Success Message
```

---

# Technology Stack Diagram

```text
                        Frontend

               React + TypeScript
                       │
              React Router
                       │
                 Tailwind CSS
                       │
               Framer Motion
                       │
             React Markdown
                       │
                 Gray Matter
                       │
                  Fuse.js
                       │
              Static Markdown Files
                       │
              GitHub / Vercel
```

---

# Future Upgrade Path

```text
Current

React
   │
Markdown
   │
GitHub
   │
Vercel

────────────────────────────────────

Future

React
   │
API Layer
   │
Supabase / Sanity / Strapi
   │
Authentication
   │
Admin Dashboard
```

---

# Overall Architecture Summary

```text
                ┌────────────────────┐
                │     Portfolio      │
                └─────────┬──────────┘
                          │
             ┌────────────┼────────────┐
             │            │            │
             ▼            ▼            ▼
        UI Layer    Routing Layer  Content Layer
             │            │            │
             └────────────┼────────────┘
                          │
                    Markdown Files
                          │
                    Static Assets
                          │
                     Git Repository
                          │
                    Build Pipeline
                          │
                 GitHub Pages / Vercel
                          │
                        Visitors
```

---

## Architecture Principles

- **Static-first**: No backend or database required.
- **Content-driven**: All portfolio content lives in Markdown files with front matter.
- **Component-based**: Reusable React components power every page.
- **Version-controlled**: Git serves as both version history and content management.
- **Scalable**: The content layer can later be replaced by a headless CMS (e.g., Supabase, Sanity, Strapi) without changing the UI.
- **Fast deployment**: Every `git push` automatically rebuilds and deploys the site through GitHub Pages or Vercel.