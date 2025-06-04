import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import LoginPage from './../features/login/LoginPage.jsx';
import RecordsPage from '../features/records/RecordsPage.jsx';
import RegisterPage from '../features/login/RegisterPage.jsx';
import StampPage from '../features/records/stamp/StampPage.jsx';
import MapPage from '../features/records/map/MapPage.jsx';
import React, { useState, createContext } from 'react';
import axios from 'axios';

export const context = createContext();

async function postToX() {
  await axios.post('/api/post', {text: 'テスト投稿', path: '/Users/user/BTC8/scheduler/front/public/scheduler.png'})
  .then(res => console.log(res.data));
}

const App = () => {
  const [postRendering, setPostRendering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function rendering() {
    setPostRendering(!postRendering);
  }
  return (
    <context.Provider
      value={{ rendering, postRendering, isLoading, setIsLoading }}
    >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/login' />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/records' element={<RecordsPage />} />
          <Route path='/map' element={<MapPage />} />
          <Route path='/stamp' element={<StampPage />} />
        </Routes>
        <button onClick={postToX}>テストボタン</button>
      </BrowserRouter>
    </context.Provider>
  );
};

export default App;
