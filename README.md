# It Honk
For those who are easily distracted by [swingin' honks](https://www.ithonk.page).

Good luck at Principal, Dwayne!

## Features

- Press **Space** or **H** to honk from the keyboard.
- Installable and works offline after the first visit. `src/sw.js` is the
  service worker; the build fills in the list of files to cache.

## Development

Requires Node.js 22.22.2+, 24.15+, or 26+ (see `.nvmrc`).

```bash
npm install
npm run dev      # start the dev server
npm test         # run tests
npm run build    # production build to dist/
npm run preview  # serve the production build locally
```

## Adding a honk

Drop the audio file in `public/honks/` and add an entry to the `HONKS` list in `src/App.jsx`.
Use MP3 to keep the page light; convert other formats with:

```bash
ffmpeg -i input.wav -map 0:a -map_metadata -1 -c:a libmp3lame -q:a 2 public/honks/name.mp3
```

## Deployment

Every push to `master` is tested, built, and deployed to GitHub Pages by
`.github/workflows/ci.yml`.

One-time repository setup (Settings → Pages):

- **Source:** GitHub Actions
- **Custom domain:** `www.ithonk.page`, with **Enforce HTTPS** on

Because the site is deployed by Actions, the custom domain lives in these
settings; a `CNAME` file in the build output is not used.
