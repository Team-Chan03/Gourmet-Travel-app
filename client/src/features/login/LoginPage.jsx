import { Container } from '@mui/material';
import LoginForm from './LoginForm';
import Header from '../../components/Header/Header';

function LoginPage() {
  return (
    <Container  maxWidth="false">
      <Header />
      <LoginForm />
    </Container>
  );
}

export default LoginPage;
