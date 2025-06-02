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
      const fetchData = await axios.get('/api/records/user');
      setUserPostData(fetchData);
    } catch (err) {
      alert('データ取得失敗');
      console.error(err);
    }
  }

  // useEffect(() => {
  //   getUserData()
  // },[])

  // router.get('/user', async (req, res) => {
  //   const { userId } = req.cookies;
  //   try {
  //     const list = await db('records')
  //       .select('*')
  //       .where('user_id', Number(userId))
  //       .orderBy('created_at', 'desc');
  //     res.status(200).json(list);
  //   } catch (err) {
  //     console.error('🔥 /api/records/:user error:', err.message);
  //     res.status(500).json({ error: err.message });
  //   }
  // });

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
