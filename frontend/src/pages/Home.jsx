import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../assets/bg.mp4";

const Home = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔥 LOGIN LOGIC
  const handleLogin = () => {
    if (email === "admin@gmail.com" && password === "1234") {
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>

      {/* 🎥 VIDEO BACKGROUND */}
      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source src={bg} type="video/mp4" />
      </video>

      {/* 🔥 OVERLAY */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
          color: "white",
        }}
      >

        <div style={{
          display: "flex",
          width: "100%",
          maxWidth: "1100px",
          justifyContent: "space-between",
          alignItems: "center"
        }}>

          {/* 🔥 LEFT SIDE */}
          <div style={{ maxWidth: "500px" }}>

            <h1 style={{
              fontSize: "44px",
              fontWeight: "bold",
              lineHeight: "1.2"
            }}>
              AI Rockfall Prediction System
            </h1>

            <p style={{
              marginTop: "10px",
              fontSize: "16px",
              opacity: 0.9
            }}>
              Smart Monitoring for Safer Mountains
            </p>

            {/* 🔴 LIVE BADGE */}
            <div style={{
              marginTop: "20px",
              background: "#ef4444",
              padding: "8px 15px",
              borderRadius: "20px",
              width: "fit-content",
              fontSize: "14px"
            }}>
              🔴 LIVE SYSTEM ACTIVE
            </div>

            {/* 🔥 FEATURES */}
            <div style={{ marginTop: "25px", lineHeight: "1.8" }}>
              <p>📡 Real-time Sensors</p>
              <p>🧠 AI Prediction</p>
              <p>🗺️ Safe Navigation</p>
            </div>

          </div>

          {/* 🔥 LOGIN CARD */}
          <div style={{
            width: "320px",
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(15px)",
            padding: "30px",
            borderRadius: "20px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.4)"
          }}>

            <h2 style={{ marginBottom: "20px" }}>Login</h2>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />

            <button onClick={handleLogin} style={buttonStyle}>
              Login
            </button>

            <p style={{
              marginTop: "15px",
              fontSize: "12px",
              opacity: 0.7
            }}>
              Demo: admin@gmail.com / 1234
            </p>

          </div>

        </div>
      </div>
    </div>
  );
};

// 🎨 STYLES

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "10px",
  border: "none",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  background: "#22c55e",
  border: "none",
  borderRadius: "10px",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "0.3s",
};

export default Home;