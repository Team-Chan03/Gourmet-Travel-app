import React, { useState, useEffect } from 'react';
import {
  Card,
  Container,
  Typography,
  ImageList,
  ImageListItem,
  Tooltip,
} from '@mui/material';
import './../Records.css';

const StampCard = (props) => {
  const [selectData, setSelectData] = useState();
  const { userPostData, selectCountry, selectDish } = props.states;

  useEffect(() => {
    if (userPostData) {
      setSelectData(userPostData.filter((e) => e.region === selectCountry));
    }
  }, [selectCountry]);

  return selectData ? (
    <>
      <Card sx={{ width: 1, marginTop: 3 }}>
        <Container>
          <Typography>Stamp Card</Typography>
          <Typography>{`${selectCountry}: ${selectData.length} stamps`}</Typography>
        </Container>
        <ImageList
          className={
            selectData.length >= 20
              ? 'gold'
              : selectData.length >= 10
              ? 'silver'
              : selectData.length >= 5
              ? 'bronze'
              : ''
          }
          cols={5}
        >
          {selectData.map((e, i) => (
            <Tooltip title={e.comment} key={i}>
              <ImageListItem sx={{ m: 3 }}>
                {selectDish === e.dishname || selectDish === '' ? (
                  <img
                    className="stamp-img"
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
                    className="stamp-img"
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
                className="stamp-img"
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
