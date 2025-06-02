import React, { useState, useEffect } from 'react';
import {
  Card,
  Container,
  Typography,
  ImageList,
  ImageListItem,
} from '@mui/material';

const StampCard = (props) => {
  const { userPostData, selectCountry } = props.states;
  const [selectData, setSelectData] = useState();

  useEffect(() => {
    if (userPostData) {
      setSelectData(userPostData.filter((e) => e.region === selectCountry));
    }
  }, [selectCountry]);
  //sx={{ bgcolor: 'rgba(172, 107, 37, 0.3)' }}
  return selectData ? (
    <>
      <Card sx={{ width: 1 }}>
        <Container>
          <Typography>Stamp Card</Typography>
          <Typography>{`${selectCountry}: ${selectData.length} stamps`}</Typography>
        </Container>
        <ImageList cols={4}>
          {selectData.map((e, i) => (
            <ImageListItem key={i} sx={{ m: 3 }}>
              <img
                src={e.image_url}
                alt={e.comment}
                loading="lazy"
                style={{
                  borderRadius: 90,
                  height: 100,
                  width: 100,
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Card>
    </>
  ) : userPostData ? (
    <>
      <Card sx={{ width: 1 }}>
        <Container>
          <Typography>Stamp Card</Typography>
          <Typography>{`all stamps: ${userPostData.length} stamps`}</Typography>
        </Container>
        <ImageList cols={4}>
          {userPostData.map((e, i) => (
            <ImageListItem key={i} sx={{ m: 3 }}>
              <img
                src={e.image_url}
                alt={e.comment}
                loading="lazy"
                style={{
                  borderRadius: 90,
                  height: 100,
                  width: 100,
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Card>
    </>
  ) : (
    ''
  );
};

export default StampCard;
