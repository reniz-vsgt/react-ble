import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Pages/App/App'
import { GoogleOAuthProvider } from "@react-oauth/google"


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_SOCIAL_AUTH_GOOGLE_OAUTH2_KEY!}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>
);
