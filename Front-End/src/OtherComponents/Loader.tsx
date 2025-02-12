import React, { useState, useEffect } from "react";

function LoadingIndicator() {
  const [dots, setDots] = useState<string>("...");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots === "...") {
          return ".";
        } else if (prevDots === ".") {
          return "..";
        } else if (prevDots === "..") {
          return "...";
        }
        return "";
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ai-bot-response-container">
      <img
        className="ai-bot-avatar"
        src="images/chatbot-avatar.png"
        alt="chatbot avatar icon"
      />
      <div className="ai-bot-response">
        <div className="ai-bot-content">
          <p>{dots}</p>
        </div>
      </div>
    </div>
  );
}

export default LoadingIndicator;
