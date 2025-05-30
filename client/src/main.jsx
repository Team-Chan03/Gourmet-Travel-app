import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import LoginForm from './features/login/LoginPage.jsx';
import RegisterForm from './features/login/RegisterPage.jsx';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router';
import App from './app/App.jsx';
import MyPage from './features/records/mypage/Mypage.jsx';
import StampPage from './features/records/stamp/StampPage.jsx';
import MapPage from './features/records/map/MapPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);

    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Navigate to="/login" />} />
    //     <Route path="/login" element={<LoginForm />} />
    //     <Route path="/register" element={<RegisterForm />} />
    //     <Route path="/records" element={<App />} />
    //     <Route path="/mypage" element={<MyPage />} />
    //     {/* <Route path="/mypage/records" element={<Myrecords />} /> */}
    //     <Route path="/mypage/map" element={<MapPage />} />
    //     <Route path="/mypage/stamp" element={<StampPage />} />
    //   </Routes>
    // </BrowserRouter>