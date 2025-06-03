import React from 'react';
import {
  Box,
  Card,
  CardMedia,
  Button,
  CircularProgress,
  Fab,
} from '@mui/material';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router';
import { context } from '../../app/App';
import AddIcon from '@mui/icons-material/Add';
import useWindowSize from '../../hooks/useWindowSize';
import RecordForm from '../../components/Header/RecordForm';

const RecordsList = () => {
  const { postRendering, isLoading, setIsLoading } = useContext(context);
  const [records, setRecords] = useState([]);
  // const [username, setUsername] = useState('');
  const [imageLoadedStates, setImageLoadedStates] = useState({});
  const [isRecordsFetched, setIsRecordsFetched] = useState(false);
  // const navigate = useNavigate(); //フック。関数などイベント内で動的に遷移。

  const [width, height] = useWindowSize();

  //全てのrecordsを取得する関数
  const fetchRecord = async () => {
    try {
      const res = await axios.get('/api/records/user');
      console.log('☺️ レーコード更新~ fetchRecord ~ res:', res);
      setRecords(res.data);
      const newImageLoadedStates = {};
      res.data.forEach((record) => {
        if (record.image_url) {
          newImageLoadedStates[record.id] = false; // 初期状態は未ロード
        }
      });
      setImageLoadedStates(newImageLoadedStates);
      setIsRecordsFetched(true);
    } catch (err) {
      console.log('RecordList の listGet失敗', err);
      setIsRecordsFetched(true);
    }
  };

  //認証用
  // Appに入る
  // const loadApp = async () => {
  //   try {
  //     const res = await axios.get('/api/app');
  //     setUsername(res.data.username); //stateで管理しないと再度レンダリングしてくれない
  //     console.log('認証に成功しました');
  //   } catch (err) {
  //     //セッションID無ければ401を返し,catchに入る
  //     if (err.response.status === 401) {
  //       alert('セッションIDがありません');
  //       navigate('/');
  //     } else {
  //       console.error('予期しないえらーが発生しました', err);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   loadApp();
  //   const interval = setInterval(() => {
  //     loadApp();
  //   }, 10 * 60 * 1000);
  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    fetchRecord();
  }, [postRendering]);

  useEffect(() => {
    setIsLoading(true);
    console.log('isloadingオン');
  }, []);

  const handleImageLoad = (recordId) => {
    setImageLoadedStates((prev) => ({
      ...prev,
      [recordId]: 'loaded', // 該当IDの画像をロード済みとマーク
    }));
  };

  const handleImageError = (recordId) => {
    console.warn(`画像の読み込みに失敗しました: ${recordId}`);
    setImageLoadedStates((prev) => ({
      ...prev,
      [recordId]: 'error', // 該当IDの画像をエラーとマーク
    }));
  };

  // 全ての画像が読み込まれたかを確認するuseEffect
  useEffect(() => {
    if (!isRecordsFetched) {
      return;
    }
    // recordsが空の場合は処理しない（まだデータがない場合）
    if (records.length === 0) {
      // recordsに画像を持つものがなければ、ローディング終了
      setIsLoading(false);
      return;
    }
    console.log('imageLoadedStates', imageLoadedStates);

    // records内のimage_urlを持つ全ての画像がロード済みかどうか
    const allImagesLoaded = records.every((record) => {
      return (
        imageLoadedStates[record.id] === 'loaded' ||
        imageLoadedStates[record.id] === 'error'
      );
    });

    if (allImagesLoaded) {
      setIsLoading(false);
      console.log('全ての画像が読み込まれました！isloadingオフ');
    }
  }, [imageLoadedStates, records, setIsLoading]); // imageLoadedStatesかrecordsが変更されたら実行

  const [formOpen, setFormOpen] = useState(false);

  const handleToggleForm = () => {
    setFormOpen((val) => !val);
  };

  return (
    <div>
      {isLoading && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            zIndex: 2,
          }}
        >
          <CircularProgress size={80} /> ローデイング中です
        </Box>
      )}
      <Box
        component='main'
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
                  component='img'
                  height='180'
                  image={obj.image_url}
                  alt='投稿写真'
                  sx={{
                    backgroundColor: '#eee',
                    objectFit: 'cover',
                  }}
                  onLoad={() => handleImageLoad(obj.id)}
                  onError={() => handleImageError(obj.id)}
                />
              )}
              <div className='record_header'>
                <p className='record_content'>料理名：{obj.dishname}</p>
                <p className='record_content'>コメント：{obj.comment}</p>
                <span className='record_rating'>{'⭐'.repeat(obj.rating)}</span>
              </div>
            </Card>
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          top: height - 150,
          left: width / 2 - 70,
          position: 'fixed',
          zIndex: 1,
        }}
      >
        <Fab
          color='success'
          variant='extended'
          size=''
          onClick={handleToggleForm}
        >
          <AddIcon /> new post
        </Fab>
      </Box>
      <RecordForm open={formOpen} onClose={handleToggleForm} />
    </div>
  );
};

export default RecordsList;
