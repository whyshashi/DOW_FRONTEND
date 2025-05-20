import React from "react";
import "./index.scss";
import laptopImage from "../../assets/images/overlay-laptop.png";
import mobileImage from "../../assets/images/overlay-mobile.png";
import heroScreenImg from "../../assets/images/hero-screen-back-cover.png";
import NavHeader from "../../Components/Header";

const HeroScreen = () => {
  return (
    <section className="hero_section" id="hero_screen">
      <div className="hero_container">
        <div className="nav_bar">
          <NavHeader />
        </div>
        <div className="hero_background">
          <img
            className="hero_background_image"
            src={heroScreenImg}
            alt="Background cover"
          />
          <div className="accent_bar accent_bar_left"></div>
          <div className="accent_bar accent_bar_right"></div>
        </div>

        <div className="hero_content">
          <div className="hero_text">
            <h1 className="hero_heading">
              The Digitization of Environment Health and Safety
            </h1>
            <p className="hero_description">
              In the pursuit of operational excellence, organizations across
              industries recognize the critical need to integrate Environment,
              Health, and Safety (EH&S) protocols into their corporate fabric.
            </p>
          </div>

          <div className="hero_device_showcase">
            <div className="laptop_container">
              <img src={laptopImage} alt="Laptop display" />
              <div className="mobile_container">
                <img src={mobileImage} alt="Mobile display" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroScreen;
