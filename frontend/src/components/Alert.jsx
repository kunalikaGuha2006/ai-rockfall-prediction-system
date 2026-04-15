function Alert({ locations }) {

  const highRisk = locations.filter(l => l.risk === "High");

  if (highRisk.length === 0) return null;

  return (
    <div style={{
      background: "#ff4d4d",
      color: "white",
      padding: "15px",
      marginBottom: "20px",
      textAlign: "center",
      fontWeight: "bold",
      borderRadius: "10px",
      width: "80%",
      marginLeft: "auto",
      marginRight: "auto"
    }}>
      ⚠ ROCKFALL WARNING: High risk detected in {highRisk.map(z => z.place).join(", ")}
    </div>
  );
}

export default Alert;