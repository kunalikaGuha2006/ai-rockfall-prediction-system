import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function RiskChart() {

  const [riskCounts, setRiskCounts] = useState({
    high: 0,
    medium: 0,
    low: 0
  });

  useEffect(() => {

    const fetchData = () => {
      fetch("http://127.0.0.1:8000/sensor-data")
        .then(res => res.json())
        .then(data => {

          const risk = data["Predicted Risk"];

          if (risk === "High") {
            setRiskCounts({ high: 1, medium: 0, low: 0 });
          }

          if (risk === "Medium") {
            setRiskCounts({ high: 0, medium: 1, low: 0 });
          }

          if (risk === "Low") {
            setRiskCounts({ high: 0, medium: 0, low: 1 });
          }

        });
    };

    fetchData();

    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);

  }, []);

  const data = {
    labels: ["High Risk", "Medium Risk", "Low Risk"],
    datasets: [
      {
        data: [riskCounts.high, riskCounts.medium, riskCounts.low],
        backgroundColor: ["red", "yellow", "green"]
      }
    ]
  };

  return (
    <div style={{ width: "400px" }}>
      <Pie data={data} />
    </div>
  );

}

export default RiskChart;