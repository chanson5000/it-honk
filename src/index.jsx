import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/bungee/latin-400.css';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Cache the site for offline use (production builds only; see src/sw.js).
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}
