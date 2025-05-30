import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useNavigate } from "react-router-dom";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import RedeemIcon from "@mui/icons-material/Redeem";
import axios from "axios";
// import { ToggleButton, FormatAlignLeftIcon } from "@mui/material";

// import Login from "../Login/Login";

export default function AnchorTemporaryDrawer() {
  const navigate = useNavigate();
  const handleNavigate = (path) => {
    if (/^https?:\/\//.test(path)) {
      window.open(path, "_blank");
    } else if (path === "ログアウト") {
      const processingLogout = async () => {
        try {
          await axios.get("/api/auth/logout");

          alert("ログアウトしました。");
          navigate("/"); //ログアウト後/に遷移
        } catch (err) {
          alert("ログアウト失敗");
          console.error(err);
        }
      };
      processingLogout();
    } else {
      navigate(path);
    }
    setState({ ...state, right: false });
  };
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {/* ページ遷移はpathを追加するだけでいいです */}
      <List>
        {[
          { text: "マイページ", path: "/mypage", icon: <HomeIcon /> },
          // { text: "履歴", path: "/mypage/records", icon: <ManageSearchIcon /> },
          { text: "地図", path: "/map", icon: <FmdGoodIcon /> },
          { text: "スタンプ", path: "/stamp", icon: <RedeemIcon /> },
          {
            text: "ログアウト",
            path: "ログアウト",
            icon: <LogoutIcon />,
          },
        ].map((obj, index) => (
          <ListItem key={obj.text} disablePadding>
            <ListItemButton onClick={() => handleNavigate(obj.path)}>
              <ListItemIcon>{obj.icon}</ListItemIcon>
              <ListItemText primary={obj.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {/* <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );

  return (
    <div>
      {/* <h1>Anchor</h1> */}
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>メニュー</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
