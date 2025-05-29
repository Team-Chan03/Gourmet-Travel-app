import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import LoginForm from './components/LoginForm.jsx';
import RegisterForm from './components/RegisterForm.jsx';
import Mypage from './components/Mypage.jsx';
import Stamp from './components/Stamp.jsx';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router';

// import './index.css'
import App from './App.jsx';
// import Header from "./Header/Header.jsx";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/records" element={<App />} />
      <Route path="/mypage" element={<Mypage />} />
      <Route path="/mypage/records" element={<Myrecords />} />
      <Route path="/mypage/map" element={<Map />} />
      <Route path="/mypage/stamp" element={<Stamp />} />
    </Routes>
  </BrowserRouter>
);
