import { useState, useEffect } from "react";
import axios from "axios";
// import viteLogo from '/vite.svg';
import JapanMap from "./JapanMap";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function Map() {
  const [mapMode, setmapMpde] = useState(true);

  // const list = [];

  // useEffect(async () => {
  //   console.log('hello');
  //   let response;
  //   response = await axios.get('/api/map/data1');
  //   response = await response.json();
  //   for (const item of response) {
  //     list.push(item);
  //   }
  // }, []);

  async function changeMapmode() {
    //mapMode true = ピン立て　false = 色塗り
    // let response;
    let mode = mapMode;
    mode = !mode;
    // list.length = 0;

    //mapData1 : ピン立て
    // if (mode) {
    //   response = await axios.get('/api/map/data1');
    // } else {
    //   response = await axios.get('/api/map/data2');
    // }
    // response = await response.json();
    // console.log('💀 ~ changeMapmode ~ response:', response);

    // for (const item of response) {
    //   list.push(item);
    // }

    setmapMpde(mode);
  }

  const testData = [
    {
      name: "ume",
      userId: 1,
      province: "愛知県",
      latitude: 35.123915154195345,
      longitude: 137.06593279307734,
    },
  ];

  const center = [testData[0].latitude, testData[0].longitude];
  const list = [
    { name: "東京都", count: 20 },
    { name: "大阪府", count: 15 },
    { name: "愛知県", count: 12 },
  ];

  return (
    <>
      {mapMode ? (
        <div>
          <header>地図モード1</header>
          <MapContainer
            center={center}
            zoom={4}
            style={{ height: "1000px", width: "100%" }}
          >
            {/* Map タイル */}
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="© OpenStreetMap contributors"
            />

            {testData.map((obj) => (
              <Marker key={obj.userId} position={[obj.latitude, obj.longitude]}>
                <Popup>
                  <strong>{obj.name}</strong>
                  <br />
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          <button onClick={changeMapmode}>モード切り替え</button>
        </div>
      ) : (
        <div>
          {<JapanMap list={list} />}

          <button onClick={changeMapmode}>モード切り替え</button>
        </div>
      )}
    </>
  );
}

export default Map;
