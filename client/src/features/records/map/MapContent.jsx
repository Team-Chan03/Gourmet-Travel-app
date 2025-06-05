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
import { Box, Container, ToggleButton, ToggleButtonGroup } from '@mui/material';
import backgroundImage from '../../../assets/2023639.jpg';

const MapContent = () => {
  const [mapMode, setmapMode] = useState(true);
  const [displayList, setDisplayList] = useState([]);
  const [centerPosition, setCenterPosition] = useState([]);
  const [alignment, setAlignment] = useState('mode1');

  const handleChange = async(event, newAlignment) => {
    console.log(alignment,newAlignment);
    
    if (newAlignment === null){
      return
    }
        //mapMode true = ピン立て　false = 色塗り
        let response;
        let mode = mapMode;
        mode = !mode;
    
        //mapData1 : ピン立て
        if (mode) {
          response = await axios.get('/api/map/data1');
          const locationArr = response.data.filter(
            (data) => data.latitude && data.longitude
          );
          setDisplayList(locationArr);
        } else {
          response = await axios.get('/api/map/data2');
          const locationArr = response.data.filter(
            (data) => data.latitude && data.longitude
          );
          setDisplayList(locationArr);
        }
    
        setmapMode(mode);

    setAlignment(newAlignment);
  };

  async function getIniData() {
    let response = await axios.get('/api/map/data1');
    const locationArr = response.data.filter(
      (data) => data.latitude && data.longitude
    );
    setDisplayList(locationArr);
    const { latitude, longitude } = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position.coords),
        (error) => {
          // reject(error);
          setCenterPosition([35.689507, 139.691728]);
        }
      );
    });
    setCenterPosition([latitude, longitude]);
  }

  useEffect(() => {
    getIniData();
  }, []);

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
          height: '100vh',
          border: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',

          // borderColor: 'brown'
        }}
      >
        {/* <Box sx={
          {
            width:'100%',
            height:'100%',

          }
        }></Box> */}
        <ToggleButtonGroup
          // color='primary'
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label='Platform'
          sx={
            {position:'absolute',
              top:"120px",
              left:'50px',
              zIndex:1000,
              color:'#f76507',
              backgroundColor:'#fff3d7'
            }
          }
        >
          <ToggleButton variant='contained' value='mode1'>Mode1</ToggleButton>
          <ToggleButton value='mode2'>Mode2</ToggleButton>
        </ToggleButtonGroup>
        {mapMode && centerPosition.length !== 0 ? (
          <div>
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

              {displayList.length !== 0 &&
                displayList.map((obj) => {
                  return (
                    <Marker
                      key={obj.id}
                      position={[obj.latitude, obj.longitude]}
                    >
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

            {<JapanMap list={displayList} />}
          </div>
        )}
      </Container>
    </>
  );
};

export default MapContent;
