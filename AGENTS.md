# Editing this website

- Root `index.html` and `product.html` are the canonical, user-editable pages. Read their current contents before editing and preserve manual user changes.
- Edit requested content directly in those pages. Shared behavior and dynamic text live in `site.js`; styling lives in `site.css`, `brand.css`, and `theme.css`.
- Do not regenerate pages or styles from the original design folder, `localize.cjs`, or `translations-vi.cjs`. These are historical references only.
- `build.cjs` is intentionally a non-writing compatibility command. Do not restore the old generator unless the user explicitly requests that workflow.
- Never restore content the user has removed unless explicitly asked.
