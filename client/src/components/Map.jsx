import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function App() {
  // const [count, setCount] = useState(0);

  navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude, longitude } = position.coords;
    console.log(
      "🚀 ~ navigator.geolocation.getCurrentPosition ~ latitude:",
      latitude
    );
    console.log(
      "🚀 ~ navigator.geolocation.getCurrentPosition ~ longitude:",
      longitude
    );

    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
    );
    const data = await res.json();
    console.log("🚀 ~ navigator.geolocation.getCurrentPosition ~ data:", data);

    const province = data.address.province;
    console.log(
      "🚀 ~ navigator.geolocation.getCurrentPosition ~ province:",
      province
    );
    //ここはスキーマに合わせる（今はテスト）
  });

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

  return (
    <div>
      <header>地図</header>
      <MapContainer
        center={center}
        zoom={5}
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
              {/* {obj.region}
            <br />({obj.latitude.toFixed(4)}, {obj.longitude.toFixed(4)}) */}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;
