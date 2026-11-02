# Belva's Dream

A responsive static website built with plain HTML, CSS, and JavaScript.

## Files
- `index.html` — page structure
- `style.css` — styling and responsive layouts
- `script.js` — dream form, local storage, search, filter, and delete

## Run locally
Open `index.html` in a browser. No build step or server is required.

## Publish with GitHub Pages
1. Create a GitHub repository (for example, `belvas-dream`).
2. Upload `index.html`, `style.css`, and `script.js` to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then save.
6. Open the published URL shown in the Pages settings.

## Important storage note
Dream entries are saved with the browser's `localStorage`. They remain available in the same browser and device, but are not automatically shared with other visitors and may be cleared if browser data is removed.

A truly shared public dream wall needs a shared data service (for example, a backend or database). This project intentionally does not include one, in keeping with the no-backend requirement.

Google Fonts are loaded from Google Fonts when internet access is available; the site still has fallback fonts if they cannot load.
