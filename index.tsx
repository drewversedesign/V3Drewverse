import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

/**
 * Root element selector with fallback error display
 */
const rootEl = document.getElementById('root');

if (rootEl) {
  try {
    const root = ReactDOM.createRoot(rootEl);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (err) {
    console.error("React Bootstrap Error:", err);
    rootEl.innerHTML = `<div style="color: white; background: #121212; padding: 40px; font-family: sans-serif; height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center;">
      <div>
        <h1 style="color: #F97316;">Application Error</h1>
        <p>Something went wrong while starting the site.</p>
        <p style="font-size: 12px; opacity: 0.5;">${err instanceof Error ? err.message : 'Unknown Error'}</p>
      </div>
    </div>`;
  }
}