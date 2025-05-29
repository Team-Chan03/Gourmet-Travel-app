import {
  Box,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Autocomplete,
  TextareaAutosize,
  Rating,
  Typography,
  Card,
  CardMedia,
} from "@mui/material";
import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import Header from "./Header/Header";

function App() {
  const [records, setRecords] = useState([]);
  //分類フィルター機能
  // const [selectType, setType] = useState("");

  //全てのrecordsを取得する関数
  const fetchRecord = async () => {
    try {
      const res = await axios.get("/api/records");
      console.log("☺️ レーコード更新~ fetchRecord ~ res:", res);
      setRecords(res.data);
    } catch (err) {
      console.log("RecordList の listGet失敗", err);
    }
  };

  useEffect(() => {
    fetchRecord();
  }, []);

  //フィルター機能
  // const TextFieldStyle = {
  //   width: 300,
  //   marginBottom: 16,
  // };

  return (
    <div>
      <Header fetchRecord={fetchRecord} />
      <Box
        component="main"
        sx={{
          p: 2,
          backgroundImage:
            "url(https://www.chizu-seisaku.com/wp-content/uploads/2021/08/world-furumap-scaled.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          backgroundAttachment: "fixed",
        }}
      >
        <Box
          sx={{
            mt: 10,
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2,1fr)",
              md: "repeat(4,1fr)",
            },
            gap: 2,
          }}
        >
          {records.map((obj) => (
            <Card key={obj.id} sx={{ maxWidth: 450 }}>
              {obj.image_url && (
                <CardMedia
                  component="img"
                  height="180"
                  image={obj.image_url}
                  alt="投稿写真"
                  sx={{
                    objectFit: "contain",
                    backgroundColor: "#eee",
                    objectFit: "cover",
                  }}
                />
              )}
              <div className="record_header">
                <p className="record_content">コメント：{obj.comment}</p>
                <span className="record_rating">{"⭐".repeat(obj.rating)}</span>
              </div>
            </Card>
          ))}
        </Box>
      </Box>
    </div>
  );
}

export default App;

{
  /* <Autocomplete
  options={recordTypeArray}
  onChange={(val, e) => setType(e)}
  renderInput={(params) => (
    <TextField
      {...params}
      label="分類フィルター"
      style={TextFieldStyle}
    />
  )}
/> */
}
