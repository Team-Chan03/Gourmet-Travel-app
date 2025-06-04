import { Button } from '@mui/material';
import Menubar from './MenuBar';
import './Header.css';
import { useState } from 'react';
import RecordForm from './RecordForm';
import GetBadge from './GetBadge';
import appIcon from './../../assets/appIcon.png';

function Header() {
  const [formOpen, setFormOpen] = useState(false);
  const handleToggleForm = () => {
    setFormOpen((val) => !val);
  };

  const [getGBadgeOpen, setGetBadgeOpen] = useState(false);
  const handleToggleGetBadge = () => {
    setGetBadgeOpen((val) => !val);
  };

  return (
    <div>
      <header className="header">
        {/* <div>
          <Button onClick={handleToggleForm}>投稿フォーム</Button>
        </div> */}
        <div>
          <span className="appTitle">Gourmet Travel</span>
        </div>
        <div className="header-title">
          <img className="appicon" src={appIcon} />
        </div>
        <div className="drawer-container">
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

      <RecordForm
        open={formOpen}
        onClose={handleToggleForm}
      />

      <GetBadge
        open={getGBadgeOpen}
        onClose={handleToggleGetBadge }
      />

    </div>
  );
}

export default Header;
