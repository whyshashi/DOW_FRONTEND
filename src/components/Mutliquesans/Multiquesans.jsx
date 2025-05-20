import MultipleIcon from "@mui/icons-material/CheckBox"; // Multiple answer icon
import SingleIcon from "@mui/icons-material/RadioButtonChecked"; // Single answer icon
import {
  Select,
  MenuItem,
  FormControl,
  ListItemIcon,
  FormHelperText,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import deleteimg from "/src/assets/images/icon-images/delete.svg";
import dragimg from "/src/assets/images/icon-images/drag.svg";
import greyplusicon from "../../assets/images/icon-images/grey-plus.svg";
import Addoptions from "../Addoptions/Addoptions"; // Multiple Answers and Single Answer logic
import "./Multiquesans.css";
const MAX_QUESTION_LENGTH = 200; // Max characters for question
const MAX_OPTION_LENGTH = 100; // Max characters for options
const Multiquesans = ({
  question,
  setQuestions,
  onDelete,
  onAddOption,
  onDeleteOption,
}) => {
  const { options, questionType } = question;
  const [questionError, setQuestionError] = useState(""); // Error state for question
  const [correctOptionError, setCorrectOptionError] = useState(""); // Error for correct answer

  // Handle adding an option to the question
  const handleAddOptionClick = () => {
    const newOption = { id: Date.now(), optionText: "", isCorrect: false };
    onAddOption(question.id, newOption.optionText, newOption.isCorrect); // Add option to parent state
  };

  // Set option text function (update option text based on index)
  const setOptionText = (newText, index) => {
    const updatedOptions = options.map((option, i) =>
      i === index ? { ...option, optionText: newText } : option
    );
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === question.id ? { ...q, options: updatedOptions } : q
      )
    );
  };

  // Handle change in question type (Single or Multiple)
  const handleQuestionTypeChange = (event) => {
    const newQuestionType =
      event.target.value === "Single Answer Question" ? 2 : 1;
  
    // Fix: Use `question.questionText` instead of undefined `text`
    if (question.questionText.trim() === "") {
      setQuestionError("Question cannot be empty.");
    } else if (question.questionText.length > MAX_QUESTION_LENGTH) {
      setQuestionError(`Maximum ${MAX_QUESTION_LENGTH} characters allowed.`);
    } else {
      setQuestionError("");
    }
  
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === question.id
          ? {
              ...q,
              questionType: newQuestionType,
              options: q.options.map((option) => ({
                ...option,
                isCorrect: newQuestionType === 2 ? false : option.isCorrect,
              })),
            }
          : q
      )
    );
  };
  
  // Handle toggling the correct answer for an option
  const handleToggleCorrectOption = (optionId) => {
    if (questionType === 2) {
      // Single Answer Question Logic
      const updatedOptions = options.map(
        (option) =>
          option.id === optionId
            ? { ...option, isCorrect: !option.isCorrect } // Toggle current option
            : { ...option, isCorrect: false } // Deselect all other options
      );
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q.id === question.id ? { ...q, options: updatedOptions } : q
        )
      );
    } else {
      // Multiple Answer Question Logic
      const updatedOptions = options.map(
        (option) =>
          option.id === optionId
            ? { ...option, isCorrect: !option.isCorrect } // Toggle the current option
            : option // Keep the others unchanged
      );
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q.id === question.id ? { ...q, options: updatedOptions } : q
        )
      );
    }
  };

  // Set the label for the Select component based on questionType
  const questionTypelabel =
    questionType === 1 ? "Multiple Answer Question" : "Single Answer Question";

  return (
    <div className="textqueans">
      <div className="qa-drag-icon">
        <img src={dragimg} alt="drag-icon" />
      </div>
      <div className="text-qa-right">
        <div className="qa-heading">
          <div className="qa-selector">
            <FormControl fullWidth variant="standard" error={!!questionError}>
              <Select
                value={questionTypelabel}
                onChange={handleQuestionTypeChange}
                sx={{
                  "& .MuiInputBase-root::before": {
                    borderBottom: "none !important",
                  },
                  "& .MuiInputBase-root.Mui-focused::after": {
                    borderBottom: "none !important",
                  },
                  alignItems: "center",
                  margin: "0.4rem",
                  width: "350px",
                  fontSize: "1.4rem",
                }}
              >
                <MenuItem value="Single Answer Question">
                  <ListItemIcon sx={{ color: "#F04141" }}>
                    <SingleIcon />
                  </ListItemIcon>
                  Single Answer Question
                </MenuItem>
                <MenuItem value="Multiple Answer Question">
                  <ListItemIcon sx={{ color: "#F04141" }}>
                    <MultipleIcon />
                  </ListItemIcon>
                  Multiple Answer Question
                </MenuItem>
              </Select>
              {/* {questionError && (
                <FormHelperText>{questionError}</FormHelperText>
              )} */}
            </FormControl>
          </div>
          <div className="qa-delete" onClick={onDelete}>
            <img src={deleteimg} alt="delete-icon" />
          </div>
        </div>

        <div className="qa-input">
          <p>Question</p>
          <input
            placeholder="Type your question"
            value={question.questionText}
            onChange={(e) => {
              const text = e.target.value;
              if (text.trim() === "") {
                setQuestionError("Question cannot be empty.");
              } else if (text.length > MAX_QUESTION_LENGTH) {
                setQuestionError(
                  `Maximum ${MAX_QUESTION_LENGTH} characters allowed.`
                );
              } else {
                setQuestionError(""); // Clear error when valid
              }

              setQuestions((prevQuestions) =>
                prevQuestions.map((q) =>
                  q.id === question.id ? { ...q, questionText: text } : q
                )
              );
            }}
          />
          {questionError && <label className="error-message">{questionError}</label>}
          {/* Display the error */}
        </div>

        <div className="qa-multi">
          <div className="qa-multi-right">
            <div className="qa-multi-label">Options</div>
            <div className="qa-multi-add" onClick={handleAddOptionClick}>
              <img src={greyplusicon} alt="plus-icon" />
              <p>Add answer</p>
            </div>
          </div>
          <div className="qa-multi-correct">Correct Answers</div>
        </div>

        <div className="optionlist">
          {options.map((el, ind) => (
            <Addoptions
              key={el.id}
              optionIndex={ind}
              optionText={el.optionText}
              isCorrect={el.isCorrect}
              toggleCorrect={() => handleToggleCorrectOption(el.id)} // Toggle logic for correct answer
              handleDeleteOption={() => onDeleteOption(question.id, el.id)}
              setOptionText={setOptionText} // Passing down the correct handler
              questionType={questionType} // Passing questionType to Addoptions for conditional rendering
            />
          ))}
        </div>
        {/* Correct Option Validation Message */}
        {correctOptionError && (
          <p className="error-message">{correctOptionError}</p>
        )}
      </div>
    </div>
  );
};

export default Multiquesans;
