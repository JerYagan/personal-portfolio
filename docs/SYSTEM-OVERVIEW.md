# Portfolio Website Architecture

> A modern, database-free developer portfolio that is easy to maintain, deploy, and expand.

---

# Goals

- ✅ No backend or database
- ✅ Easy to update projects
- ✅ Deploy for free (GitHub Pages or Vercel)
- ✅ Fast loading
- ✅ Mobile responsive
- ✅ Professional presentation
- ✅ SEO friendly
- ✅ Easily expandable into a CMS later

---

# Tech Stack

## Frontend

- React
- Vite
- TypeScript
- Tailwind CSS
- React Router

## UI

- Framer Motion
- React Icons

## Content

- Markdown + Frontmatter *(Recommended)*
- OR JSON

## Utilities

- React Markdown
- Gray Matter
- Fuse.js (Search)

## Deployment

- GitHub Pages
- Vercel

---

# Project Structure

```text
portfolio/

│
├── public/
│   ├── images/
│   │   ├── profile/
│   │   ├── projects/
│   │   │   ├── mercato/
│   │   │   ├── baesys/
│   │   │   └── hris/
│   │   └── icons/
│   │
│   └── resume.pdf
│
├── src/
│
│   ├── components/
│   │
│   ├── pages/
│   │
│   ├── layouts/
│   │
│   ├── hooks/
│   │
│   ├── utils/
│   │
│   ├── data/
│   │
│   └── types/
│
├── content/
│   ├── profile.md
│   ├── experience.md
│   ├── skills.md
│   └── projects/
│       ├── mercato.md
│       ├── baesys.md
│       └── hris.md
│
└── package.json
```

---

# Website Pages

## Home

Contains

- Hero Section
- Short Introduction
- Featured Projects
- Tech Stack
- Experience Preview
- Contact CTA

---

## About

Contains

- Profile Picture
- Biography
- Career Timeline
- Resume Download
- Social Links

---

## Projects

Displays all projects.

Features

- Search
- Filter
- Categories
- Featured Projects
- Sort by Date

Each card contains

- Thumbnail
- Name
- Short Description
- Stack
- Demo Button
- GitHub Button

---

## Project Details

Each project has its own page.

Contains

- Hero Image
- Title
- Description
- Project Overview
- Features
- Challenges
- Lessons Learned
- Technology Stack
- Gallery
- Live Demo
- GitHub Repository

---

## Skills

Grouped into categories.

Example

- Frontend
- Backend
- Database
- DevOps
- Tools
- Others

---

## Experience

Timeline layout.

Contains

- Internship
- Freelance
- Personal Projects
- Certifications

---

## Contact

Contains

- Contact Form
- Email
- GitHub
- LinkedIn

---

# Data Management

Instead of using a database, every project is a Markdown file.

Example

```text
content/

projects/

mercato.md

baesys.md

hris.md
```

---

## Example Project

```md
---
title: Mercato

slug: mercato

featured: true

status: Completed

date: 2026-06-12

thumbnail: /images/projects/mercato/cover.png

demo: https://mercato.vercel.app

github: https://github.com/user/mercato

stack:
  - React
  - Tailwind
  - Supabase
  - Vite

tags:
  - Marketplace
  - Full Stack
---

# Overview

Marketplace for local farmers.

## Features

- Authentication
- CRUD Products
- Search
- Responsive Design

## Challenges

Describe technical challenges.

## Lessons Learned

Describe what you learned.
```

---

# Project Schema

Each project should contain

## Basic Information

- Title
- Slug
- Date
- Status
- Featured

---

## Links

- GitHub
- Live Demo
- Figma (Optional)

---

## Images

- Thumbnail
- Cover Image
- Desktop Screenshots
- Mobile Screenshots
- Admin Dashboard Screenshots

---

## Description

- Short Description
- Full Overview

---

## Technical Details

- Tech Stack
- Architecture
- Features
- Challenges
- Lessons Learned

---

## Metadata

- Tags
- Category
- Duration
- Role

---

# Suggested Categories

- Web Application
- Mobile Application
- API
- UI/UX
- Full Stack
- Frontend
- Backend

---

# Search & Filtering

Users can filter projects by

- Technology
- Category
- Featured
- Year
- Completion Status

Search by

- Project Name
- Description
- Tags

---

# Image Gallery

Each project can contain

- Desktop Screenshot
- Tablet Screenshot
- Mobile Screenshot
- Authentication
- Dashboard
- Analytics
- Dark Mode

Display them inside a Lightbox Gallery.

---

# Optional Features

## Dark Mode

Light / Dark Theme Toggle

---

## Command Palette

Search pages quickly.

---

## Reading Time

Estimate reading time for each project.

---

## Animated Page Transitions

Using Framer Motion.

---

## View Counter

Using GoatCounter or Vercel Analytics.

---

## Visitor Analytics

Privacy-friendly analytics.

---

## Resume Download

PDF Download Button.

---

## Copy Email Button

Copies email to clipboard.

---

# Content Workflow

```text
New Project

      │

      ▼

Create Markdown File

      │

      ▼

Add Screenshots

      │

      ▼

Commit Changes

      │

      ▼

Push to GitHub

      │

      ▼

Automatic Deployment

      │

      ▼

Portfolio Updated
```

---

# Deployment Workflow

```text
Git

↓

GitHub

↓

GitHub Actions (Optional)

↓

Vercel / GitHub Pages

↓

Live Website
```

---

# Future Upgrade Path

Current

```text
Markdown Files

↓

React Components

↓

Portfolio
```

Future

```text
Supabase

↓

Sanity CMS

↓

Strapi

↓

Contentful
```

No UI changes required because only the data source changes.

---

# Recommended Features Checklist

## Core

- [ ] Responsive Design
- [ ] SEO
- [ ] Dark Mode
- [ ] Search
- [ ] Filters
- [ ] Markdown Content
- [ ] Dynamic Project Pages
- [ ] Image Gallery
- [ ] Resume Download

## Nice to Have

- [ ] Animations
- [ ] Reading Time
- [ ] Analytics
- [ ] Sitemap
- [ ] RSS Feed
- [ ] PWA
- [ ] Keyboard Shortcuts
- [ ] Command Palette

---

# Why This Architecture?

- No database maintenance
- Extremely fast
- Cheap (Free)
- Version controlled with Git
- Easy to add new projects
- Easy to migrate to a real CMS later
- Recruiter-friendly
- Perfect for GitHub Pages and Vercel
- Scales well as your portfolio grows