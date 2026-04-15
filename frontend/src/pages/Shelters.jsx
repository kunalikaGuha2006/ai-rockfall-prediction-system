import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// 🔥 FIX MARKER ICON ISSUE (VERY IMPORTANT)
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// ✅ SAME DATA (UNCHANGED)
const shelters = [
  {
    name: "Government School Shelter",
    lat: 31.105,
    lng: 77.18,
    capacity: 200
  },
  {
    name: "Community Hall Shelter",
    lat: 31.11,
    lng: 77.19,
    capacity: 150
  },
  {
    name: "Primary Health Center Shelter",
    lat: 31.095,
    lng: 77.17,
    capacity: 100
  }
];

const Shelters = () => {
  return (
    <div>

      <h2>Safe Shelters</h2>

      <MapContainer
        center={[31.1048, 77.1734]}
        zoom={12}
        style={{ height: "450px", width: "100%", marginTop: "20px" }}
      >

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {shelters.map((shelter, index) => (
          <Marker key={index} position={[shelter.lat, shelter.lng]}>
            <Popup>
              <strong>{shelter.name}</strong>
              <br />
              Capacity: {shelter.capacity} people
            </Popup>
          </Marker>
        ))}

      </MapContainer>

      <div className="shelter-list">

        {shelters.map((shelter, index) => (
          <div key={index} className="shelter-card">

            <h3>{shelter.name}</h3>

            <p>Capacity: {shelter.capacity} people</p>

            <button
              onClick={() =>
                window.open(
                  `https://www.google.com/maps?q=${shelter.lat},${shelter.lng}`,
                  "_blank"
                )
              }
            >
              Navigate
            </button>

          </div>
        ))}

      </div>

    </div>
  );
};

export default Shelters;