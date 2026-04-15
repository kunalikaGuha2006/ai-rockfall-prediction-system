import { useState } from "react";
import "../index.css";

function Settings() {

  const [sensitivity, setSensitivity] = useState("Medium");
  const [alertsEnabled, setAlertsEnabled] = useState(true);

  const handleReset = () => {
    setSensitivity("Medium");
    setAlertsEnabled(true);
    alert("System Reset Successfully");
  };

  return (
    <div className="page-container">

      <h1>System Settings</h1>

      {/* Alert Sensitivity */}
      <div className="settings-card">
        <h2>Alert Sensitivity</h2>

        <select
          value={sensitivity}
          onChange={(e) => setSensitivity(e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

      {/* Notifications */}
      <div className="settings-card">
        <h2>Notifications</h2>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={alertsEnabled}
            onChange={() => setAlertsEnabled(!alertsEnabled)}
          />
          Enable Alerts
        </label>
      </div>

      {/* System Control */}
      <div className="settings-card">
        <h2>System Control</h2>

        <button className="reset-btn" onClick={handleReset}>
          Reset System
        </button>
      </div>

    </div>
  );
}

export default Settings;