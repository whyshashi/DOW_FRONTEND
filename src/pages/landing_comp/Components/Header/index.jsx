import React, { useState } from "react";
import "../Header/index.scss";
import Dow from "../../assets/images/Dow.svg";
import { scrollToSection } from "../../utils/HelperFuctions";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NavHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavLinkClick = () => {
    setIsMenuOpen(false);
  };

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login"); // Correct way to navigate
  };
  return (
    <>
      <div className="nav_header_container">
        <div className="burger_menu" onClick={toggleMenu}>
          <div className={`burger_line ${isMenuOpen ? "open" : ""}`}></div>
          <div className={`burger_line ${isMenuOpen ? "open" : ""}`}></div>
          <div className={`burger_line ${isMenuOpen ? "open" : ""}`}></div>
        </div>

        <div className="ehs_logo">
          <div className="ehs_icon">
            <img src={Dow} alt="ehs-logo.png" />
          </div>
          {/* <div className='ehs_text'>EHSoft</div> */}
        </div>

        <div className="nav_links desktop_nav">
          <a href="#hero_screen">Home</a>
          <a href="#introduction">About</a>
          <a href="#applications">Why Digitize</a>
          <a href="#contact_us_section">Contact Us</a>
          <a href="#digitization">Digitization in DOW</a>
        </div>

        <div className="contact_us desktop_contact" onClick={handleLogin}>
          <div className="contact_us_text">Login</div>
        </div>

        <div className="empty_space"></div>
      </div>

      <div className={`mobile_menu ${isMenuOpen ? "open" : ""}`}>
        <div className="nav_links">
          <a href="#hero_screen" onClick={handleNavLinkClick}>
            Home
          </a>
          <a href="#introduction" onClick={handleNavLinkClick}>
            About
          </a>
          <a href="#applications" onClick={handleNavLinkClick}>
            Why Digitize
          </a>
          <a href="#contact_us_section" onClick={handleNavLinkClick}>
            Contact Us
          </a>
          <a href="#digitization" onClick={handleNavLinkClick}>
            Digitization in EH&S
          </a>
          {/* <div
            className='contact_us mobile_contact'
            onClick={() => {
              scrollToSection("contact_us_section");
              handleNavLinkClick();
            }}>
            <div className='contact_us_text'>Contact Us</div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default NavHeader;
