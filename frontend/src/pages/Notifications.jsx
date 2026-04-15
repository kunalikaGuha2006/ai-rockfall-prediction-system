import React, { useEffect, useState } from "react";

const Notifications = () => {

  const [notifications, setNotifications] = useState([]);

  const fetchSensorData = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/sensor-data");
      const data = await res.json();

      const time = new Date().toLocaleTimeString();

      let newNotification = null;

      if (data["Predicted Risk"] === "High") {
        newNotification = {
          message: "🚨 High Rockfall Risk Alert",
          description: "Authorities and nearby villages notified",
          type: "danger",
          time
        };
      }

      else if (data["Predicted Risk"] === "Medium") {
        newNotification = {
          message: "⚠ Moderate Rockfall Risk",
          description: "Monitoring intensified in the area",
          type: "warning",
          time
        };
      }

      else {
        newNotification = {
          message: "✅ Area Stable",
          description: "No immediate rockfall risk detected",
          type: "safe",
          time
        };
      }

      setNotifications(prev => [newNotification, ...prev].slice(0, 10));

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {

    fetchSensorData();

    const interval = setInterval(() => {
      fetchSensorData();
    }, 6000);

    return () => clearInterval(interval);

  }, []);

  return (
    <div>

      <h2>Notifications Center</h2>

      <div className="notification-container">

        {notifications.map((note, index) => (
          <div key={index} className={`notification-card ${note.type}`}>

            <div className="notification-message">
              {note.message}
            </div>

            <div className="notification-description">
              {note.description}
            </div>

            <div className="notification-time">
              {note.time}
            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default Notifications;