import React from "react";
import "./Textqueans.css";
import deleteimg from "/src/assets/images/icon-images/delete.svg";
import dragimg from "/src/assets/images/icon-images/drag.svg";
const Textqueans = ({onDelete}) => {
  return (
    <div className="textqueans">
      <div className="qa-drag-icon">
        <img src={dragimg} alt="" />
      </div>
      <div className="text-qa-right">
        <div className="qa-heading">
          <select className="qa-selector">
            <option value="Select Category" disabled>
                    {"Select Category"}
            </option>
            <option>text ans q</option>
            <option>multiple ans q</option>
            <option>single ans q</option>
          </select>

          <div className="qa-delete" onClick={onDelete}>
            <img src={deleteimg} alt="delete-icon" />
          </div>
        </div>
        <div className="qa-input">
            <p>Questions</p>
            <input placeholder="Type your question"></input>
        </div>
        <div className="qa-text">
        <textarea placeholder="Write answer"></textarea>
        </div>
      </div>
    </div>
  );
};

export default Textqueans;
