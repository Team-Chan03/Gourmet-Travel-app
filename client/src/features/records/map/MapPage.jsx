import { Container } from '@mui/material';
import Header from '../../../components/Header/Header';
import MapContent from './MapContent';

function MapPage() {
  return (
    <Container  maxWidth="false">
      <Header />
      <MapContent />
    </Container>
  );
}

export default MapPage;
