# WordGlow

WordGlow is a vocabulary-learning tool focused on in-context reading.

This repository contains the current front-end project and testing setup used for the public demo and iteration.

## Highlights

- Fast query flow for selected words/phrases
- Pronunciation playback support
- Chinese meaning + part of speech display
- Word-root decomposition display
- Local-first lookup/cache behavior for repeated queries

## Tech Stack

- React 18
- Vite
- Radix UI
- Playwright

## Quick Start

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` start local development
- `npm run build` build production bundle
- `npm run test` run Playwright E2E tests
- `npm run test:headed` run E2E tests in headed mode
- `npm run test:debug` debug E2E tests
- `npm run test:ui` open Playwright UI mode
- `npm run test:report` open test report

## Project Structure

```text
src/
  components/      UI components
  styles/          style modules
  App.tsx          app entry component
tests/             Playwright tests
```

## Security

- Secrets are excluded by `.gitignore` (for example `.env*`, `mcp.json`, key files).
- Keep local credentials in ignored files only.
- If any key was ever exposed, rotate it immediately.

## License

Private repository by default (`"private": true` in `package.json`).

## Maintenance

- Project archive: `docs/PROJECT_ARCHIVE.md`
