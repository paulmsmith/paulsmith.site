# Personal website repo

This site is built with [Eleventy](https://www.11ty.dev/) and deployed to GitHub Pages.

## Build locally

```bash
npm install
npm run build
```

Generated site output is written to `public/`.

## Deployment

A GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and deploys the `public/` directory to GitHub Pages on pushes to `main`.
