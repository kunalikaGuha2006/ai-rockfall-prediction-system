import React, { useState, useRef, useEffect } from "react";

const Chatbot = () => {

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const chatbotRef = useRef(null);

  const [messages, setMessages] = useState([
    { text: "Hello! I am your RockShield assistant.", sender: "bot" }
  ]);

  const getBotReply = (message) => {

    const text = message.toLowerCase();

    if (text.includes("hello") || text.includes("hi") || text.includes("hey")) {
      return "Hello! How can I help you today?";
    }

    if (text.includes("risk")) {
      return "Current rockfall risk in monitored zones is moderate.";
    }

    if (text.includes("route")) {
      return "The safest route currently avoids steep mountain roads.";
    }

    if (text.includes("shelter")) {
      return "Nearest shelters include Community Hall and Government School.";
    }

    if (text.includes("map")) {
      return "You can check the Risk Map page to see hazardous zones.";
    }

    if (text.includes("analytics")) {
      return "Analytics page shows risk trends and monitoring data.";
    }

    if (text.includes("safety") || text.includes("precaution")) {
      return "Avoid steep slopes during heavy rain and follow alerts.";
    }

    return "I'm here to help with rockfall monitoring, routes, shelters, or safety advice.";
  };

  const sendMessage = () => {

    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    const botMessage = { text: getBotReply(input), sender: "bot" };

    setMessages([...messages, userMessage, botMessage]);
    setInput("");
  };

  /* CLOSE BOT IF CLICK OUTSIDE */

  useEffect(() => {

    const handleClickOutside = (event) => {
      if (chatbotRef.current && !chatbotRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, []);

  return (
    <div className="chatbot-container" ref={chatbotRef}>

      <button
        className="chatbot-button"
        onClick={() => setOpen(!open)}
      >
        💬
      </button>

      {open && (
        <div className="chatbot-window">

          <div className="chatbot-header">
            RockShield Assistant
          </div>

          <div className="chatbot-messages">

            {messages.map((msg, index) => (
              <div
                key={index}
                className={msg.sender === "user" ? "user" : "bot"}
              >
                {msg.text}
              </div>
            ))}

          </div>

          <div className="chatbot-input">

            <input
              type="text"
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}

              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />

            <button onClick={sendMessage}>
              Send
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default Chatbot;