import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import { useEffect, useRef } from "react";

/* OPTIONAL: ROUTING (only if start & end passed) */

async function getCoordinates(place) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${place}`
  );
  const data = await res.json();

  if (data.length === 0) return null;

  return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
}

function Routing({ map, start, end }) {
  const routingRef = useRef(null);

  useEffect(() => {
    if (!start || !end) return;

    async function createRoute() {
      const startCoords = await getCoordinates(start.toLowerCase());
      const endCoords = await getCoordinates(end.toLowerCase());

      if (!startCoords || !endCoords) {
        alert("Location not found");
        return;
      }

      if (routingRef.current) {
        map.removeControl(routingRef.current);
      }

      routingRef.current = L.Routing.control({
        waypoints: [
          L.latLng(...startCoords),
          L.latLng(...endCoords),
        ],
        lineOptions: {
          styles: [{ color: "#38bdf8", weight: 6 }],
        },
        addWaypoints: false,
        draggableWaypoints: false,
        routeWhileDragging: false,
        show: false, // hide default panel
      }).addTo(map);
    }

    createRoute();
  }, [start, end]);

  return null;
}

/* MAIN COMPONENT */

function MapComponent({ start, end }) {
  return (
    <MapContainer
      center={[23.2599, 77.4126]} // India center
      zoom={5}
      style={{ height: "500px", width: "100%" }}
      whenCreated={(map) => {
        // attach routing manually
        if (start && end) {
          Routing({ map, start, end });
        }
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* 🔴 HIGH RISK */}
      <Marker position={[31.1048, 77.1734]}>
        <Popup>
          🔴 <b>High Risk</b> <br /> Shimla Ridge <br />
          Heavy rainfall + steep slope
        </Popup>
      </Marker>

      {/* 🟡 MEDIUM RISK */}
      <Marker position={[32.2432, 77.1892]}>
        <Popup>
          🟡 <b>Medium Risk</b> <br /> Manali Pass <br />
          Moderate vibration detected
        </Popup>
      </Marker>

      {/* 🟢 LOW RISK */}
      <Marker position={[31.9578, 77.1095]}>
        <Popup>
          🟢 <b>Low Risk</b> <br /> Kullu Valley <br />
          Stable conditions
        </Popup>
      </Marker>

    </MapContainer>
  );
}

export default MapComponent;