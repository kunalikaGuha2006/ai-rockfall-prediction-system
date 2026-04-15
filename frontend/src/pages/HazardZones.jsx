import React from "react";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const hazardZones = [
  {
    name: "Shimla Ridge Highway",
    lat: 31.1048,
    lng: 77.1734,
    risk: "High"
  },
  {
    name: "Manali Hill Route",
    lat: 32.2432,
    lng: 77.1892,
    risk: "Medium"
  },
  {
    name: "Kullu Valley Road",
    lat: 31.9579,
    lng: 77.1095,
    risk: "Low"
  }
];

const getColor = (risk) => {
  if (risk === "High") return "red";
  if (risk === "Medium") return "orange";
  return "green";
};

const HazardZones = () => {
  return (
    <div>

      <h2>Hazard Zones Map</h2>

      <MapContainer
        center={[31.1048, 77.1734]}
        zoom={7}
        style={{ height: "500px", width: "100%", marginTop: "20px" }}
      >

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {hazardZones.map((zone, index) => (
          <Circle
            key={index}
            center={[zone.lat, zone.lng]}
            radius={15000}
            pathOptions={{
              color: getColor(zone.risk),
              fillColor: getColor(zone.risk),
              fillOpacity: 0.4
            }}
          >
            <Popup>
              <strong>{zone.name}</strong>
              <br />
              Risk Level: {zone.risk}
            </Popup>
          </Circle>
        ))}

      </MapContainer>

    </div>
  );
};

export default HazardZones;