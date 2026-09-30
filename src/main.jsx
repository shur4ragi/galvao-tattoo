import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { resetScrollOnReload } from './utils/resetScrollOnReload.js';
import './styles/globals.css';
import './styles/buttons.css';

resetScrollOnReload();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
