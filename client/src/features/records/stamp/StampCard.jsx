import React, { useState, useEffect } from 'react';
import {
  Card,
  Container,
  Typography,
  ImageList,
  ImageListItem,
  Tooltip,
} from '@mui/material';

const StampCard = (props) => {
  const [selectData, setSelectData] = useState();
  const { userPostData, selectCountry, selectDish } = props.states;

  useEffect(() => {
    if (userPostData) {
      setSelectData(userPostData.filter((e) => e.region === selectCountry));
    }
  }, [selectCountry]);

  function a(e) {
    console.log(e);
  }
  return selectData ? (
    <>
      <Card sx={{ width: 1, marginTop: 3 }}>
        <Container>
          <Typography>Stamp Card</Typography>
          <Typography>{`${selectCountry}: ${selectData.length} stamps`}</Typography>
        </Container>
        <ImageList
          cols={5}
          sx={{
            bgcolor:
              selectData.length >= 20
                ? 'rgba(255, 159, 56, 0.32)'
                : selectData.length >= 10
                ? 'rgba(192, 192, 192, 0.3)'
                : selectData.length >= 5
                ? 'rgba(230, 180, 34, 0.3)'
                : 'rgba(255, 255, 255, 1)',
          }}
        >
          {selectData.map((e, i) => (
            <Tooltip title={e.comment} key={i}>
              <ImageListItem sx={{ m: 3 }} onClick={a}>
                {selectDish === e.dishname || selectDish === '' ? (
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
                ) : (
                  <img
                    src={e.image_url}
                    alt={e.comment}
                    loading="lazy"
                    style={{
                      borderRadius: 90,
                      height: 100,
                      width: 100,
                      opacity: 0.3,
                    }}
                  />
                )}
              </ImageListItem>
            </Tooltip>
          ))}
        </ImageList>
      </Card>
    </>
  ) : userPostData ? (
    <Card sx={{ width: 1, marginTop: 3 }}>
      <Container>
        <Typography>Stamp Card</Typography>
        <Typography>{`all stamps: ${userPostData.length} stamps`}</Typography>
      </Container>
      <ImageList cols={5}>
        {userPostData.map((e, i) => (
          <Tooltip title={e.comment} key={i}>
            <ImageListItem sx={{ m: 3 }}>
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
          </Tooltip>
        ))}
      </ImageList>
    </Card>
  ) : (
    ''
  );
};
export default StampCard;
