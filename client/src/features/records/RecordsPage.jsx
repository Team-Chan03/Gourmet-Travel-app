import React, { useState, createContext } from 'react';
import { Container } from '@mui/material';
import Header from '../../components/Header/Header';
import RecordsList from './RecordsList';

export const context = createContext();

function RecordsPage() {
  const [postRendering, setPostRendering] = useState(false);

  function rendering() {
    setPostRendering(!postRendering);
  }

  return (
    <context.Provider value={{ rendering, postRendering }}>
      <Container maxWidth="false">
        <Header />
        <RecordsList />
      </Container>
    </context.Provider>
  );
}

export default RecordsPage;
