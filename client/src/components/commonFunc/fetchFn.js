export const fetchRecord = async () => {
    try {
      const res = await axios.get('/api/records');
      console.log('☺️ レーコード更新~ fetchRecord ~ res:', res);
    //   setRecords(res.data);
    } catch (err) {
      console.log('RecordList の listGet失敗', err);
    }
  };