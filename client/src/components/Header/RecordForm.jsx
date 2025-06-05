import { useContext, useRef, useState } from 'react';
// prettier-ignore
import {Modal,Box,Button,TextField,Rating,Typography, Checkbox } from "@mui/material";
import axios from 'axios';
import { context } from '../../app/App';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function RecordForm({ open, onClose }) {
  const [dishname, setDishname] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [photoUrl, setPhotoUrl] = useState('');
  const [checked, setChecked] = useState(false);

  const refImgPath = useRef();

  const {
    rendering,
    setIsLoading,
    setMedal,
    message,
    setMessage,
    setGetBadgeOpen,
    setPrefecture,
  } = useContext(context);

  let region = 'somewehre';

  /**画像をURLにする関数*/
  const handleFileChange = async (e) => {
    const file = e.currentTarget.files[0];
    try {
      const formData = new FormData(); // FormData の箱にファイルを詰め込む←ファイルをfetchする時は使わないといけないらしい
      formData.append('image', file); //key image   val file   として格納postでimageしか見ない
      const res = await axios.post('/api/upload-image', formData);
      setPhotoUrl(res.data.url);
      console.log('imgBBへupload完了');
    } catch (err) {
      console.error('画像アップロード失敗', err);
      alert('画像アップロードに失敗しました');
    }
  };

  //各入力項目の状態をayloadにオブジェクトとして格納しpostする関数payload内の変数はカラムに合わしてあげる必要有り！
  const handleSubmit = async () => {
    if (photoUrl) {
      setIsLoading(true);
      const userIdFromCookie = document.cookie
        .split('; ')
        .find((row) => row.startsWith('userId='))
        ?.split('=')[1];
      setDishname('');
      setComment('');
      setRating(5);
      setPhotoUrl('');
      onClose();
      const { latitude, longitude } = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => resolve(position.coords),
          async (error) => {
            console.log('位置情報なし', error);
            try {
              const res = await axios.post('/api/records/submit', {
                user_id: userIdFromCookie,
                image_url: photoUrl,
                comment,
                dishname,
                rating,
                // latitude: '',
                // longitude: '',
                created_at: new Date(),
              });
              console.log('🚀 ~ handleSubmit ~ res:', res);
            } catch (err) {
              console.error('❌ POST エラー', err);
            }

            setIsLoading(false);
            rendering();
          }
        );
      });
      if (!!latitude && !!longitude) {
        const resMap = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await resMap.json();
        region = data.address.province;
      }
      try {
        const res = await axios.post('/api/records/submit', {
          user_id: userIdFromCookie,
          image_url: photoUrl,
          comment,
          dishname,
          rating,
          latitude,
          longitude,
          created_at: new Date(),
        });

        setMedal(res.data.medal);
        setMessage(res.data.message);
        setPrefecture(res.data.region);

        console.log('🚀 ~ handleSubmit ~ res:', res);
      } catch (err) {
        console.error('❌ POST エラー', err);
      }

      // await fetchRecord();

      console.log(`post to Xのチェックボックスが${checked}`);
      if (checked) {
        postToX();
        console.log(`postToXの関数が呼び出されました`);
      }

      setChecked(false);

      setIsLoading(false);
      rendering();
    }
  };

  if (message) {
    setGetBadgeOpen(true);
  }

  async function postToX() {
    const hash = region
      ? '#グルメ #旅行 #都道府県 #gourmet #travel #prefecture ' + `#${region}`
      : '#グルメ #旅行 #都道府県 #gourmet #travel #prefecture ';
    await axios
      .post('/api/post', {
        text:
          dishname +
          '\n' +
          comment +
          '\n' +
          'posted by https://gourmet-travel-app-29ug.onrender.com/' +
          '\n' +
          hash,
        url: photoUrl,
      })
      .then((res) => console.log(res));
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: 360 },
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h6" component="h2" sx={{ color: 'black' }}>
          新規投稿
        </Typography>

        <Button
          variant="contained"
          component="label"
          startIcon={<CloudUploadIcon />}
          sx={{ bgcolor: '#ff5722' }}
        >
          画像をアップロード
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />
        </Button>
        {photoUrl && (
          <Box
            ref={refImgPath}
            component="img"
            src={photoUrl}
            alt="選択画像"
            sx={{
              height: '30%',
              width: '30%',
              borderRadius: 1,
              display: 'flex',
              margin: 'auto',
            }}
            textAlign="center"
          />
        )}

        <TextField
          label="料理名"
          multiline
          minRows={1}
          value={dishname}
          onChange={(e) => setDishname(e.target.value)}
          fullWidth
        />

        <TextField
          label="コメント"
          multiline
          minRows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          fullWidth
        />

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Rating
            value={rating}
            onChange={(a, val) => setRating(val ?? rating)}
          />
          <Typography sx={{ ml: 1 }}>{rating} / 5</Typography>
        </Box>

        <Box sx={{ gap: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Button sx={{ color: 'black' }}>
            <Checkbox onClick={() => setChecked(!checked)} />
            post to{'　'}
            <img style={{ height: '15px' }} src="/logo-black.png" />
          </Button>

          <Button
            onClick={() => {
              onClose();
              setChecked(false);
            }}
          >
            キャンセル
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!photoUrl}
          >
            投稿
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default RecordForm;
