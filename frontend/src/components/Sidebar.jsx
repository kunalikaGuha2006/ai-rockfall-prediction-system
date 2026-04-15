import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">

      <h2 className="sidebar-title">RockShield AI</h2>

      <div className="sidebar-menu">

        <NavLink to="/" className="sidebar-item">
          Dashboard
        </NavLink>

        <NavLink to="/risk-map" className="sidebar-item">
          Risk Map
        </NavLink>

        <NavLink to="/route-planner" className="sidebar-item">
          Route Planner
        </NavLink>

        <NavLink to="/analytics" className="sidebar-item">
          Analytics
        </NavLink>

        <div className="sidebar-section">Monitoring</div>

        <NavLink to="/incidents" className="sidebar-item">
          Incidents
        </NavLink>

        <NavLink to="/ai-prediction" className="sidebar-item">
          AI Prediction
        </NavLink>

        <NavLink to="/hazard-zones" className="sidebar-item">
          Hazard Zones
        </NavLink>

        <NavLink to="/notifications" className="sidebar-item">
          Notifications
        </NavLink>

        <NavLink to="/shelters" className="sidebar-item">
          Safe Shelters
        </NavLink>

        <div className="sidebar-section">System</div>

        <NavLink to="/settings" className="sidebar-item">
          Settings
        </NavLink>

      </div>

    </div>
  );
};

export default Sidebar;