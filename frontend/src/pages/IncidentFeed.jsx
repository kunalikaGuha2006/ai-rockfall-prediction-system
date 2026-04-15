import React, { useEffect, useState } from "react";

const IncidentFeed = () => {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/incidents");
        const data = await res.json();

        console.log("Incidents:", data); // 🔍 DEBUG

        setIncidents(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchIncidents();
  }, []);

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h1>Incident Feed</h1>

      {incidents.length === 0 ? (
        <p>No incidents found</p>
      ) : (
        incidents.map((item) => (
          <div
            key={item.id}
            style={{
              padding: "15px",
              margin: "10px 0",
              borderRadius: "10px",
              background:
                item.risk === "HIGH"
                  ? "red"
                  : item.risk === "MEDIUM"
                  ? "orange"
                  : "green",
            }}
          >
            <strong>{item.risk}</strong> - {item.message}
          </div>
        ))
      )}
    </div>
  );
};

export default IncidentFeed;