import { Container } from '@mui/material';
import LoginForm from './LoginForm';
import Header from '../../components/Header/Header';

function LoginPage() {
  return (
    <Container
      disableGutters
      maxWidth='false'

    >
      <Header />
      <LoginForm />
    </Container>
  );
}

export default LoginPage;
