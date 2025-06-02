import React from 'react'
import {
    Box,
    Card,
    CardMedia,
  } from '@mui/material';
  import { useState, useEffect } from 'react';
  import axios from 'axios';
  import Header from '../../components/Header/Header';
  import { useNavigate } from 'react-router';

const RecordsList = () => {

    const [records, setRecords] = useState([]);
    const [username, setUsername] = useState('');
    const navigate = useNavigate(); //フック。関数などイベント内で動的に遷移。
  
    //全てのrecordsを取得する関数
    const fetchRecord = async () => {
      try {
        const res = await axios.get('/api/records');
        console.log('☺️ レーコード更新~ fetchRecord ~ res:', res);
        setRecords(res.data);
      } catch (err) {
        console.log('RecordList の listGet失敗', err);
      }
    };
  
    //認証用
    // Appに入る
    const loadApp = async () => {
      try {
        const res = await axios.get('/api/app');
        setUsername(res.data.username); //stateで管理しないと再度レンダリングしてくれない
        console.log('認証に成功しました');
      } catch (err) {
        //セッションID無ければ401を返し,catchに入る
        if (err.response.status === 401) {
          alert('セッションIDがありません');
          navigate('/');
        } else {
          console.error('予期しないえらーが発生しました', err);
        }
      }
    };
  
    useEffect(() => {
      loadApp();
  
      const interval = setInterval(() => {
        loadApp();
      }, 10 * 60 * 1000);
  
      return () => clearInterval(interval);
    }, []);
  
    useEffect(() => {
      fetchRecord();
    }, []);

  return (
    <div>
    <Box
      component="main"
      sx={{
        p: 2,
        backgroundImage:
          'url(https://www.chizu-seisaku.com/wp-content/uploads/2021/08/world-furumap-scaled.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        backgroundAttachment: 'fixed',
      }}
    >
      <Box
        sx={{
          mt: 10,
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2,1fr)',
            md: 'repeat(4,1fr)',
          },
          gap: 2,
        }}
      >
        {records.map((obj) => (
          <Card key={obj.id} sx={{ maxWidth: 450 }}>
            {obj.image_url && (
              <CardMedia
                component="img"
                height="180"
                image={obj.image_url}
                alt="投稿写真"
                sx={{
                  objectFit: 'contain',
                  backgroundColor: '#eee',
                  objectFit: 'cover',
                }}
              />
            )}
            <div className="record_header">
              <p className="record_content">コメント：{obj.comment}</p>
              <span className="record_rating">{'⭐'.repeat(obj.rating)}</span>
            </div>
          </Card>
        ))}
      </Box>
    </Box>
  </div>
  )
}

export default RecordsList