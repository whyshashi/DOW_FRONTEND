import React from "react";
import "../maincss/incidentCard.css";

const IncidentCards = ({ number, title, color }) => {
  return (
    <div className="incident-full-card">
      {/* <div>
        <img src={upperImg} />
      </div> */}
      <div style={{ marginTop: "65px" }}>
        <div style={{ color: color, marginBottom: "8px" }} className="number">
          {number}
        </div>
        <div className="title">{title}</div>
      </div>
    </div>
  );
};

export default IncidentCards;
