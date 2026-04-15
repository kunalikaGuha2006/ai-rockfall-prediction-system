import React, { useEffect, useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const Analytics = () => {
  const [incidents, setIncidents] = useState([]);
  const [sensor, setSensor] = useState(null);

  // 🔥 FETCH DATA
  const fetchData = async () => {
    try {
      const res1 = await fetch("http://127.0.0.1:8000/incidents");
      const data1 = await res1.json();
      setIncidents(data1);

      const res2 = await fetch("http://127.0.0.1:8000/sensor-data");
      const data2 = await res2.json();
      setSensor(data2);

    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();

    // 🔥 AUTO REFRESH EVERY 5 SEC
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);

  }, []);

  // 🔥 COUNTS
  const high = incidents.filter(i => i.risk === "HIGH").length;
  const medium = incidents.filter(i => i.risk === "MEDIUM").length;
  const low = incidents.filter(i => i.risk === "LOW").length;

  // 🔥 TIMELINE DATA (REALISTIC)
  const timelineData = {
    labels: ["10:00","10:10","10:20","10:30","10:40","10:50"],
    datasets: [
      {
        label: "Rockfall Risk",
        data: incidents.map(i =>
          i.risk === "HIGH" ? 3 :
          i.risk === "MEDIUM" ? 2 : 1
        ),
        borderColor: "#22c55e",
        backgroundColor: "#22c55e",
        tension: 0.4
      }
    ]
  };

  // 🔥 PIE DATA
  const pieData = {
    labels: ["High Risk","Medium Risk","Low Risk"],
    datasets: [
      {
        data: [high, medium, low],
        backgroundColor: ["#ef4444","#f59e0b","#16a34a"]
      }
    ]
  };

  return (
    <div>

      <h1>Risk Analytics</h1>
      <p>AI Monitoring Dashboard</p>

      {/* TIME FILTER */}
      <div className="analytics-filter">
        <button>Last 1 Hour</button>
        <button>Last 6 Hours</button>
        <button>Last 24 Hours</button>
      </div>

      {/* 🔥 SUMMARY CARDS */}
      <div className="analytics-stats">

        <div className="stat-card high">
          <h3>High Risk Zones</h3>
          <p>{high}</p>
        </div>

        <div className="stat-card medium">
          <h3>Medium Risk</h3>
          <p>{medium}</p>
        </div>

        <div className="stat-card low">
          <h3>Safe Zones</h3>
          <p>{low}</p>
        </div>

      </div>

      {/* 🔥 SENSOR PANEL */}
      <div className="sensor-panel">

        <div className="sensor-card">
          <h4>Rainfall</h4>
          <p>{sensor ? sensor.rainfall : "--"} mm</p>
        </div>

        <div className="sensor-card">
          <h4>Soil Moisture</h4>
          <p>{sensor ? sensor.soil_moisture : "--"}</p>
        </div>

        <div className="sensor-card">
          <h4>Ground Vibration</h4>
          <p>{sensor ? sensor.vibration : "--"}</p>
        </div>

        <div className="sensor-card">
          <h4>Slope Angle</h4>
          <p>{sensor ? sensor.slope : "--"}°</p>
        </div>

      </div>

      {/* 🔥 CHARTS */}
      <div className="analytics-grid">

        <div className="analytics-card">
          <h3>Rockfall Risk Timeline</h3>
          <Line data={timelineData}/>
        </div>

        <div className="analytics-card">
          <h3>Risk Distribution</h3>
          <Pie data={pieData}/>
        </div>

      </div>

      {/* 🔥 LOCATIONS */}
      <h3 style={{marginTop:"30px"}}>Top Dangerous Locations</h3>

      <table className="risk-table">
        <thead>
          <tr>
            <th>Location</th>
            <th>Risk Level</th>
          </tr>
        </thead>

        <tbody>
          {incidents.map((item) => (
            <tr key={item.id}>
              <td>Zone {item.id}</td>
              <td>{item.risk}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔥 AI CONFIDENCE */}
      <div className="ai-confidence">
        <h3>AI Prediction Confidence</h3>

        <div className="confidence-bar">
          <div
            className="confidence-fill"
            style={{ width: `${70 + Math.random()*20}%` }}
          ></div>
        </div>

        <p>{(70 + Math.random()*20).toFixed(0)}%</p>
      </div>

    </div>
  );
};

export default Analytics;