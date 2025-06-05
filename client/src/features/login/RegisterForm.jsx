import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Link as MuiLink,
} from '@mui/material';
import backgroundImage from '../../assets/2023639.jpg';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); //フック。関数などイベント内で動的に遷移。

  const processingRegister = async () => {
    try {
      await axios.post('/api/auth/register', { username, email, password });
      alert('登録に成功しました。ログインしてください。');
      navigate('/login');
    } catch (err) {
      alert('登録失敗');
      console.err(err);
    }
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
            ユーザ登録
          </Typography>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              processingRegister();
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
              label="メールアドレス"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              登録
            </Button>
          </form>
          <Typography align="center">
            <MuiLink
              component={Link}
              to="/login"
              sx={{ bgcolor: 'white', color: 'black' }}
            >
              ログインはこちら
            </MuiLink>
          </Typography>
        </Box>
      </Container>
    </Container>
  );
};

export default RegisterForm;
