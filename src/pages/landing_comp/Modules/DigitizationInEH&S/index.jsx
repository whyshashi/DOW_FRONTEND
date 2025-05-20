import React from "react";
import "../DigitizationInEH&S/index.scss";
import { digiCardsData } from "../../utils/HelperFuctions";
import DigiCard from "../../Components/DigiCard";

const Digitization = () => {
  return (
    <div className='digi_container' id='digitization'>
      <div className='digi_heading_container'>
        <div className='digi_heading'>Digitization in DOW</div>
      </div>
      <div className='digi_cards_container'>
        {digiCardsData?.map((card, index) => (
          <DigiCard key={index} Idx={index} blackIcon={card.blackIcon} greenIcon={card.greenIcon} title={card.title} text={card.text} />
        ))}
      </div>
    </div>
  );
};

export default Digitization;
