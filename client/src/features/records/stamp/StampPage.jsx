import { Container } from '@mui/material';
import Header from '../../../components/Header/Header';
// import Stamp from "./Stamp";
import CountryList from './CountryList';
import StampCard from './StampCard';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

axios.defaults.withCredentials = true;

function StampPage() {
  const [userPostData, setUserPostData] = useState();
  const [selectCountry, setSelectCountry] = useState();

  async function getUserData() {
    try {
      const fetchData = await axios.get('/api/records/user');
      setUserPostData(fetchData.data);
    } catch (err) {
      alert('データ取得失敗');
      console.error(err);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);
  console.log(selectCountry);

  return (
    <Container maxWidth="false">
      <Header />
      {/* <Stamp/> */}
      <Container sx={{ display: 'flex' }} maxWidth="false">
        <CountryList states={{ userPostData, setSelectCountry }} />
        <StampCard states={{ userPostData, selectCountry }} />
      </Container>
    </Container>
  );
}

export default StampPage;
