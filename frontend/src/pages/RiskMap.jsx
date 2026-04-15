import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// 🔥 FIX DEFAULT ICON ISSUE
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// 🔴 CUSTOM ICONS
const redIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  iconSize: [35, 35],
});

const orangeIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/orange-dot.png",
  iconSize: [35, 35],
});

const greenIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
  iconSize: [35, 35],
});

// 🔥 FALLBACK DATA
const demoData = [
  { id: 1, lat: 22.72, lng: 75.85, risk: "HIGH", message: "Rockfall risk high" },
  { id: 2, lat: 28.61, lng: 77.20, risk: "MEDIUM", message: "Moderate slope" },
  { id: 3, lat: 31.10, lng: 77.17, risk: "LOW", message: "Safe zone" },
];

const RiskMap = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/incidents");
        const apiData = await res.json();

        // 🔥 VALIDATE LAT LNG
        const validData = apiData.filter(
          (item) => item.lat && item.lng
        );

        if (validData.length > 0) {
          setData(validData);
        } else {
          setData(demoData);
        }

      } catch (err) {
        setData(demoData);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ position: "relative" }}>

      <h1 style={{ color: "#38bdf8" }}>Rockfall Risk Map</h1>

      {data.length === 0 && (
        <p style={{ color: "white" }}>Loading map...</p>
      )}

      <MapContainer
        center={[22.9734, 78.6569]}
        zoom={5}
        style={{ height: "80vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {data.map((item) => {

          const color =
            item.risk === "HIGH"
              ? "red"
              : item.risk === "MEDIUM"
              ? "orange"
              : "green";

          const icon =
            item.risk === "HIGH"
              ? redIcon
              : item.risk === "MEDIUM"
              ? orangeIcon
              : greenIcon;

          return (
            <React.Fragment key={item.id}>
              
              <Circle
                center={[item.lat, item.lng]}
                radius={5000}
                pathOptions={{
                  color: color,
                  fillColor: color,
                  fillOpacity: item.risk === "HIGH" ? 0.6 : 0.3,
                }}
              />

              <Marker position={[item.lat, item.lng]} icon={icon}>
                <Popup>
                  <strong>{item.risk} Risk Zone</strong>
                  <br />
                  {item.message || "No info"}
                </Popup>
              </Marker>

            </React.Fragment>
          );
        })}
      </MapContainer>

      {/* 🔥 FIXED LEGEND */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          background: "rgba(0,0,0,0.7)",
          padding: "15px",
          borderRadius: "10px",
          color: "white",
          zIndex: 1000, // 🔥 MAIN FIX
          backdropFilter: "blur(10px)" // 🔥 NICE UI
        }}
      >
        <p><span style={{ color: "red" }}>●</span> High Risk</p>
        <p><span style={{ color: "orange" }}>●</span> Medium Risk</p>
        <p><span style={{ color: "lightgreen" }}>●</span> Low Risk</p>
      </div>

    </div>
  );
};

export default RiskMap;