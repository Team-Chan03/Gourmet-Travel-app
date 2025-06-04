import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
// import viteLogo from '/vite.svg';
import JapanMap from './JapanMap';
import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Box, Container } from '@mui/material';
import backgroundImage from '../../../assets/2023639.jpg';

const MapContent = () => {
  const [mapMode, setmapMode] = useState(true);
  const [displayList, setDisplayList] = useState([]);
  const [centerPosition, setCenterPosition] = useState([]);

  async function getIniData() {
    let response = await axios.get('/api/map/data1');
    setDisplayList(response.data);
    const { latitude, longitude } = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position.coords),
        (error) => reject(error)
      );
    });
    setCenterPosition([latitude, longitude]);
  }

  useEffect(() => {
    getIniData();
  }, []);

  async function changeMapmode() {
    //mapMode true = ピン立て　false = 色塗り
    let response;
    let mode = mapMode;
    mode = !mode;

    //mapData1 : ピン立て
    if (mode) {
      response = await axios.get('/api/map/data1');
      setDisplayList(response.data);
    } else {
      response = await axios.get('/api/map/data2');
      setDisplayList(response.data);
    }

    setmapMode(mode);
  }

  const mapImage = {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px',
  };

  const DefaultIcon = Leaflet.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    popupAnchor: [12, 0],
  });
  Leaflet.Marker.prototype.options.icon = DefaultIcon;

  return (
    <>
      <Container
        disableGutters
        maxWidth='false'
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          border: 1,
          // borderColor: 'brown'
        }}
      >
        {mapMode && centerPosition.length !== 0 ? (
          <div>
            <header>
              地図モード1<button onClick={changeMapmode}>モード切り替え</button>
            </header>
            <MapContainer
              center={centerPosition}
              zoom={8}
              zoomControl={false}
              style={{ height: '1000px', width: '100%' }}
            >
              {/* Map タイル */}
              <TileLayer
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                attribution='© OpenStreetMap contributors'
              />

              {displayList.map((obj) => {
                console.log(obj);
                return (
                  <Marker key={obj.id} position={[obj.latitude, obj.longitude]}>
                    <Popup>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <img
                          className='mapImage'
                          src={obj.image_url}
                          alt='食べ物'
                          loading='lazy'
                          style={mapImage}
                        />
                        <br />
                        <strong>料理名：{obj.dishname}</strong>
                      </Box>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </div>
        ) : (
          <div>
            <header>
              地図モード2<button onClick={changeMapmode}>モード切り替え</button>
            </header>
            {<JapanMap list={displayList} />}
          </div>
        )}
      </Container>
    </>
  );
};

export default MapContent;
