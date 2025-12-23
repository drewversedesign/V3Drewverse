import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

/**
 * We use a let declaration here just in case the deployment environment 
 * tries to target const declarations for global variable injection.
 */
let rootElement = document.getElementById('root');

if (rootElement) {
  try {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Critical error during React render:", error);
    rootElement.innerHTML = `<div style="padding: 20px; color: white; background: red; font-family: sans-serif;">
      <h1>Application Error</h1>
      <p>The application failed to start. Please check the console for details.</p>
    </div>`;
  }
}