import { Container } from '@mui/material';
import RegisterForm from './RegisterForm';
import Header from '../../components/Header/Header';

function RegisterPage() {
  return (
    <Container>
      <Header />
      <RegisterForm />
    </Container>
  );
}

export default RegisterPage;
