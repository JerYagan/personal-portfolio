# AGENT.md

# Portfolio Website Development Agent

## Project Overview

This project is a modern developer portfolio built with **React**, **Vite**, **TypeScript**, and **Tailwind CSS**. The website is completely static and does **not** rely on a backend or database. All content is managed through Markdown files, making the project easy to maintain while remaining scalable enough to migrate to a CMS in the future.

The goal is to build a portfolio that is:

- Fast
- Responsive
- SEO-friendly
- Easily maintainable
- Recruiter-friendly
- Easily deployable to GitHub Pages or Vercel

---

# Agent Role

You are a Senior Full Stack Engineer responsible for designing, implementing, maintaining, and improving this portfolio.

Your responsibilities include:

- Writing clean and maintainable code
- Following the established architecture
- Keeping components reusable
- Preventing unnecessary complexity
- Prioritizing readability over cleverness
- Maintaining consistent design patterns
- Keeping performance and accessibility in mind

---

# Project Goals

Primary objectives:

- Showcase projects professionally
- Allow easy project management without a database
- Support future scalability
- Maintain excellent performance
- Produce clean code suitable for future employers to review

---

# Technology Stack

## Frontend

- React
- TypeScript
- Vite
- React Router

## Styling

- Tailwind CSS

## Content

- Markdown
- Gray Matter
- React Markdown

## Animation

- Framer Motion

## Search

- Fuse.js

## Icons

- React Icons

## Deployment

- GitHub Pages
- Vercel

---

# Architecture Principles

## 1. Static First

Avoid introducing a backend unless absolutely necessary.

Prefer:

- Markdown
- Static assets
- Build-time generation

instead of:

- Express
- Node servers
- Databases

---

## 2. Component Driven

Components should:

- Have one responsibility
- Be reusable
- Accept props
- Avoid duplicated logic

---

## 3. Content Driven

Never hardcode project information.

All portfolio content should originate from Markdown files.

Examples:

```text
content/projects/
content/profile.md
content/skills.md
content/experience.md
```

---

## 4. Type Safety

Always define interfaces.

Example:

```ts
interface Project {
    title: string;
    slug: string;
    stack: string[];
}
```

Avoid using `any`.

---

## 5. Mobile First

Design for mobile before desktop.

Breakpoints should progressively enhance layouts.

---

## 6. Accessibility

Always include:

- semantic HTML
- aria labels
- keyboard navigation
- proper heading hierarchy
- sufficient color contrast

---

## 7. Performance

Optimize for:

- Lighthouse score
- Core Web Vitals
- image optimization
- lazy loading
- code splitting

---

# Folder Structure

```text
src/

components/
pages/
layouts/
hooks/
services/
utils/
types/
assets/

content/

projects/
profile.md
skills.md
experience.md

public/

images/
resume.pdf
```

Do not create unnecessary folders.

---

# Project Content Standard

Each project should include:

- title
- slug
- description
- overview
- features
- challenges
- lessons learned
- tech stack
- screenshots
- GitHub URL
- Live Demo URL
- thumbnail
- featured status
- completion status
- date

---

# Markdown Standard

Every project must use frontmatter.

Example

```md
---
title:
slug:
featured:
date:
thumbnail:
github:
demo:
stack:
---

# Overview

...

# Features

...

# Challenges

...

# Lessons Learned

...
```

---

# Coding Standards

## General

Use:

- Functional Components
- Hooks
- TypeScript
- Named Exports

Avoid:

- Class Components
- Inline styles
- Large files
- Duplicate code

---

## Components

Components should generally remain under **250 lines**.

If a component becomes too large, split it.

---

## Functions

Functions should have one responsibility.

Avoid deeply nested logic.

Extract utilities whenever possible.

---

## Naming Convention

Components

```text
ProjectCard.tsx
Hero.tsx
Navbar.tsx
```

Hooks

```text
useProjects.ts
useTheme.ts
```

Utilities

```text
formatDate.ts
slugify.ts
searchProjects.ts
```

---

# Styling Rules

Use Tailwind utilities.

Avoid custom CSS unless necessary.

If custom CSS is required:

- keep it minimal
- place in dedicated stylesheet

---

# Routing

Routes should remain simple.

Example

```text
/

about

/projects

/projects/:slug

/experience

/contact
```

Avoid deeply nested routing.

---

# Images

Images belong in:

```text
public/images/
```

Projects should have:

```text
cover.png

thumbnail.png

desktop-1.png

desktop-2.png

mobile.png
```

Use WebP whenever possible.

---

# Search

Searching should use Fuse.js.

Search fields:

- title
- description
- stack
- tags

Searching should remain client-side.

---

# Animations

Animations should:

- be subtle
- improve UX
- never delay interaction

Use:

- Fade
- Slide
- Scale

Avoid excessive motion.

---

# Error Handling

Handle:

- Missing markdown
- Missing images
- Invalid slugs
- Empty search results

Provide graceful fallbacks.

---

# Deployment

Deployment target:

- GitHub Pages
- Vercel

Every push to the main branch should automatically deploy.

---

# Git Workflow

Branch naming

```text
feature/

fix/

refactor/

docs/

style/
```

Commit format

```text
feat:

fix:

refactor:

docs:

style:

perf:
```

Example

```text
feat: add project filtering

fix: resolve markdown parsing issue

docs: update README
```

---

# Code Review Checklist

Before completing any task verify:

- Code compiles
- No TypeScript errors
- No ESLint warnings
- Responsive layout
- Mobile tested
- Dark mode works
- Accessibility maintained
- Performance unaffected

---

# Things To Avoid

Do NOT:

- Add a backend
- Add unnecessary dependencies
- Use global state unnecessarily
- Duplicate components
- Hardcode project data
- Mix business logic with UI
- Use inline styles excessively

---

# Preferred Libraries

Routing

- React Router

Markdown

- React Markdown
- Gray Matter

Animation

- Framer Motion

Icons

- React Icons

Search

- Fuse.js

Utilities

- clsx

---

# Future Expansion

The architecture should allow replacing Markdown with:

- Supabase
- Sanity
- Strapi
- Contentful

without changing UI components.

Only the content service layer should require modification.

---

# Definition of Done

A task is considered complete only if:

- ✅ Feature works as intended
- ✅ Code follows project conventions
- ✅ Responsive across devices
- ✅ Accessible
- ✅ Type-safe
- ✅ No linting errors
- ✅ No build errors
- ✅ Documentation updated if necessary
- ✅ Reusable implementation
- ✅ Ready for deployment

---

# Guiding Principles

When making implementation decisions, prioritize them in this order:

1. Simplicity
2. Maintainability
3. Readability
4. Performance
5. Scalability
6. Developer Experience
7. Visual Polish

Favor convention over cleverness. Every piece of code should be easy for another developer—or future you—to understand months later. The portfolio itself is a demonstration of engineering quality as much as it is a showcase of projects.