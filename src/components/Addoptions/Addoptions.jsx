import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import { FormControlLabel, TextField } from "@mui/material";
import deleteicon from "/src/assets/images/icon-images/delete.svg";
import "./Addoptions.css";

const MAX_OPTION_LENGTH = 100; // Maximum option length

const Addoptions = ({
  optionIndex,
  optionText,
  isCorrect,
  setOptionText,
  toggleCorrect,
  handleDeleteOption,
  questionType,
}) => {
  const [error, setError] = useState(""); // State to store validation errors

  const handleChange = (event) => {
    const text = event.target.value;

    // Validation: Check if option text is empty or exceeds max length
    if (text.trim() === "") {
      setError("Option cannot be empty.");
    } else if (text.length > MAX_OPTION_LENGTH) {
      setError(`Maximum ${MAX_OPTION_LENGTH} characters allowed.`);
    } else {
      setError(""); // Clear error if valid
    }

    setOptionText(text, optionIndex); // Update the option text
  };

  return (
    <div className="addoption">
      <div className="option-input">
        <TextField
          value={optionText}
          placeholder="Type your option"
          onChange={handleChange}
          error={!!error} // Show error if exists
          helperText={error} // Display error message
          fullWidth
          // variant="outlined"
          inputProps={{ maxLength: MAX_OPTION_LENGTH }} // Enforce max length
          sx={{
            "& .MuiInput-underline:before": { border: "none" }, // Remove default bottom border
            // "& .MuiInput-underline:after": { borderBottom: "none" }, // Remove focus border
            "& .MuiInputBase-input": {
              backgroundColor: "transparent", // Ensure background remains clear
              border:"none"
            },
          }}
        />
        <img
          src={deleteicon}
          alt="delete"
          className="delete-icon"
          onClick={handleDeleteOption} // Trigger delete option handler
        />
      </div>
      <div className="checkboxinput">
        <FormControlLabel
          control={
            questionType === 1 ? (
              <Checkbox
                checked={isCorrect}
                onChange={toggleCorrect} // Toggle checkbox
                inputProps={{ "aria-label": "Select option" }}
                sx={{
                  color: "#e8e8e8",
                  "&.Mui-checked": {
                    color: "#F04141",
                  },
                }}
              />
            ) : (
              <Radio
                checked={isCorrect}
                onChange={toggleCorrect} // Toggle radio button
                inputProps={{ "aria-label": "Select option" }}
                sx={{
                  color: "#e8e8e8",
                  "&.Mui-checked": {
                    color: "#F04141",
                  },
                }}
              />
            )
          }
        />
      </div>
    </div>
  );
};

export default Addoptions;
