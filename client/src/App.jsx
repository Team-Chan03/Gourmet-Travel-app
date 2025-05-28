import "./RecordList.css";
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
} from "@mui/material";
import { useState, useEffect, useContext, useRef } from "react";

function App({ records }) {
  const [selectType, setType] = useState("");
  console.log(selectType);
  const recordTypeArray = ["食事", "育児", "服装", "髪型", "デート"];
  const TextFieldStyle = {
    width: 300,
    marginBottom: 16,
  };

  {
    records.map((r) => {
      if (r.record_type !== selectType) return null;
    });
  }

  return (
    <main className="record_page">
      <Autocomplete
        options={recordTypeArray}
        onChange={(val, e) => setType(e)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="分類フィルター"
            style={TextFieldStyle}
          />
        )}
      />

      <ul className="record_list">
        {records
          .filter((r) => {
            if (
              r.record_type === selectType ||
              selectType === "" ||
              selectType === null
            )
              return true;
          })
          .map((r) => (
            <li key={r.id} className="record_item">
              {/* オプション項目 (ユーザー任意項目予定)*/}
              {r.record_photo_url && (
                <img
                  className="record_photo"
                  src={r.record_photo_url}
                  alt={`${r.record_type} の写真`}
                />
              )}
              {/* 共通項目(必須項目の為条件分岐なし) */}
              <div className="record_header">
                {/* <time className="record_date">{r.record_date}</time> */}
                <span className="record_type">カテゴリ：{r.record_type}</span>
                <p className="record_content">コメント：{r.record_comment}</p>
                <span className="record_mood">{r.record_mood}</span>
                <span className="record_rating">
                  {"⭐".repeat(r.record_rating)}
                </span>
              </div>
              {/* タイプ別オプション */}
              {r.record_type === "食事" && r.meal_type && (
                <p className="record_meal_type">食事区分: {r.meal_type}</p>
              )}
              {r.record_type === "育児" && (
                <div className="record_child">
                  {r.child_activity && (
                    <p className="child_activity">活動: {r.child_activity}</p>
                  )}
                  {r.child_age != null && (
                    <p className="child_age">お子様年齢: {r.child_age}ヶ月</p>
                  )}
                </div>
              )}
              {r.record_type === "服装" && r.brand && (
                <p className="record_brand">ブランド: {r.brand}</p>
              )}
              {r.record_type === "髪型" && r.salon && (
                <p className="record_salon">美容室: {r.salon}</p>
              )}
              {r.record_type === "デート" && r.date_place && (
                <p className="record_date_place">場所: {r.date_place}</p>
              )}
            </li>
          ))}
      </ul>
    </main>
  );
}

export default App;
