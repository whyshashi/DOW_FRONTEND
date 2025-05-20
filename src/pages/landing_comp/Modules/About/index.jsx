import React from "react";
import "./index.scss";
import intro_Img from "../../assets/images/intro-image.jpg"; // Assuming the image path

const Introduction = () => {
  return (
    <div className='intro_component' id='introduction'>
      <div className='intro_text'>
        <div className='intro_heading'>Introduction</div>
        <div className='intro_sub_heading'>
          In the pursuit of operational excellence, organizations across industries recognize the critical need to integrate Environment, Health, and
          Safety (EH&S) protocols into their corporate fabric.
        </div>
        <div className='intro_description'>
          EH&S professionals are always on the move, needing to make quick decisions, report incidents pronto, and access vital data from wherever
          they are. That's where the game-changer comes in – EHS Apps. These apps give them the power to conduct audits, report incidents, and get
          crucial info right there on the field.
        </div>
      </div>
      <div className='intro_image'>
        <img src={intro_Img} alt='intro-image.jpg' />
      </div>
    </div>
  );
};

export default Introduction;
