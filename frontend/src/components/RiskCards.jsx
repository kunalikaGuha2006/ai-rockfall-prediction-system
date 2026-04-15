import { useEffect, useState } from "react";

function RiskCards() {

  const [risk, setRisk] = useState("Low");

  useEffect(() => {

    const fetchData = () => {
      fetch("http://127.0.0.1:8000/sensor-data")
        .then(res => res.json())
        .then(data => {
          setRisk(data["Predicted Risk"]);
        });
    };

    fetchData();

    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);

  }, []);

  const cardStyle = {
    padding: "20px",
    borderRadius: "8px",
    color: "white",
    width: "200px",
    textAlign: "center"
  };

  return (
    <div style={{display:"flex",gap:"20px",marginBottom:"20px"}}>

      <div style={{...cardStyle, background:"red"}}>
        High Risk
        <h2>{risk === "High" ? 1 : 0}</h2>
      </div>

      <div style={{...cardStyle, background:"orange"}}>
        Medium Risk
        <h2>{risk === "Medium" ? 1 : 0}</h2>
      </div>

      <div style={{...cardStyle, background:"green"}}>
        Low Risk
        <h2>{risk === "Low" ? 1 : 0}</h2>
      </div>

    </div>
  );
}

export default RiskCards;