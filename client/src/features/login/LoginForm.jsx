import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router';
import backgroundImage from '../../assets/2023639.jpg';

import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Link as MuiLink,
} from '@mui/material';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); //フック。関数などイベント内で動的に遷移。

  const userIdFromCookie = document.cookie
        .split('; ')
        .find((row) => row.startsWith('userId='))
        ?.split('=')[1];

  console.log(userIdFromCookie);

  if(userIdFromCookie) {
    window.open('/records', '_self');
  }

  const processingLogin = async () => {
    try {
      await axios.post('/api/auth/login', { username, password });
      navigate('/records'); //ログイン後formに遷移
    } catch (err) {
      alert('ログイン失敗');
      console.error(err);
    }
  };

  const backUrl = import.meta.env.VITE_BACKEND_URL;

  const googleLogin = () => {
    window.location.href = `${backUrl}/api/auth/google`;
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
      <Container maxWidth="xs">
        <Box sx={{ mt: 8, mb: 4 }}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              background:
                'linear-gradient(to bottom, rgba(255,255,255,0.7) 0%, ' +
                'rgba(0,0,0,0) 70%, rgba(0,0,0,0) 100%)',
            }}
          >
            ログイン
          </Typography>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              processingLogin();
            }}
          >
            <TextField
              sx={{ bgcolor: 'white', opacity: 0.7, color: 'black' }}
              label="ユーザー名"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              sx={{ bgcolor: 'white', opacity: 0.7, color: 'black' }}
              label="パスワード"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2, mb: 2, bgcolor: 'orange' }}
            >
              ログイン
            </Button>
          </form>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2, mb: 2, bgcolor: 'orange' }}
            // onClick={() => {
            //   window.location.href = `${backUrl}/api/auth/google`;
            // }}
            onClick={googleLogin}
          >
            Googleでログイン
          </Button>
          <Typography align="center">
            <MuiLink
              component={Link}
              to="/register"
              sx={{ bgcolor: 'white', color: 'black' }}
            >
              ユーザ登録はこちら
            </MuiLink>
          </Typography>
        </Box>
      </Container>
    </Container>
  );
};

export default LoginForm;
