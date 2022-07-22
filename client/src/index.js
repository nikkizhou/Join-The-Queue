import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain='dev-1gc7w2aa.us.auth0.com'
    clientId='TscMjmtUBaRhAjuKSIJgFHjoD1ySUp3V'
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
);