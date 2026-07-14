# GitHub Pages Deployment Guide

Deploying a Vite + React Router single-page application (SPA) on GitHub Pages requires specific configuration to handle assets paths and client-side routing. This guide explains how to configure and deploy the portfolio.

---

## Step 1: Set the Base Path in Vite

If your site is hosted at a custom domain (e.g., `https://myportfolio.dev`), you can skip this step. 

If it is hosted at a repository URL (e.g., `https://<username>.github.io/<repo-name>/`), you must set the base path in `vite.config.ts`:

1. Open `vite.config.ts`.
2. Add the `base` property matching your repository name:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/<repo-name>/', // Replace with your exact GitHub repository name
})
```

---

## Step 2: Handle SPA Client-Side Routing (Prevent 404s)

GitHub Pages does not support single-page application fallback routing natively. Navigating directly to `/projects/mercato` or refreshing the page will result in a GitHub 404 error. You can choose one of the two solutions below:

### Option A: Switch to HashRouter (Recommended for Simplicity)
The most robust way to deploy a static SPA on GitHub Pages is to use `HashRouter` instead of `BrowserRouter`. This puts a `#` in the URL (e.g., `https://username.github.io/repo/#/projects/mercato`), which prevents the browser from making server requests for subpaths.

To do this, update your router config in `src/App.tsx`:

```tsx
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
// Keep all other code identical
```

### Option B: The 404.html Redirect Trick
If you want to keep clean URLs without hashes, you can use a custom 404 redirection script:

1. Create a `public/404.html` file containing a script that captures the path and redirects the browser back to `index.html` with a search parameter.
2. Add a matching script inside `index.html` to parse the search parameter and replace the browser state.
3. *Note: Detailed scripts for this redirection mechanism can be found in community templates like [spa-github-pages](https://github.com/rafgraph/spa-github-pages).*

---

## Step 3: Configure Automated Deployment via GitHub Actions

The modern way to deploy to GitHub Pages is using GitHub Actions to build and deploy your site automatically every time you push to the `main` branch.

1. Create a file named `.github/workflows/deploy.yml` in your project folder.
2. Paste the following configuration:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main # Trigger on pushes to main branch

permissions:
  contents: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Install Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Build Site
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: dist # Folder Vite compiles assets into
          branch: gh-pages # Branch where compiled assets are pushed
```

3. Commit and push this file to your GitHub repository.
4. Go to your repository settings on GitHub:
   * Select **Pages** from the sidebar.
   * Under **Build and deployment**, set the source to **Deploy from a branch**.
   * Choose the **gh-pages** branch and save.
