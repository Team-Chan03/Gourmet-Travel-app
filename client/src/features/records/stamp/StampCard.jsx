import React, { useState } from 'react';
import {
  Card,
  Container,
  Typography,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from '@mui/material';

const StampCard = () => {
  const [countryUniqeData, setCountryUniqeData] = useState([
    {
      user_id: 1,
      region: '愛知県',
      latitude: 35.123906092471046,
      longitude: 137.0659766288227,
      image_url: 'https://i.ibb.co/k2bVrZLP/6b13d77d4703.jpg',
      comment: 'うまうま！！',
      rating: Math.floor(Math.random() * 5 + 1),
      created_at: new Date(),
    },
    {
      user_id: 2,
      region: '愛知県',
      created_at: new Date(),
      latitude: 35.123906092471046,
      longitude: 137.0659766288227,
      image_url: 'https://i.ibb.co/h1FZb2CR/4a4affc1de4d.jpg',
      comment: 'うまうま！！',
      rating: Math.floor(Math.random() * 5 + 1),
      created_at: new Date(),
    },
    {
      user_id: 3,
      region: '愛知県',
      latitude: 35.123906092471046,
      longitude: 137.0659766288227,
      image_url: 'https://i.ibb.co/SX10ZT6F/61d518c5312a.jpg',
      comment: 'うまうま！！',
      rating: Math.floor(Math.random() * 5 + 1),
      created_at: new Date(),
    },
    {
      user_id: 4,
      latitude: 35.123906092471046,
      longitude: 137.0659766288227,
      image_url:
        'https://imgbp.hotp.jp/magazine/media/item_images/images/157/545/260/original/ad3c2473-1e46-45b1-9d14-84637a776a42.jpg',
      comment: 'うまうま！！',
      rating: Math.floor(Math.random() * 5 + 1),
      created_at: new Date(),
    },

    {
      user_id: 4,
      region: '兵庫県',
      latitude: 34.858006092471046,
      longitude: 134.545466288227,
      image_url:
        'https://as1.ftcdn.net/v2/jpg/05/02/69/00/1000_F_502690033_qmZLw884d9z00wbABWqE6R7sSTlwBC4p.jpg',
      comment: 'うまうま！！',
      rating: Math.floor(Math.random() * 5 + 1),
      created_at: new Date(),
    },
    {
      user_id: 5,
      region: '兵庫県',
      latitude: 34.858006092471046,
      longitude: 134.545466288227,
      image_url:
        'https://as1.ftcdn.net/v2/jpg/05/02/69/00/1000_F_502690033_qmZLw884d9z00wbABWqE6R7sSTlwBC4p.jpg',
      comment: 'うまうま！！',
      rating: Math.floor(Math.random() * 5 + 1),
      created_at: new Date(),
    },
    {
      user_id: 3,
      region: '兵庫県',
      latitude: 34.858006092471046,
      longitude: 134.545466288227,
      image_url:
        'https://as1.ftcdn.net/v2/jpg/05/02/69/00/1000_F_502690033_qmZLw884d9z00wbABWqE6R7sSTlwBC4p.jpg',
      comment: 'うまうま！！',
      rating: Math.floor(Math.random() * 5 + 1),
      created_at: new Date(),
    },
    {
      user_id: 5,
      region: '兵庫県',
      latitude: 34.858006092471046,
      longitude: 134.545466288227,
      image_url:
        'https://as1.ftcdn.net/v2/jpg/05/02/69/00/1000_F_502690033_qmZLw884d9z00wbABWqE6R7sSTlwBC4p.jpg',
      comment: 'うまうま！！',
      rating: Math.floor(Math.random() * 5 + 1),
      created_at: new Date(),
    },
    {
      user_id: 1,
      region: '兵庫県',
      latitude: 34.858006092471046,
      longitude: 134.545466288227,
      image_url:
        'https://as1.ftcdn.net/v2/jpg/05/02/69/00/1000_F_502690033_qmZLw884d9z00wbABWqE6R7sSTlwBC4p.jpg',
      comment: 'うまうま！！',
      rating: Math.floor(Math.random() * 5 + 1),
      created_at: new Date(),
    },
    {
      user_id: 5,
      region: '兵庫県',
      latitude: 34.858006092471046,
      longitude: 134.545466288227,
      image_url:
        'https://as1.ftcdn.net/v2/jpg/05/02/69/00/1000_F_502690033_qmZLw884d9z00wbABWqE6R7sSTlwBC4p.jpg',
      comment: 'うまうま！！',
      rating: Math.floor(Math.random() * 5 + 1),
      created_at: new Date(),
    },
    {
      user_id: 3,
      region: '兵庫県',
      latitude: 34.858006092471046,
      longitude: 134.545466288227,
      image_url:
        'https://as1.ftcdn.net/v2/jpg/05/02/69/00/1000_F_502690033_qmZLw884d9z00wbABWqE6R7sSTlwBC4p.jpg',
      comment: 'うまうま！！',
      rating: Math.floor(Math.random() * 5 + 1),
      created_at: new Date(),
    },
    {
      user_id: 5,
      region: '兵庫県',
      latitude: 34.858006092471046,
      longitude: 134.545466288227,
      image_url:
        'https://as1.ftcdn.net/v2/jpg/05/02/69/00/1000_F_502690033_qmZLw884d9z00wbABWqE6R7sSTlwBC4p.jpg',
      comment: 'うまうま！！',
      rating: Math.floor(Math.random() * 5 + 1),
      created_at: new Date(),
    },
    {
      user_id: 4,
      region: '兵庫県',
      latitude: 34.858006092471046,
      longitude: 134.545466288227,
      image_url:
        'https://as1.ftcdn.net/v2/jpg/05/02/69/00/1000_F_502690033_qmZLw884d9z00wbABWqE6R7sSTlwBC4p.jpg',
      comment: 'うまうま！！',
      rating: Math.floor(Math.random() * 5 + 1),
      created_at: new Date(),
    },
    {
      user_id: 5,
      region: '兵庫県',
      latitude: 34.858006092471046,
      longitude: 134.545466288227,
      image_url:
        'https://as1.ftcdn.net/v2/jpg/05/02/69/00/1000_F_502690033_qmZLw884d9z00wbABWqE6R7sSTlwBC4p.jpg',
      comment: 'うまうま！！',
      rating: Math.floor(Math.random() * 5 + 1),
      created_at: new Date(),
    },
  ]);
  //選択された県で絞り込まれたState/

  return countryUniqeData ? (
    <>
      <Card sx={{ width: 1 }}>
        <Container>
          <Typography>Stamp Card</Typography>
        </Container>
        <ImageList cols={5}>
          {countryUniqeData.map((e, i) => (
            <ImageListItem key={i} sx={{ m: 3 }}>
              <img
                src={e.image_url}
                alt={e.comment}
                loading="lazy"
                style={{
                  borderRadius: 90,
                  height: 200,
                  width: 200,
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
