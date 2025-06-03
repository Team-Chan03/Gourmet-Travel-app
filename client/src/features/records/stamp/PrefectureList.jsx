import React from 'react';
import { Box } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const RatingList = (props) => {
  const { userPostData, setSelectCountry, setSelectDish } = props.states;

  const uniqueArray = userPostData
    ? userPostData.filter(
        (element, index, self) =>
          self.findIndex((e) => e.region === element.region) === index
      )
    : '';

  const uniqueDishArray = userPostData
    ? userPostData.filter(
        (element, index, self) =>
          self.findIndex((e) => e.dishname === element.dishname) === index
      )
    : '';

  function selectCountryGet(value) {
    setSelectCountry(value);
    setSelectDish('');
  }

  function selectDishGet(e) {
    setSelectDish(e.target.innerText);
  }

  return userPostData ? (
    <>
      {uniqueArray.map((unique_e, unique_i) => (
        <Accordion key={unique_i}>
          <AccordionSummary
            sx={{ marginTop: 3 }}
            onClick={() => selectCountryGet(unique_e.region)}
          >
            <Typography component="span">
              {userPostData.filter(
                (userPostData_e) => userPostData_e.region === unique_e.region
              ).length >= 20
                ? '🥇'
                : userPostData.filter(
                    (userPostData_e) =>
                      userPostData_e.region === unique_e.region
                  ).length >= 10
                ? '🥈'
                : userPostData.filter(
                    (userPostData_e) =>
                      userPostData_e.region === unique_e.region
                  ).length >= 5
                ? '🥉'
                : ''}
              {unique_e.region}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {uniqueDishArray.map((user_e, user_i) => (
              <Box key={user_i} sx={{ m: 3 }} onClick={selectDishGet}>
                {unique_e.region === user_e.region ? user_e.dishname : ''}
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  ) : (
    ''
  );
};
export default RatingList;
