import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Checkbox, Radio, FormControlLabel } from "@mui/material";
import "./QuestionPreview.css";
import arrowleft from "../../assets/images/icon-images/arrow-left.svg";
import { Snackbar, Alert } from "@mui/material";
import { useState } from "react";

const QuestionPreview = ({ handleClosequesPreview }) => {
  const location = useLocation();

  // Fetch Training & Questions Data from Redux
  const traindataFront = useSelector(
    (state) => state?.documents?.trainingpreviewdatafront
  );
  const questionsFront = useSelector(
    (state) => state?.documents?.trainingpreviewquestionsfront
  );
  const trainingpreviewdata = useSelector(
    (state) => state?.documents?.storetrainingpreviewdata
  );
  const questionsstored = useSelector(
    (state) => state?.documents?.trainingpreviewquestionsbackend
  );
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // success, error, warning, info
  const handleSnackbarOpen = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Conditionally select the data
  const traindata =
    traindataFront && Object.keys(traindataFront).length > 0
      ? traindataFront
      : trainingpreviewdata || {};

  const questions =
    Array.isArray(questionsstored) && questionsstored.length > 0
      ? questionsstored
      : Array.isArray(questionsFront)
      ? questionsFront
      : [];

  console.log("Selected questionsFront", questionsFront);
  console.log("Selected training data:", traindata);
  console.log("Selected questions:", questions);
  console.log("Selected questionsstored", questionsstored);
  return (
    <>
      {/* Top Navbar */}
      <div className="doc-preview">
        <div className="doc-navbar-q">
          <div className="close" onClick={handleClosequesPreview}>
            <img className="close-img" src={arrowleft} alt="Close" />
          </div>
          <div className="nav-title">
            <p>Questionnaire Preview</p>
          </div>
          <div></div>
        </div>

        <div className="doc-preview-content">
          <div className="doc-prev-title">
            <h3>{traindata?.title}</h3>
          </div>
        </div>
      </div>

      {/* Question Preview */}
      <div className="question-preview-container">
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="question-card">
            {/* Question Title */}
            <h3 className="question-text">{q.question}</h3>

            {/* Options */}
            <div className="options-container">
              {q.options.map((option, index) => {
                const isCorrect = q.answer.includes(option); // Check if the option is correct

                return (
                  <div
                    key={index}
                    className={`option-item ${isCorrect ? "correct" : ""}`}
                  >
                    <FormControlLabel
                      control={
                        q.questionType === 2 ? (
                          <Radio
                            checked={isCorrect}
                            readOnly
                            sx={{
                              color: "#808080",
                              "&.Mui-checked": {
                                color: "#808080",
                                gap: "2rem",
                              },
                            }}
                          />
                        ) : (
                          <Checkbox
                            checked={isCorrect}
                            readOnly
                            sx={{
                              color: "#808080",
                              "&.Mui-checked": {
                                color: "#808080",
                              },
                            }}
                          />
                        )
                      }
                      label={option}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>

        {/* <div className="q-footer">hi</div> */}
      </div>
    </>
  );
};

export default QuestionPreview;
