import React from 'react';
import { Container } from '@mui/material';
import Header from '../../components/Header/Header';
import RecordsList from './RecordsList';

function RecordsPage() {
  return (
    <Container maxWidth="false">
      <Header />
      <RecordsList />
    </Container>
  );
}

export default RecordsPage;
