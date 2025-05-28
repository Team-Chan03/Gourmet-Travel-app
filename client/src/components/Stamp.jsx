import { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";

function Stamp() {
  const [prefecture, setPrefecture] = useState([]);
  const [selectRegion, setSelectRegion] = useState("");

  const prefectureChange = (e) => {
    setSelectRegion(e.target.value);
  };

  const fetchStampData = async () => {
    try {
      const res = await axios.get("/api/stamp");
      //   console.log("🚀 ~ fetchStampData ~ res:", res.data);
      setPrefecture(res.data);
    } catch (err) {
      alert("stampデータ取得失敗");
      console.error(err);
    }
  };

  //   初回に履歴取得
  useEffect(() => {
    fetchStampData();
  }, []);

  return (
    <>
      <Typography variant="h1" align="center">
        スタンプ
      </Typography>

      <FormControl fullWidth>
        <InputLabel id="region-label">地域</InputLabel>
        <Select
          labelId="region-label"
          label="地域"
          value={selectRegion}
          onChange={prefectureChange}
        >
          {prefecture.map((elment, index) => {
            return (
              <MenuItem key={index} value={elment.region}>
                {elment.region}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </>
  );
}

export default Stamp;
