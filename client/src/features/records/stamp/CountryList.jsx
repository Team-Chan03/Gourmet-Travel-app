import React from 'react';
import { Card, Container } from '@mui/material';

const CountryList = (props) => {
  const { userPostData, setSelectCountry } = props.states;

  //重複なしのデータにする
  const uniqueArray = userPostData
    ? userPostData.filter(
        (element, index, self) =>
          self.findIndex((e) => e.region === element.region) === index
      )
    : '';

  function selectCountryGet(e) {
    setSelectCountry(e.target.innerHTML);
  }

  return userPostData ? (
    <>
      <Container>
        {uniqueArray.map((e, i) => (
          <Card
            key={i}
            sx={{ height: 1 / 2, fontSize: 30, m: 3 }}
            onClick={selectCountryGet}
          >
            {e.region}
          </Card>
        ))}
      </Container>
    </>
  ) : (
    ''
  );
};

export default CountryList;
