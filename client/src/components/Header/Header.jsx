import { Button } from '@mui/material';
import Menubar from './MenuBar';
import './Header.css';
import { useState } from 'react';
import RecordForm from './RecordForm';

function Header({}) {
  const [formOpen, setFormOpen] = useState(false);

  const handleToggleForm = () => {
    setFormOpen((val) => !val);
  };

  return (
    <div>
      <header className='header'>
        {/* <div>
          <Button onClick={handleToggleForm}>投稿フォーム</Button>
        </div> */}
        <div>
          <h2 className='header-title'>🍽️Gourmet Travel🌎</h2>
        </div>
        <div className='drawer-container'>
          Hello,{' '}
          {
            document.cookie
              .split('; ')
              .find((row) => row.startsWith('userName='))
              ?.split('=')[1]
          }
          <Menubar />
        </div>
      </header>

      <RecordForm open={formOpen} onClose={handleToggleForm} />
    </div>
  );
}

export default Header;
