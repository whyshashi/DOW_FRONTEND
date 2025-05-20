import React from "react";
import arrowleft from "../../assets/images/icon-images/arrow-left.svg";
import plusicon from "../../assets/images/icon-images/grey-plus.svg";
import "./Addques.css";
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const Addques = ({ label, onClick }) => {
  // Step 1: Determine which icon to show based on the label
  let icon;
  if (label === "Open Question") {
    icon = <TextFieldsIcon />;
  } else if (label === "Multiple Answer Question") {
    icon = <CheckBoxIcon />;
  } else {
    icon = <RadioButtonCheckedIcon />;
  }

  return (
    <div className="types-ques" onClick={() =>onClick(label)}>
      <div className="type-q-left">
        <div className="icon-container">{icon}</div>
        <div className="label">{label}</div>
      </div>
      <div className="plus-icon">
        <img src={plusicon} alt="plus-icon" />
      </div>
    </div>
  );
};

export default Addques;
