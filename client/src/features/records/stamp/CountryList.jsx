import React, { useState } from 'react';
import { Container, Box } from '@mui/material';

const CountryList = () => {
  //重複なしのデータにする
  const [countryData, setCountryData] = useState([
    {
      use_id: 1,
      id: 20,
      region: '愛知県',
    },
    {
      use_id: 1,
      id: 21,
      region: '愛知県',
    },
    {
      use_id: 1,
      id: 22,
      region: '岐阜県',
    },
  ]);

  function selectCountryGet(e) {
    console.log(e.target.__reactProps$ofvxzdum00d.children);
  }

  return countryData ? (
    <>
      <Container>
        {countryData.map((ele) => (
          <Container key={ele.id}>
            <Box onClick={selectCountryGet}>{ele.region}</Box>
          </Container>
        ))}
      </Container>
    </>
  ) : (
    ''
  );
};

export default CountryList;
