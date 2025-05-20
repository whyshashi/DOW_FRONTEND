import React from "react";
import "../EH&SApplications/index.scss";
import CoreCard from "../../Components/CoreCard";
import { coreComponentsData } from "../../utils/HelperFuctions";

const CoreComponents = () => {
  return (
    <div className='core_container' id='applications'>
      <div className='core_heading_container'>
        <h1 className='core_heading'>Core Components</h1>
      </div>
      <div className='core_cards_container'>
        {coreComponentsData?.map((card, index) => {
          return (
            <CoreCard
              key={index}
              Idx={index}
              title={card.title}
              admins={card.admins}
              users={card.users}
              image={card.image}
              uniqueKey={card.uniqueKey || index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CoreComponents;
