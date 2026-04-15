import { useEffect, useState } from "react";
import "../index.css";

function Prediction() {

  const [data, setData] = useState(null);
  const [history, setHistory] = useState([]);

  const fetchPrediction = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/sensor-data");
      const json = await res.json();

      console.log("Sensor Data:", json);

      setData(json);

      // 🔥 FIXED KEY (IMPORTANT)
      const risk = json.risk || json["Predicted Risk"];

      setHistory(prev => {
        const updated = [...prev, risk];
        return updated.slice(-10);
      });

    } catch (error) {
      console.error("Error fetching prediction:", error);
    }
  };

  useEffect(() => {

    fetchPrediction();

    const interval = setInterval(() => {
      fetchPrediction();
    }, 5000);

    return () => clearInterval(interval);

  }, []);

  if (!data) {
    return <div className="page-container">Loading AI Prediction...</div>;
  }

  // 🔥 FIXED RISK ACCESS
  const risk = data.risk || data["Predicted Risk"] || "Low";

  const riskClass =
    risk === "HIGH" || risk === "High"
      ? "risk-high"
      : risk === "MEDIUM" || risk === "Medium"
      ? "risk-medium"
      : "risk-low";

  // 🔥 AI Explanation
  const getExplanation = () => {
    let reasons = [];

    if (data.slope > 40) reasons.push("Steep slope");
    if (data.rainfall > 30) reasons.push("Heavy rainfall");
    if (data.soil_moisture > 0.5) reasons.push("High soil moisture");
    if (data.vibration === "High") reasons.push("Ground vibration detected");

    return reasons.length > 0 ? reasons.join(", ") : "Stable conditions";
  };

  // 🔥 Confidence
  const confidence =
    risk === "HIGH" || risk === "High" ? 85 :
    risk === "MEDIUM" || risk === "Medium" ? 60 : 35;

  return (
    <div className="page-container">

      <h1>AI Rockfall Prediction</h1>

      <div className="status-bar">
        🟢 System Active | Updating every 5 sec
      </div>

      <div className="prediction-grid">

        <div className="prediction-card">
          <h2>Sensor Inputs</h2>
          <p>Elevation: {data.elevation}</p>
          <p>Slope: {data.slope}°</p>
          <p>Rainfall: {data.rainfall} mm</p>
          <p>Soil Moisture: {data.soil_moisture}</p>
          <p>Vibration: {data.vibration}</p>
        </div>

        <div className="prediction-result">
          <h2>Predicted Risk</h2>
          <h1 className={riskClass}>{risk}</h1>
        </div>

      </div>

      {/* 🔥 AI Explanation */}
      <div className="explanation-card">
        <h2>AI Explanation</h2>
        <p>{getExplanation()}</p>
      </div>

      {/* 🔥 Confidence */}
      <div className="confidence-card">
        <h2>AI Confidence</h2>
        <div className="confidence-bar">
          <div
            className="confidence-fill"
            style={{ width: confidence + "%" }}
          ></div>
        </div>
        <p>{confidence}% Confidence</p>
      </div>

      {/* 🔥 History */}
      <div className="history-card">
        <h2>Prediction History</h2>
        <ul>
          {history.map((h, index) => (
            <li key={index}>{h}</li>
          ))}
        </ul>
      </div>

    </div>
  );
}

export default Prediction;