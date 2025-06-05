import { Container, Stack } from '@mui/material';
import Menubar from './MenuBar';
import './Header.css';
import RecordForm from './RecordForm';
import GetBadge from './GetBadge';
import appIcon from './../../assets/appIcon.png';
import { useState } from 'react';


function Header() {
  // const [formOpen, setFormOpen] = useState(false);
  // const handleToggleForm = () => {
  //   setFormOpen((val) => !val);
  // };
  const [menuDisplay, setMenuDisplay] = useState('block');

  const userIdFromCookie = document.cookie
        .split('; ')
        .find((row) => row.startsWith('userId='))
        ?.split('=')[1];

  console.log(userIdFromCookie);

  if(userIdFromCookie && menuDisplay === 'none') {
    setMenuDisplay('block');
  }else if(!userIdFromCookie &&menuDisplay === 'block'){
    setMenuDisplay('none')
  }

  return (
    <>
      <div style={{ position: 'sticky', top: 0, zIndex: 1 }}>
        <header className="header">
          <div>
            <span className="appTitle">Gourmet Travel</span>
          </div>
          <div className="header-title">
            <img className="appicon" src={appIcon} />
          </div>
          <div className="drawer-container">
            <Stack direction={'row'} spacing={2}>
              <Container>
                Hello{' '}
                {
                  document.cookie
                    .split('; ')
                    .find((row) => row.startsWith('userName='))
                    ?.split('=')[1]
                }
              </Container>
              <Container sx={{display: menuDisplay}}>
                <Menubar />
              </Container>
            </Stack>
          </div>
        </header>

        {/* <RecordForm
        open={formOpen}
        onClose={handleToggleForm}
      /> */}
      </div>
      <GetBadge />
    </>
  );
}

export default Header;
