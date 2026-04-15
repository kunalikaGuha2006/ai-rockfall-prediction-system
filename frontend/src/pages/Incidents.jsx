import React, { useEffect, useState } from "react";

const IncidentFeed = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/incidents");
        const data = await res.json();

        console.log("Incidents:", data);

        setIncidents(data);
      } catch (err) {
        console.error("Error fetching incidents:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h1>Incident Feed</h1>

      {/* 🔥 LOADING STATE */}
      {loading ? (
        <p>Loading incidents...</p>
      ) : incidents.length === 0 ? (
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
                  ? "#ff4d4d"
                  : item.risk === "MEDIUM"
                  ? "#ffa500"
                  : "#2ecc71",
            }}
          >
            <strong>{item.risk}</strong> - {item.message || "No details"}
          </div>
        ))
      )}
    </div>
  );
};

export default IncidentFeed;