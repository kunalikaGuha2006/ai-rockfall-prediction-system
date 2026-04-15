import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [incidents, setIncidents] = useState([]);
  const [sensor, setSensor] = useState(null);

  // 🔥 FETCH DATA (FIXED)
  useEffect(() => {
    // incidents
    fetch("http://127.0.0.1:8000/incidents")
      .then(res => res.json())
      .then(data => setIncidents(data))
      .catch(err => console.error(err));

    // sensor
    fetch("http://127.0.0.1:8000/sensor-data")
      .then(res => res.json())
      .then(data => setSensor(data))
      .catch(err => console.error(err));
  }, []);

  // 🧠 CALCULATE COUNTS
  const highRisk = incidents.filter(i => i.risk === "HIGH").length;
  const mediumRisk = incidents.filter(i => i.risk === "MEDIUM").length;
  const lowRisk = incidents.filter(i => i.risk === "LOW").length;

  return (
    <div
      style={{
        padding: "30px",
        color: "white",
        minHeight: "100vh",
        background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)"
      }}
    >
      <h1 style={{ marginBottom: "30px" }}>
        Rockfall Monitoring Dashboard
      </h1>

      {/* 🔥 CARDS */}
      <div style={{ display: "flex", gap: "20px" }}>

        {/* HIGH */}
        <div style={cardStyle("red")}>
          <h2>High Risk</h2>
          <p style={countStyle}>{highRisk}</p>
        </div>

        {/* MEDIUM */}
        <div style={cardStyle("orange")}>
          <h2>Medium Risk</h2>
          <p style={countStyle}>{mediumRisk}</p>
        </div>

        {/* LOW */}
        <div style={cardStyle("green")}>
          <h2>Low Risk</h2>
          <p style={countStyle}>{lowRisk}</p>
        </div>

      </div>

      {/* 🔥 SENSOR DATA (ADDED, NO UI CHANGE) */}
      {sensor && (
        <div style={{ marginTop: "30px" }}>
          <h2>Live Sensor Data</h2>
          <p>🌧 Rainfall: {sensor.rainfall}</p>
          <p>⛰ Slope: {sensor.slope}</p>
        </div>
      )}

      {/* 🔥 INCIDENT LIST */}
      <div style={{ marginTop: "40px" }}>
        <h2>Recent Incidents</h2>

        {incidents.map((item) => (
          <div
            key={item.id}
            style={{
              padding: "15px",
              margin: "10px 0",
              borderRadius: "10px",
              background:
                item.risk === "HIGH"
                  ? "#ff4d4d"
                  : item.risk === "MEDIUM"
                  ? "#ffa500"
                  : "#2ecc71",
            }}
          >
            <strong>{item.risk}</strong> - {item.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;


// 🎨 STYLES (UNCHANGED)

const cardStyle = (color) => ({
  flex: 1,
  padding: "20px",
  borderRadius: "15px",
  background:
    color === "red"
      ? "#ff1a1a"
      : color === "orange"
      ? "#ffa500"
      : "#00cc44",
  textAlign: "center",
  boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
});

const countStyle = {
  fontSize: "40px",
  fontWeight: "bold",
};