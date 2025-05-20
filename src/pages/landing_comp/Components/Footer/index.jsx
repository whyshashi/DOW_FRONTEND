import React from "react";
import "../Footer/index.scss";
import callIcon from "../../assets/images/call.png";
import { scrollToSection } from "../../utils/HelperFuctions";
import Dow from "../../assets/images/Dow.svg";

const EHSFooter = () => {
  return (
    <>
      <div className="footer_container">
        <div className="upper_footer">
          <div className="footer_left">
            <div
              className="ehs_logo"
              onClick={() => {
                scrollToSection("hero_screen");
              }}
            >
              <div className="ehs_icon">
                <img src={Dow} alt="ehs-logo.png" />
              </div>
              {/* <div className='ehs_text'>EHSoft</div> */}
            </div>
            <div className="footer_left_text">
              A streamlined incident reporting system facilitates <br /> quick
              response times and more effective incident <br /> investigations
              and resolutions.
            </div>
          </div>
          <div className="footer_middle">
            <div className="middle_left_section">
              <a href="#hero_screen">Home</a>
              <a href="#introduction">About</a>
              <a href="#digitization">Why Digitize</a>
            </div>
            <div className="middle_right_section">
              <a href="#contact_us_section">Contact Us</a>
              <a href="#digitization">Digitization in DOW</a>
            </div>
          </div>
          <div className="footer_right">
            <div className="footer_right_text">
              Feel free to contact our team if you have any
              <br />
              questions or need help.
            </div>
            <div className="footer_contact">
              <div className="contact_icon">
                <img src={callIcon} alt="call.png" />
              </div>
              <div className="contact">213-555-0468</div>
            </div>
            <div className="footer_address">
              569 W Loma Alta Drive <br /> Altadena, CA 91001, United States
            </div>
          </div>
        </div>
        <div className="lower_footer">
          <div className="lower_footer_text">
            Copyright © 2025 EHSoft. All rights reserved.
          </div>
        </div>
      </div>
    </>
  );
};

export default EHSFooter;
