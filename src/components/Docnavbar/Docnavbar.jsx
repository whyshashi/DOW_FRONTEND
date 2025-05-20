import React from "react";
import arrowleft from "../../assets/images/icon-images/arrow-left.svg";
import closeimg from "../../assets/images/icon-images/close.svg"; // Fixed Path
import rvimg from "../../assets/images/icon-images/refresh.svg"; // Fixed Path
import "./index.css"
import { useLocation } from "react-router-dom";
const Docnavbar = ({ handleClose, heading, rightText, handleOpenPreview,
  handleClosePreview}) => {
  const location = useLocation();
  return (
    <div
      className={
        location.pathname.includes("/user-management")
          ? "doc-navbar-2"
          : "doc-navbar"
      }
    >
      {/* Close Button (Left) */}
      <div className="close" onClick={handleClose||handleClosePreview}>
      {
        location.pathname.includes("/new-doc")
          ?  <img className="close-img" src={arrowleft} alt="arrow-left" />
          : <img className="close-img" src={closeimg} alt="Close" />
      }
      </div>

      {/* Navbar Title (Center) */}
      <div className="nav-title">
        <span>{heading}</span>
      </div>

      {/* Revision Icon + Text (Right) */}
      <div className="revision">
        {/* <img className="rv-img" src={rvimg} alt="Revision" /> */}
        <span className="revision-text">{rightText}</span>
      </div>
    </div>
  );
};

export default Docnavbar;
