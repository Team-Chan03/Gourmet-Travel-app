import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
// import viteLogo from '/vite.svg';
import JapanMap from './JapanMap';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Box, ImageList, ImageListItem } from '@mui/material';

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

  return (
    <>
      {mapMode && centerPosition.length!==0? (
        <div>
          <header>
            地図モード1<button onClick={changeMapmode}>モード切り替え</button>
          </header>
          <MapContainer
            center={centerPosition}
            zoom={8}
            style={{ height: '1000px', width: '100%' }}
          >
            {/* Map タイル */}
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="© OpenStreetMap contributors"
            />

            {displayList.map((obj) => {
              console.log(obj);
              return (
                <Marker key={obj.id} position={[obj.latitude, obj.longitude]}>
                  <Popup>
                    <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center',alignItems:'center' }}>

                    <img
                      className="mapImage"
                      src={obj.image_url}
                      alt="食べ物"
                      loading="lazy"
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
    </>
  );
};

export default MapContent;
