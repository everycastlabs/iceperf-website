import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthKitProvider } from '@workos-inc/authkit-react';

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <React.StrictMode>
    <AuthKitProvider
      clientId={import.meta.env.VITE_WORKOS_CLIENT_ID}
      devMode={true}
    >
      <BrowserRouter basename="/">
        <App />
      </BrowserRouter>
    </AuthKitProvider>
  </React.StrictMode>
);
