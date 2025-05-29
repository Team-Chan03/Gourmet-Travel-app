import { Button } from "@mui/material";
import AnchorTemporaryDrawer from "./AnchorTemporaryDrawer";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import RecordFrom from "../RecordFrom";

function Header({ fetchRecord }) {
  const [formOpen, setFormOpen] = useState(false);

  const handleToggleForm = () => {
    console.log("🚀 ~ handleToggleForm発火したよ:", handleToggleForm);

    setFormOpen((val) => !val);
  };

  return (
    <div>
      <header className="header">
        <h2 className="header-title">🌍全世界投稿一覧🌍</h2>
        <Button onClick={handleToggleForm}>投稿フォーム</Button>
        <div className="drawer-container">
          <AnchorTemporaryDrawer />
        </div>
      </header>

      <RecordFrom
        open={formOpen}
        onClose={handleToggleForm}
        fetchRecord={fetchRecord}
      />
    </div>
  );
}

export default Header;
