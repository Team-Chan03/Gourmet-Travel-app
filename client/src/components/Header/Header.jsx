import { Container, Stack } from '@mui/material';
import Menubar from './MenuBar';
import './Header.css';
import RecordForm from './RecordForm';
import GetBadge from './GetBadge';
import appIcon from './../../assets/appIcon.png';

function Header() {
  // const [formOpen, setFormOpen] = useState(false);
  // const handleToggleForm = () => {
  //   setFormOpen((val) => !val);
  // };

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
              <Container>
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
