import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";
import store from './store'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));
const redirectTo = window.location.origin +'/business/profile'

root.render(
    <Provider store={store}> 
      <Auth0Provider
        domain='dev-herjy007a0b58rin.us.auth0.com'
        clientId='2kOEHq4Thm9AbJhNMMqEgaDXIrTLOGYx'
        redirectUri={redirectTo}>
        <App />
      </Auth0Provider>
    </Provider>
);
