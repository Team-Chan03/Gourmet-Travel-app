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

function StampPage() {
  const [prefecture, setPrefecture] = useState([]);
  const [prefectureUnique, setPrefectureUnique] = useState([]); //重複なしデータ
  const [selectRegion, setSelectRegion] = useState("");

  const prefectureChange = (e) => {
    setSelectRegion(e.target.value);
  };

  const fetchStampData = async () => {
    try {
      const res = await axios.get("/api/stamp");
      //   console.log("🚀 ~ fetchStampData ~ res:", res.data);
      setPrefecture(res.data);

      //region 毎に最大のstampnum をまとめる
      const regionMap = new Map();
      res.data.forEach((item) => {
        const currentMax = regionMap.get(item.region) || 0;
        regionMap.set(item.region, Math.max(currentMax, item.stamp_num));
      }); //Map(2) {'愛知県' => 2, '兵庫県' => 1}

      const unique = Array.from(regionMap.entries()).map(
        ([region, stamp_num]) => ({
          region,
          stamp_num,
        })
      );
      setPrefectureUnique(unique);
    } catch (err) {
      alert("stampデータ取得失敗");
      console.error(err);
    }
  };

  //   初回に履歴取得
  useEffect(() => {
    fetchStampData();
  }, []);

  // 選択中の県のスタンプ数を取得
  const selectData = selectRegion
    ? prefectureUnique.find((item) => item.region === selectRegion)
    : null; //未選択時（リロード時はnull)
  const stampCount = selectData?.stamp_num ?? 0; //selectDataなければ0

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
          {prefectureUnique.map((elment, index) => {
            return (
              <MenuItem key={index} value={elment.region}>
                {elment.region}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      {/* スタンプ表示エリア */}
      {selectData && (
        <Box mt={4}>
          <Typography variant="h6">{selectRegion}のスタンプカード</Typography>
          <Box display={"flex"} gap={1} mt={2} flexWrap={"wrap"}>
            {Array.from({ length: 8 }).map((_, i) => (
              <Box
                key={i}
                width={40}
                height={40}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                border={"1px solid gray"}
                borderRadius={"50%"}
                bgcolor={i < stampCount ? "bule" : "white"}
              >
                {i < stampCount ? "⚫︎" : ""}
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </>
  );
}

export default StampPage;
