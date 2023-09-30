import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from './components/Context/ThemeContext/ThemeContext';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './components/Context/UserContext/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <UserProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </UserProvider>
  </BrowserRouter>
);
