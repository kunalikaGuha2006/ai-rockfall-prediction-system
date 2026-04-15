import React, { useEffect, useState } from "react";

const AlertBanner = () => {

  const [risk, setRisk] = useState(null);

  const fetchData = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/sensor-data");
      const data = await res.json();

      setRisk(data["Predicted Risk"]);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(interval);

  }, []);

  if (risk !== "High") return null;

  return (
    <div className="alert-banner">

      🚨 HIGH ROCKFALL RISK DETECTED  
      Avoid the affected route immediately

    </div>
  );
};

export default AlertBanner;