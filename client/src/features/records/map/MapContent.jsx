import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
// import viteLogo from '/vite.svg';
import JapanMap from './JapanMap';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapContent = () => {
  const [mapMode, setmapMpde] = useState(true);
  const [iniFlag, setiniFlag] = useState(false);
  const [displayList, setDisplayList] = useState([]);

  async function getIniData() {
    let response = await axios.get('/api/map/data1');
    setDisplayList(response.data);
    setiniFlag(true);
  }

  useEffect(() => {
    getIniData();
  }, []);

  async function changeMapmode() {
    //mapMode true = ピン立て　false = 色塗り
    let response;
    let mode = mapMode;
    mode = !mode;
    displayList.length = 0;

    //mapData1 : ピン立て
    if (mode) {
      response = await axios.get('/api/map/data1');
      for (const item of response.data) {
        displayList.push(item);
      }
    } else {
      response = await axios.get('/api/map/data2');
      for (const item of response.data) {
        displayList.push(item);
      }
    }
    console.log('💀 ~ changeMapmode ~ displayList:', displayList);

    setmapMpde(mode);
  }

  // const center = [testData[0].latitude, testData[0].longitude];
  const list = [
    { region: '東京都', count: 20 },
    { region: '大阪府', count: 15 },
    { region: '愛知県', count: 12 },
  ];

  return (
    <>
      {mapMode ? (
        <div>
          <header>
            地図モード1<button onClick={changeMapmode}>モード切り替え</button>
          </header>
          <MapContainer
            center={[35.681382, 139.76608399999998]}
            zoom={5}
            style={{ height: '1000px', width: '100%' }}
          >
            {/* Map タイル */}
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="© OpenStreetMap contributors"
            />

            {displayList.map((obj) => (
              <Marker key={obj.id} position={[obj.latitude, obj.longitude]}>
                {/* <Popup>
                  <strong>{obj.name}</strong>
                  <br />
                </Popup> */}
              </Marker>
            ))}
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
