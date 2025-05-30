import { useState, useEffect, useContext, useRef } from "react";
// prettier-ignore
import {Modal,Box,Button,TextField,MenuItem,FormControl,InputLabel,Select,Autocomplete,TextareaAutosize,Rating,Typography} from "@mui/material";
import axios from "axios";

function RecordFrom({ open, onClose, fetchRecord }) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [photoUrl, setPhotoUrl] = useState("");

  /**画像をURLにする関数*/
  const handleFileChange = async (e) => {
    const file = e.currentTarget.files[0];
    try {
      const formData = new FormData(); // FormData の箱にファイルを詰め込む←ファイルをfetchする時は使わないといけないらしい
      formData.append("image", file); //key image   val file   として格納　　postでimageしか見ない
      const res = await axios.post("/api/upload-image", formData);
      setPhotoUrl(res.data.url);
    } catch (err) {
      console.error("画像アップロード失敗", err);
      alert("画像アップロードに失敗しました");
    }
  };

  //各入力項目の状態を　payload　にオブジェクトとして格納しpostする関数　payload内の変数はカラムに合わしてあげる必要有り！
  const handleSubmit = async () => {
    if (photoUrl) {
      const { latitude, longitude } = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => resolve(position.coords),
          (error) => reject(error)
        );
      });
      console.log("🔥 photoUrl があるのでここまで来たよ");
      try {
        const req = await axios.post("/api/records", {
          user_id: 1,
          image_url: photoUrl,
          comment,
          rating,
          latitude,
          longitude,
          created_at: new Date(),
        });
        console.log("🚀 ~ handleSubmit ~ req:", req);
      } catch (err) {
        console.error("❌ POST エラー", err);
      }

      await fetchRecord();

      setComment("");
      setRating(1);
      setPhotoUrl("");
      onClose();
    }
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 360 },
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h6" component="h2">
          新規投稿
        </Typography>

        <Button variant="outlined" component="label">
          画像を選択
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />
        </Button>
        {photoUrl && (
          <Box
            component="img"
            src={photoUrl}
            alt="選択画像"
            sx={{ width: "100%", borderRadius: 1 }}
          />
        )}

        <TextField
          label="コメント"
          multiline
          minRows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          fullWidth
        />

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Rating
            value={rating}
            onChange={(a, val) => setRating(val ?? rating)}
          />
          <Typography sx={{ ml: 1 }}>{rating} / 5</Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
          <Button onClick={onClose}>キャンセル</Button>
          <Button variant="contained" onClick={handleSubmit}>
            投稿
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default RecordFrom;
