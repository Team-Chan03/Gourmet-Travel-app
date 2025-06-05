import React from 'react';
import {
  Box,
  Card,
  CardMedia,
  CircularProgress,
  Fab,
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from '@mui/material';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { context } from '../../app/App';
import AddIcon from '@mui/icons-material/Add';
import useWindowSize from '../../hooks/useWindowSize';
import RecordForm from '../../components/Header/RecordForm';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import backgroundImage from '../../assets/2023639.jpg';
import paperairplaneImage from '../../assets/07DAABE4-7654-4506-A67D-893E0DEC5E7F.png';
import './Records.css';

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
    <Container
      disableGutters
      maxWidth="false"
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        border: 1,
        borderColor: 'white',
      }}
    >
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
        component="main"
        sx={{
          p: 2,

          minHeight: '100vh',
          backgroundAttachment: 'fixed',
        }}
      >
        <Container maxWidth="xl">
          <ImageList variant="woven" cols={3} gap={10}>
            {records.map((obj) => (
              <ImageListItem
                key={obj.id}
                className="img-hover"
                onLoad={() => handleImageLoad(obj.id)}
                onError={() => handleImageError(obj.id)}
              >
                <img
                  src={obj.image_url}
                  alt={obj.comment}
                  loading="lazy"
                  style={{ borderRadius: 20 }}
                />
                <ImageListItemBar
                  title={obj.dishname}
                  subtitle={obj.comment}
                  sx={{
                    background:
                      'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, ' +
                      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                  }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Container>
      </Box>
      <RecordForm open={formOpen} onClose={handleToggleForm} />
      <Container
        className="paperairplane"
        disableGutters
        maxWidth="false"
        onClick={handleToggleForm}
        sx={{
          position: 'sticky',
          bottom: -30,
          backgroundImage: `url(${paperairplaneImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: 200,
          width: 200,
          opacity: 0.8,
        }}
      >
      </Container>
    </Container>
  );
};

export default RecordsList;
