import React, { useState } from "react";
import "../DigiCard/index.scss";

const DigiCard = (props) => {
  const { blackIcon, greenIcon, title, text } = props;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`digi_card_container ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div className={`digi_card_data ${isHovered ? "hovered" : ""}`}>
        <div className='digi_card_icon'>
          <div className={`icon_circle ${isHovered ? "hovered" : ""}`}>
            <img src={isHovered ? greenIcon : blackIcon} alt='black-icon' />
          </div>
        </div>
        <div className='digi_card_title'>
          {title.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line} <br />
            </React.Fragment>
          ))}
        </div>
        <div className='digi_card_text'>
          {text.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line} <br />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DigiCard;
