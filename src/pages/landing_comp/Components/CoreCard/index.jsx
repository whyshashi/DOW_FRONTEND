import React from "react";
import "../CoreCard/index.scss";

const CoreCard = (props) => {
  const { uniqueKey, Idx, title, admins, users, image } = props;
  return (
    <>
      <div className='core_card' data-index={Idx}>
        <div className='core_card_text'>
          <div className='core_card_heading'>{title}</div>
          <div className='core_card_description'>
            <b>Admins:</b> {admins}
          </div>
          {Idx !== 3 && (
            <div className='core_card_description'>
              <b>Users:</b> {users}
            </div>
          )}
        </div>
        <div className='core_card_image'>
          <div className={Idx === 3 ? "core_image_laptop" : "core_image"}>
            <img src={image} alt='core_card-image.jpg' />
          </div>
        </div>
      </div>
    </>
  );
};

export default CoreCard;
