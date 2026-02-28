# Copilot instructions for this repo

## Overview
- This is a static site built with Eleventy 3, Nunjucks layouts, and Markdown content; source lives in `src/` and the built site is written to `public/`.
- Eleventy is configured in `.eleventy.js` with a custom Nunjucks environment, filters, shortcodes, and collections; avoid duplicating this logic in templates.
- Content and templates follow a small set of patterns: Markdown posts/weeknotes, Nunjucks pages, shared layouts, and a few custom data/config files.

## Build & run
- Install dependencies with `npm install` (Node 24 as per `package.json` engines).
- Full static build: `npm run build` (runs `prebuild`, Eleventy, Rollup, and Sass; never edit `public/` by hand).
- Local development: `npm run watch` (or `npm run start` which builds then runs `watch` with `NODE_ENV=development`); Eleventy serves on port 8000.
- Production-like preview: `npm run preview` (same watch stack with `NODE_ENV=production`, so html-minification and other prod-only behaviour applies).
- Netlify CMS local proxy (for auth-less CMS testing): `npm run cms`.

## Content model
- Site-wide permalink behaviour for Nunjucks and Markdown content is set in `src/content/content.config.js` – it strips the leading `content/` from `page.filePathStem` and adds a trailing slash; keep new content under `src/content/` to benefit from this.
- Blog posts live in `src/content/posts/*.md`; `src/content/posts/posts.config.js` assigns the `post.njk` layout. Use front matter like in `hello-world.md` (e.g. `title`, `date`, `tags`, `heading`, `summary`, `social_description`, `social_image`).
- Weeknotes live in `src/content/weeknotes/*.md`; `src/content/weeknotes/weeknotes.config.js` sets `layout: 'weeknote.njk'` and feed metadata. Follow existing front matter (`title`, `date`, nested `weeknote: { season, episode }`, `description`, social fields).
- The Weeknotes index page is `src/content/weeknotes.njk`, which paginates over the `collections.weeknotes` collection and uses the `collection.njk` layout.
- Other top-level pages (about, blogroll, writing, etc.) are Nunjucks files in `src/content/*.njk` using the shared layouts.

## Templates, collections & filters
- Base layouts live in `src/templates/layouts/` (`base.njk`, `page.njk`, `post.njk`, `weeknote.njk`, `collection.njk`). When adding a new content type, prefer adding a layout here and wiring it via a `*.config.js` file.
- Eleventy collections are defined in `.eleventy.js`: `weeknotes` from `./src/content/weeknotes/*.md` and `posts` from `./src/content/posts/*.md`, both reversed for newest-first ordering. Use these collections instead of re-scanning the filesystem in templates.
- Global data (e.g. `node_env`, `isDev`, `cloudinaryKey`) is registered in `.eleventy.js` and per-collection defaults in `*.config.js` files; reuse these rather than hardcoding environment checks.
- Custom filters are in `lib/filters/` and wired up in `.eleventy.js`. Key ones: `date`, `markdown`, `slug`, `sort`, `widont`, `console`, `dump`, `find`, `padstart`, and `weekdate` (which turns a date into the start/end of its week). Prefer these existing filters in templates instead of rolling your own.

## Markdown & shortcodes
- Markdown is processed via `lib/libraries/markdown.js` (markdown-it + plugins). It enables HTML in markdown, adds anchor links on headings, and supports deflists, footnotes, and a table of contents block.
- Horizontal rules (`---`) are styled by `markdown-it-class` as decorative section breaks; use them instead of manual divs for section separators in long posts.
- Use the `imgr` shortcode (from `lib/shortcodes/cloudinaryimage.js`) for images in content, as in `src/content/posts/hello-world.md` – this handles Cloudinary, sizing, and classes.
- Use the `video` shortcode (from `lib/shortcodes/video.js`) for embedded video blocks instead of handwritten `<video>` markup.

## Assets (CSS, JS, images)
- Sass source lives under `src/assets/stylesheets/` (with `abstracts`, `foundations`, `utilities`, `components`); the main entry is `application.scss` which compiles to `public/assets/stylesheets/application.css` via `npm run build:stylesheets`. New partials should be imported through the existing index/entry structure.
- Client-side JavaScript entry is `src/assets/javascripts/application.js`; Rollup (configured in `rollup.config.js`) bundles it to `public/assets/javascripts/application.js` using `@rollup/plugin-node-resolve` and `@rollup/plugin-commonjs`. Add new client code via this entry or extend the Rollup config if you introduce additional bundles.
- Static assets under `src/assets/images` and `src/assets/fonts` are copied through using `eleventyConfig.addPassthroughCopy` in `.eleventy.js`; keep new static files under these directories.

## Data, navigation & CMS
- Global site metadata and navigation live in `src/data/app.js` (e.g. `productName`, `url`, `navigation.items`); update this file when changing top-level navigation.
- Additional top-level data is in `src/data/*.js` (e.g. `blogroll.js` for the blogroll page); prefer adding structured data here rather than hardcoding lists into templates.
- Netlify CMS is wired via `src/admin/index.html` and `src/content/cms.config.njk`; when changing content types or collections that authors edit via the CMS, update the CMS config alongside the Eleventy config.

## Workflow & safety notes
- Do not edit anything under `public/` directly; always change source files under `src/`, `lib/`, or `src/data/` and rebuild.
- When introducing a new content type or section, mirror the existing pattern: create a directory under `src/content/`, add a `*.config.js` with layout/default data, wire a collection in `.eleventy.js` if you need one, and add a listing page using `collection.njk`.
- Keep Cloudinary configuration and secrets in environment variables (`cloudinaryKey` via `.env` + `dotenv`); do not hardcode secret values into templates or shortcodes.
- Deployment is handled by GitHub Actions (`.github/workflows/deploy.yml`) which runs the build and publishes `public/` to GitHub Pages; changes that affect the build should be validated locally with `npm run build` before relying on CI.
