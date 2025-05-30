import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import LoginPage from "./../features/login/LoginPage.jsx";
import RecordsPage from "../features/records/RecordsPage.jsx";
import RegisterPage from "../features/login/RegisterPage.jsx";
import StampPage from "../features/records/stamp/StampPage.jsx";
import MapPage from "../features/records/map/MapPage.jsx";

const App = ()=>{
    return (
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/records" element={<RecordsPage />} />
          {/* <Route path="/mypage" element={<MyPage />} /> */}
          {/* <Route path="/mypage/records" element={<Myrecords />} /> */}
          <Route path="/map" element={<MapPage />} />
          <Route path="/stamp" element={<StampPage />} />
        </Routes>
      </BrowserRouter>
    );
}

export default App; 