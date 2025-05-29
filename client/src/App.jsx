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
import { useNavigate } from "react-router";

function App() {
  const [records, setRecords] = useState([]);
  const [username, setUsername] = useState("");
  const navigate = useNavigate(); //フック。関数などイベント内で動的に遷移。

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

  //認証用
  // Appに入る
  const loadApp = async () => {
    try {
      const res = await axios.get("/api/app");
      setUsername(res.data.username); //stateで管理しないと再度レンダリングしてくれない
      console.log("認証に成功しました");
    } catch (err) {
      //セッションID無ければ401を返し,catchに入る
      if (err.response.status === 401) {
        alert("セッションIDがありません");
        navigate("/");
      } else {
        console.error("予期しないえらーが発生しました", err);
      }
    }
  };

  useEffect(() => {
    loadApp();

    const interval = setInterval(() => {
      loadApp();
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

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
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr",
            },
          }}
        >
          {records.map((obj) => (
            <Card key={obj.id} sx={{ maxWidth: 345 }}>
              {obj.image_url && (
                <CardMedia
                  component="img"
                  height="180"
                  image={obj.image_url}
                  alt="投稿写真"
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
