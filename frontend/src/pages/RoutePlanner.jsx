import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

// 🔥 FIX MARKER ICON
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// 🔥 ROUTING COMPONENT (GOOGLE MAPS STYLE)
const Routing = ({ start, end, trigger, setRouteInfo }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !trigger) return;

    // remove old route
    if (map.routingControl) {
      map.removeControl(map.routingControl);
    }

    const control = L.Routing.control({
      waypoints: [
        L.latLng(start[0], start[1]),
        L.latLng(end[0], end[1]),
      ],
      lineOptions: {
        styles: [{ color: "#2563eb", weight: 6 }],
      },
      addWaypoints: false,
      draggableWaypoints: false,
      routeWhileDragging: false,
      fitSelectedRoutes: true,
      show: true, // 🔥 turn-by-turn panel
    })
      .on("routesfound", function (e) {
        const route = e.routes[0];

        const distance = (route.summary.totalDistance / 1000).toFixed(2);
        const time = (route.summary.totalTime / 60).toFixed(0);

        setRouteInfo({ distance, time });
      })
      .addTo(map);

    map.routingControl = control;

  }, [trigger, start, end, map]);

  return null;
};

const RoutePlanner = () => {
  const [start, setStart] = useState([22.7196, 75.8577]);
  const [end, setEnd] = useState([22.5726, 88.3639]);
  const [trigger, setTrigger] = useState(false);

  const [routeInfo, setRouteInfo] = useState(null);

  const [startQuery, setStartQuery] = useState("");
  const [endQuery, setEndQuery] = useState("");
  const [startSuggestions, setStartSuggestions] = useState([]);
  const [endSuggestions, setEndSuggestions] = useState([]);

  // 🔍 SEARCH
  const fetchSuggestions = async (query, setSuggestions) => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await fetch(
        `https://photon.komoot.io/api/?q=${query}`
      );
      const json = await res.json();
      setSuggestions(json.features.slice(0, 5));
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 BUTTON
  const startNavigation = () => {
    setTrigger(prev => !prev);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>

      {/* LEFT PANEL */}
      <div style={{
        width: "30%",
        padding: "20px",
        background: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(10px)",
        color: "white"
      }}>
        <h2>Route Planner</h2>

        {/* START */}
        <label>Start Location</label>
        <input
          type="text"
          placeholder="Search location"
          value={startQuery}
          onChange={(e) => {
            setStartQuery(e.target.value);
            fetchSuggestions(e.target.value, setStartSuggestions);
          }}
        />

        <div style={{ background: "white", color: "black" }}>
          {startSuggestions.map((item, i) => (
            <div
              key={i}
              style={{ padding: "8px", cursor: "pointer" }}
              onMouseDown={() => {
                const lat = item.geometry.coordinates[1];
                const lng = item.geometry.coordinates[0];
                setStart([lat, lng]);
                setStartQuery(item.properties.name || item.properties.city);
                setStartSuggestions([]);
              }}
            >
              {item.properties.name || item.properties.city}
            </div>
          ))}
        </div>

        <br />

        {/* END */}
        <label>End Location</label>
        <input
          type="text"
          placeholder="Search location"
          value={endQuery}
          onChange={(e) => {
            setEndQuery(e.target.value);
            fetchSuggestions(e.target.value, setEndSuggestions);
          }}
        />

        <div style={{ background: "white", color: "black" }}>
          {endSuggestions.map((item, i) => (
            <div
              key={i}
              style={{ padding: "8px", cursor: "pointer" }}
              onMouseDown={() => {
                const lat = item.geometry.coordinates[1];
                const lng = item.geometry.coordinates[0];
                setEnd([lat, lng]);
                setEndQuery(item.properties.name || item.properties.city);
                setEndSuggestions([]);
              }}
            >
              {item.properties.name || item.properties.city}
            </div>
          ))}
        </div>

        <br />

        {/* BUTTON */}
        <button
          onClick={startNavigation}
          style={{
            padding: "10px",
            background: "#22c55e",
            border: "none",
            borderRadius: "8px",
            color: "white",
            cursor: "pointer"
          }}
        >
          Start Navigation
        </button>

        {/* 🔥 DISTANCE + TIME */}
        {routeInfo && (
          <div style={{
            marginTop: "20px",
            padding: "10px",
            background: "rgba(0,0,0,0.6)",
            borderRadius: "10px"
          }}>
            <p>📍 Distance: {routeInfo.distance} km</p>
            <p>⏱ Time: {routeInfo.time} min</p>
          </div>
        )}

        <p style={{ marginTop: "20px" }}>
          Real-world navigation with directions
        </p>
      </div>

      {/* MAP */}
      <MapContainer
        center={start}
        zoom={6}
        style={{ width: "70%", height: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={start} />
        <Marker position={end} />

        {/* 🔥 ROUTING */}
        <Routing
          start={start}
          end={end}
          trigger={trigger}
          setRouteInfo={setRouteInfo}
        />
      </MapContainer>
    </div>
  );
};

export default RoutePlanner;