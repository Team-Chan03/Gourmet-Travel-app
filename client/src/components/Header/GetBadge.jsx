import { useContext, useEffect, useState } from 'react';
// prettier-ignore
import {Modal,Box,Button,TextField,Rating,Typography, Checkbox } from "@mui/material";
import axios from 'axios';

import { context } from '../../app/App';

function GetBadge() {
  const {
    medal,
    setMedal,
    message,
    setMessage,
    getBadgeOpen,
    setGetBadgeOpen,
    prefecture,
    setPrefcture,
  } = useContext(context);

  const [medalSrc, setMedalSrc] = useState('');

  useEffect(() => {
    if (medal === 'gold') {
      setMedalSrc(
        'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiNPKlMdkjRmWWYkDC3utOi1xZQAEe-6uCsDxMlQazbX12_MTFGou-ntPuXs6zASgUpF1XM6mxecCbw15-TWViK6sgW9wTCkr14DwVYZhUNti7DZBsGRjJxehC6iBj6fY-1xgAEt7cJiNOL/s800/medal1.png'
      );
    } else if (medal === 'silver') {
      setMedalSrc(
        'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjrF4ebdhiJ_EZLEumODJROJZjRiRaME9z_5zFh_BtQwhIm4X7YvX6zjzUg6Kw9zB9a8IVgmsbpOsq23STKD2G9GNcz-v_vsJPDIK4klnBo1Bi458kDwSXAilzUFGLcTX3O1MCNfL5SaSBb/s800/medal2.png'
      );
    } else if (medal === 'bronze') {
      setMedalSrc(
        'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgwPp9xsugpNsXCUI-8ZADbHgiGPeD8FrgWnbYYidGATT8ascPNKDE_0kQq9o2E1Pl_pkWf0Uaw3yB7Vdv4EEbtovVG6MYvtrwmLTVDG-6zAeg92ej1gXxBwRC1nrfXKQhNsyYPYZVYrSZD/s800/medal3.png'
      );
    }
  }, [getBadgeOpen, medal]);

  async function postToX() {
    await axios
      .post('/api/post', {
        text:
          `${prefecture}で${medal}メダルを獲得しました！` +
          '\n' +
          'posted by https://gourmet-travel-app-29ug.onrender.com/' +
          '\n' +
          '#グルメ #旅行 #都道府県 #gourmet #travel #prefecture ' +
          `#${prefecture}`,
        url: medalSrc,
      })
      .then((res) => console.log(res));
  }

  return medalSrc ? (
    <Modal open={getBadgeOpen}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: 400 },
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          whiteSpace: 'pre-wrap',
        }}
      >
        <Typography variant="h6" component="h2" sx={{ color: 'black' }}>
          {`${message}`}
        </Typography>

        <Box
          component="img"
          src={medalSrc}
          alt="メダル"
          sx={{
            width: '70%',
            borderRadius: 1,
            display: 'flex',
            margin: 'auto',
          }}
          textAlign="center"
        />
        <Button
          onClick={() => {
            postToX();
            setGetBadgeOpen(false);
            setMessage('');
            setMedal('');
          }}
        >
          post to{'　'}
          <img style={{ height: '15px' }} src="/logo-black.png" />
        </Button>

        <Button
          onClick={() => {
            setGetBadgeOpen(false);
            setMessage('');
            setMedal('');
            setPrefcture('');
          }}
        >
          閉じる
        </Button>
      </Box>
    </Modal>
  ) : (
    ''
  );
}

export default GetBadge;
