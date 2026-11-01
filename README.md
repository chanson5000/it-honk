# It Honk
For those who are easily distracted by [swingin' honks](https://www.ithonk.page).

Good luck at Principal, Dwayne!

## Development

Requires Node.js 22.12+ (see `.nvmrc`).

```bash
npm install
npm run dev      # start the dev server
npm test         # run tests
npm run build    # production build to dist/
npm run preview  # serve the production build locally
```

## Adding a honk

Drop the audio file in `public/honks/` and add an entry to the `HONKS` list in `src/App.jsx`.

## Deployment

Every push to `master` is tested, built, and deployed to GitHub Pages by
`.github/workflows/ci.yml`. The custom domain is set by `public/CNAME`.
