import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import LoginPage from './../features/login/LoginPage.jsx';
import RecordsPage from '../features/records/RecordsPage.jsx';
import RegisterPage from '../features/login/RegisterPage.jsx';
import StampPage from '../features/records/stamp/StampPage.jsx';
import MapPage from '../features/records/map/MapPage.jsx';
import { useState, createContext } from 'react';

export const context = createContext();

const App = () => {
  const [postRendering, setPostRendering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [medal, setMedal] = useState('');
  const [message, setMessage] = useState('');
  const [prefecture, setPrefecture] = useState('');

  const [getBadgeOpen, setGetBadgeOpen] = useState(false);

  function rendering() {
    setPostRendering(!postRendering);
  }
  return (
    <context.Provider
      value={{
        rendering,
        postRendering,
        isLoading,
        setIsLoading,
        medal,
        setMedal,
        message,
        setMessage,
        getBadgeOpen, 
        setGetBadgeOpen,
        prefecture,
        setPrefecture
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/records" element={<RecordsPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/stamp" element={<StampPage />} />
        </Routes>
      </BrowserRouter>
    </context.Provider>
  );
};

export default App;
