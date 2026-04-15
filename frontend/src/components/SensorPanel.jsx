import React, { useEffect, useState } from "react";

const SensorData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/sensor-data");
        const result = await response.json();

        console.log("Sensor API:", result); // 🔍 DEBUG

        setData(result);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Live Sensor Data</h2>

      {!data ? (
        <p>Loading sensors...</p>
      ) : (
        <div>
          <p>🌧 Rainfall: {data.rainfall}</p>
          <p>⛰ Slope: {data.slope}</p>
        </div>
      )}
    </div>
  );
};

export default SensorData;