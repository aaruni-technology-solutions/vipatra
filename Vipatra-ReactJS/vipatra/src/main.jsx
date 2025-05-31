// src/index.js or src/main.jsx
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Your global Tailwind styles

import './i18n/i18n'; // <<< IMPORT YOUR i18n CONFIGURATION HERE

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Suspense fallback="Loading translations..."> {/* Fallback UI while translations load */}
      <App />
    </Suspense>
  </React.StrictMode>
);