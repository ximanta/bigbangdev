import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { StellarNavigatorProvider } from './context/StellarNavigatorContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <StellarNavigatorProvider>
        <App />
      </StellarNavigatorProvider>
    </BrowserRouter>
  </React.StrictMode>
);