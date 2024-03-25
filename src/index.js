
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ContextProvider from './context/ContextProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';
// require("dotenv").config();
import env from "react-dotenv";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ContextProvider>
    <GoogleOAuthProvider clientId={env.REACT_APP_GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </ContextProvider>
);

