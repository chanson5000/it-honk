import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Lists every file in the build output, relative to it, with '/' separators.
const listFiles = (dir, root = dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? listFiles(path, root) : [relative(root, path).split('\\').join('/')];
  });

// Writes dist/sw.js from src/sw.js, filling in the files to cache for offline
// use and a version that changes whenever any of them change.
function precache() {
  let outDir;
  return {
    name: 'precache',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const files = listFiles(outDir)
        .filter((file) => file !== 'sw.js' && file !== 'CNAME')
        .sort();
      const hash = createHash('sha256');
      for (const file of files) {
        hash.update(file).update(readFileSync(join(outDir, file)));
      }
      const urls = files.map((file) => (file === 'index.html' ? './' : `./${file}`));
      const source = readFileSync(resolve('src/sw.js'), 'utf8')
        .replace('self.__PRECACHE__', JSON.stringify(urls))
        .replace('self.__VERSION__', JSON.stringify(hash.digest('hex').slice(0, 12)));
      writeFileSync(join(outDir, 'sw.js'), source);
    },
  };
}

export default defineConfig({
  // Relative asset URLs so the site works at any path (custom domain or /it-honk/).
  base: './',
  plugins: [react(), precache()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.js'
  }
});
