import React from "react";
import "../maincss/input.css";

const Input = (props) => {
  const { placeholder, inputText, handleSearch } = props;
  return (
    <input
      placeholder={placeholder}
      value={inputText}
      onChange={handleSearch}
    />
  );
};

export default Input;
