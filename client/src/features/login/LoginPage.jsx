import { Container } from '@mui/material';
import LoginForm from './LoginForm';
import Header from '../../components/Header/Header';

function LoginPage() {
  return (
    <Container>
      <Header />
      <LoginForm />
    </Container>
  );
}

export default LoginPage;
