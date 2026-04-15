import React, { useState } from "react";

const Prediction = () => {
  const [rainfall, setRainfall] = useState("");
  const [slope, setSlope] = useState("");
  const [result, setResult] = useState(null);

  const predictRisk = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rainfall: parseFloat(rainfall),
          slope: parseFloat(slope),
        }),
      });

      const data = await res.json();
      setResult(data);

    } catch (err) {
      console.error(err);
      alert("Server error!");
    }
  };

  return (
    <div style={{ color: "white" }}>
      <h2>AI Risk Prediction</h2>

      <input
        placeholder="Rainfall"
        value={rainfall}
        onChange={(e) => setRainfall(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Slope"
        value={slope}
        onChange={(e) => setSlope(e.target.value)}
      />

      <br /><br />

      <button onClick={predictRisk}>Predict</button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <p>ML Prediction: {result.ml_prediction}</p>
          <p>Rule Prediction: {result.rule_prediction}</p>

          <h4>Why?</h4>
          <ul>
            {result.reasons.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Prediction;