# WordGlow Project Archive

Last updated: 2026-02-20 (CST)  
Baseline commit: `c61de03`

## 1. Current Baseline

- Repository: `https://github.com/evan-taojiangcb/huangli-programmer`
- Branch: `main`
- Package name: `wordglow`
- Runtime: React + Vite
- Test framework: Playwright

## 2. Core Commands

```bash
npm install
npm run dev
npm run build
npm run test
```

## 3. Key Paths

- App entry: `src/main.tsx`
- Main page: `src/App.tsx`
- UI components: `src/components/`
- E2E tests: `tests/`
- Build output: `build/`

## 4. Security Baseline

- Sensitive local config uses ignored files (`.env*`, `mcp.json`, key/cert files).
- Do not commit local credential files.
- If a key is exposed, rotate it first, then clean history if needed.

## 5. Update Workflow (Recommended)

1. Pull latest `main`.
2. Create a feature branch (`codex/<feature-name>`).
3. Implement feature/fix.
4. Run:
   - `npm run build`
   - `npm run test`
5. Update `README.md` if behavior changed.
6. Commit with clear scope (`feat:`, `fix:`, `docs:`).
7. Merge to `main` and push.

## 6. Release Checklist

- [ ] `npm run build` passes
- [ ] `npm run test` passes
- [ ] README reflects latest features
- [ ] No secrets in staged files
- [ ] Demo assets (gif/screenshots) are updated if UI changed

## 7. Next Suggested Improvements

- Add a changelog file (`CHANGELOG.md`) for versioned release notes.
- Add CI for auto-running `build + test` on pull requests.
- Add automated secret scanning in CI (for example `gitleaks`).
