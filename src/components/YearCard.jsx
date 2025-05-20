import React from 'react'
import "../maincss/year_card.css";
import arrowimg from "../assets/images/icon-images/keyboard_arrow_down.svg";
const YearCard = () => {
  return (
    <div className="YearCard">
       <div className="left-text">
        <div className="left-text-top">
            Year-over-year Improvement in
            Incident Management
        </div>
        <div className="left-text-bottom">
            This year marks a significant achievement in
            our commitment to safety.
        </div>
       </div>
       <div className="right-btn">
        <div></div>
        <div className="right-btn-text">
          <p>See comaparison</p> <img src={arrowimg} alt='arrow_img'></img>
        </div>
       </div>
    </div>
  )
}

export default YearCard
