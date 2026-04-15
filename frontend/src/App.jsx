import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import RiskMap from "./pages/RiskMap";
import RoutePlanner from "./pages/RoutePlanner";
import Analytics from "./pages/Analytics";
import Incidents from "./pages/Incidents";
import AIPrediction from "./pages/AIPrediction";
import HazardZones from "./pages/HazardZones";
import Notifications from "./pages/Notifications";
import Shelters from "./pages/Shelters";
import Settings from "./pages/Settings";

function App() {
  return (
    <Router>

      <Routes>

        {/* FRONT PAGE */}
        <Route path="/" element={<Home />} />

        {/* DASHBOARD LAYOUT */}
        <Route
          path="/dashboard"
          element={
            <>
              <Sidebar />
              <div className="main-content">
                <Dashboard />
              </div>
            </>
          }
        />

        <Route
          path="/risk-map"
          element={
            <>
              <Sidebar />
              <div className="main-content">
                <RiskMap />
              </div>
            </>
          }
        />

        <Route
          path="/route-planner"
          element={
            <>
              <Sidebar />
              <div className="main-content">
                <RoutePlanner />
              </div>
            </>
          }
        />

        <Route
          path="/analytics"
          element={
            <>
              <Sidebar />
              <div className="main-content">
                <Analytics />
              </div>
            </>
          }
        />

        <Route
          path="/incidents"
          element={
            <>
              <Sidebar />
              <div className="main-content">
                <Incidents />
              </div>
            </>
          }
        />

        <Route
          path="/ai-prediction"
          element={
            <>
              <Sidebar />
              <div className="main-content">
                <AIPrediction />
              </div>
            </>
          }
        />

        <Route
          path="/hazard-zones"
          element={
            <>
              <Sidebar />
              <div className="main-content">
                <HazardZones />
              </div>
            </>
          }
        />

        <Route
          path="/notifications"
          element={
            <>
              <Sidebar />
              <div className="main-content">
                <Notifications />
              </div>
            </>
          }
        />

        <Route
          path="/shelters"
          element={
            <>
              <Sidebar />
              <div className="main-content">
                <Shelters />
              </div>
            </>
          }
        />

        <Route
          path="/settings"
          element={
            <>
              <Sidebar />
              <div className="main-content">
                <Settings />
              </div>
            </>
          }
        />

      </Routes>

    </Router>
  );
}

export default App;