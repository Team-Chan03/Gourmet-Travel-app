import { Container } from '@mui/material';
import Header from '../../../components/Header/Header';
import PrefectureList from './PrefectureList';
import StampCard from './StampCard';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import backgroundImage from '../../../assets/2023639.jpg';

axios.defaults.withCredentials = true;
function StampPage() {
  const [userPostData, setUserPostData] = useState();
  const [selectCountry, setSelectCountry] = useState();
  const [selectDish, setSelectDish] = useState('');
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

  return (
    <>
      <Container disableGutters maxWidth='false'>
        <Header />
        <Container
          disableGutters
          maxWidth='false'
          sx={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            border: 1,
            // borderColor: 'brown'
          }}
        >
          <Container sx={{ display: 'flex' }} maxWidth='false'>
            <Container maxWidth='false' sx={{ flex: 1 }}>
              <PrefectureList
                states={{
                  userPostData,
                  setSelectCountry,
                  setSelectDish,
                }}
              />
            </Container>
            <Container maxWidth='false' sx={{ flex: 3 }}>
              <StampCard states={{ userPostData, selectCountry, selectDish }} />
            </Container>
          </Container>
        </Container>
      </Container>
    </>
  );
}
export default StampPage;
