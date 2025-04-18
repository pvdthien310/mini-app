import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter, Routes, Route } from 'react-router';
import MarketingPage from './pages/homePage/MarketingPage.tsx';
import Checkout from './pages/check-out/Checkout.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
      <Routes>
        <Route path="/home" element={<MarketingPage />} />
      </Routes>
      <Routes>
        <Route path="/check-out" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
