import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/editor.css';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-markup';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
