import { Button } from '@mui/material';
import AnchorTemporaryDrawer from './AnchorTemporaryDrawer';
import './Header.css';
import { useState } from 'react';
import RecordForm from './RecordForm';

function Header({ }) {

  const [formOpen, setFormOpen] = useState(false);

  const handleToggleForm = () => {
    console.log('🚀 ~ handleToggleForm発火したよ:', handleToggleForm);

    setFormOpen((val) => !val);
  };

  return (
    <div>
      <header className="header">
        <div >
          <Button onClick={handleToggleForm}>投稿フォーム</Button>
        </div>
        <div>
          <h2 className="header-title">🍽️Gourmet Travel🌎</h2>
        </div>
        <div className="drawer-container">
          <AnchorTemporaryDrawer />
        </div>
      </header>

      <RecordForm
        open={formOpen}
        onClose={handleToggleForm}
      />
    </div>
  );
}

export default Header;
