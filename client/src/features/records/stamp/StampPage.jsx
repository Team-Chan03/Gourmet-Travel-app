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

  async function getUserData() {
    try {
      await axios.get('/api/records');
    } catch (err) {
      alert('データ取得失敗');
      console.error(err);
    }
  }

  return (
    <Container maxWidth="false">
      <Header />
      {/* <Stamp/> */}
      <Container sx={{ display: 'flex' }}>
        <CountryList />
        <StampCard />
      </Container>
    </Container>
  );
}

export default StampPage;
