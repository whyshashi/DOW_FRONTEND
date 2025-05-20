import React from "react";
import cross from "../assets/images/cross.svg";
import "../maincss/viewuser.css";

const ViewUser = (props) => {
  const { headername } = props;
  function handleClose() {
    console.log("hello");
  }
  return (
    <div className="viewCard">
      <div className="top-header">
        <img onClick={handleClose} src={cross}></img>
        {headername}
      </div>
      <div className="showCredentials">
        <label>First Name</label>
        <span>hello</span>
      </div>
    </div>
  );
};

export default ViewUser;
