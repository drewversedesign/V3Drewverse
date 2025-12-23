import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// Directly access the element and render to avoid intermediate const declarations
// which can occasionally be mangled by platform-specific snippet injections.
const el = document.getElementById('root');
if (el) {
  ReactDOM.createRoot(el).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}