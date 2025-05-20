import React from "react";
import image1 from "../assets/images/Dow.svg";

const CustomDowLoader = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "60%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <img
        style={{
          height: "100px",
          transform: "translate(-50%, -50%) scale(1.2)",
          animation: "heartbeat 1.5s infinite",
        }}
        src={image1}
        alt=""
      />
      <style>
        {`
          @keyframes heartbeat {
            0% { transform: translate(-50%, -50%) scale(1); }
            50% { transform: translate(-50%, -50%) scale(1.2); }
            100% { transform: translate(-50%, -50%) scale(1); }
          }
        `}
      </style>
    </div>
  );
};

export default CustomDowLoader;
