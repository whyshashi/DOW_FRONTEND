import React, { useState } from "react";
// import Navbar from "../navbar/Navbar";
import SafetyFooter from "../SafetyFooter/SafetyFooter";
// import Sidebar from "../Sidebar";
import visibility from "../../assets/images/icon-images/visibility.svg";
import Docnavbar from "../Docnavbar/Docnavbar";
import Sidebar from "../Sidebar";
import Navbar from "../navbar/Navbar";
import "./CreateQues.css";
// import DashBoard from "../../pages/DashBoard";
import Addques from "../Addques/Addques";
import Multiquesans from "../Mutliquesans/Multiquesans";
import {
  get_safety_categories,
  get_safetyTraining_CardData,
  post_question_answer,
} from "../../api/api_calls/apiCalls";
import closeimg from "../../assets/images/icon-images/close.svg"; // Fixed Path
import arrowleft from "../../assets/images/icon-images/arrow-left.svg";
import { useDispatch } from "react-redux";
import { counterSliceActions } from "../../redux/features/counter/CounterSlice";
import { Snackbar, Alert } from "@mui/material";
import { useLocation } from "react-router-dom";

const CreateQues = ({
  handleClose,
  handleOpenQues,
  handleCloseQues,
  handleOpenquesPreview,
  handleClosequesPreview,
  handleCloseaddques,
  categoryidforalldata,
  docid,
}) => {
  const [questions, setQuestions] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [error, setError] = useState("");
  const handleSnackbarOpen = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categorytogetalltraindoc = searchParams.get("category");

  const dispatch = useDispatch();
  const handleAddQuestion = (label) => {
    const type = label === "Multiple Answer Question" ? 1 : 2;

    setQuestions((prev) => [
      ...prev,
      {
        id: Date.now(),
        questionType: type,
        questionText: "", // Default value for the question
        answer: [],
        options: [], // Empty array for options initially
        createdBy: 1,
      },
    ]);
  };

  const handleDelete = (id) => {
    setQuestions((prev) => prev.filter((question) => question.id !== id));
  };

  const handleAddOption = (questionId, optionText, isCorrect) => {
    setQuestions((prev) =>
      prev.map((question) =>
        question.id === questionId
          ? {
              ...question,
              options: [
                ...question.options,
                { id: Date.now(), optionText, isCorrect },
              ],
            }
          : question
      )
    );
  };

  const toggleCorrectOption = (questionId, optionId) => {
    setQuestions((prev) =>
      prev.map((question) =>
        question.id === questionId
          ? {
              ...question,
              options: question.options.map((option) =>
                question.questionType === 2 // Single Answer Question (only one correct)
                  ? {
                      ...option,
                      isCorrect: option.id === optionId ? true : false, // Only one correct answer for single-answer questions
                    }
                  : option.id === optionId
                  ? { ...option, isCorrect: !option.isCorrect } // Toggle correct flag for multiple-answer questions
                  : option
              ),
            }
          : question
      )
    );
  };

  const handleDeleteOption = (questionId, optionId) => {
    setQuestions((prev) =>
      prev.map((question) =>
        question.id === questionId
          ? {
              ...question,
              options: question.options.filter(
                (option) => option.id !== optionId
              ),
            }
          : question
      )
    );
  };

  // Handle changing question type (reset correct options if changing from multiple to single-answer question)
  const handleQuestionTypeChange = (questionId, newType) => {
    setQuestions((prev) =>
      prev.map((question) =>
        question.id === questionId
          ? {
              ...question,
              questionType: newType,
              options: question.options.map((option, index) => ({
                ...option,
                isCorrect: newType === 2 ? index === 0 : option.isCorrect, // Ensure at least one correct answer for single-answer questions
              })),
            }
          : question
      )
    );
  };

  {
    console.log("these are the raw question", questions);
  }
  const formattedQuestionsforpreview = questions.map((question) => {
    // For each question, determine the answer(s)
    let answer = [];
    if (question.questionType === 1) {
      // Multiple Answer Question
      // Collect all options marked as correct
      answer = question.options
        .filter((option) => option.isCorrect)
        .map((option) => option.optionText);
    } else if (question.questionType === 2) {
      // Single Answer Question
      // Find the single correct answer
      const correctOption = question.options.find((option) => option.isCorrect);
      if (correctOption) {
        answer = [correctOption.optionText]; // Only one answer in array
      }
    }
    return {
      questionType: question.questionType,
      question: question.questionText.trim(),
      answer: answer,
      options: question.options.map((option) => option.optionText), // Including options in the request
      createdBy: question.createdBy,
    };
  });
  {
    console.log("these are the question lo bhai", formattedQuestionsforpreview);
  }
  dispatch(
    counterSliceActions.storeTrainingPreviewQuestionsFront(
      formattedQuestionsforpreview
    )
  );
  console.log("Current questions array before validation:", questions);

  const handleSaveAndNext = async () => {
    console.log("Current questions array before validation:", questions);

    // Check if all questions have text
    const allQuestionsHaveText = questions.every(
      (question) => question.questionText.trim() !== ""
    );

    if (!allQuestionsHaveText) {
      handleSnackbarOpen("Each question must have text.", "error");
      return;
    }

    // Check if each question has at least two valid options
    const allQuestionsHaveEnoughOptions = questions.every(
      (question) =>
        question.options.filter((option) => option.optionText.trim() !== "")
          .length >= 2
    );

    if (!allQuestionsHaveEnoughOptions) {
      handleSnackbarOpen(
        "Each question must have at least two options with text.",
        "error"
      );
      return;
    }

    // Check if all options have text
    const allOptionsValid = questions.every((question) =>
      question.options.every((option) => option.optionText.trim() !== "")
    );

    if (!allOptionsValid) {
      handleSnackbarOpen("Each option must have some text.", "error");
      return;
    }

    // Check for multi-correct (questionType === 1)
    const multiCorrectValid = questions.every((question) => {
      if (question.questionType === 1) {
        return (
          question.options.filter((option) => option.isCorrect).length >= 1
        );
      }
      return true; // Ignore if not a multi-correct question
    });

    if (!multiCorrectValid) {
      handleSnackbarOpen(
        "Multi-correct questions must have at least one correct options.",
        "error"
      );
      return;
    }

    // Check for single-correct (questionType !== 1)
    const singleCorrectValid = questions.every((question) => {
      if (question.questionType !== 1) {
        return question.options.some((option) => option.isCorrect);
      }
      return true; // Ignore if not a single-correct question
    });

    if (!singleCorrectValid) {
      handleSnackbarOpen(
        "Single-correct questions must have at least one correct option.",
        "error"
      );
      return;
    }

    const formattedQuestions = questions.map((question) => {
      let answer = [];
      if (question.questionType === 1) {
        answer = question.options
          .filter((option) => option.isCorrect)
          .map((option) => option.optionText);
      } else {
        const correctOption = question.options.find(
          (option) => option.isCorrect
        );
        if (correctOption) {
          answer = [correctOption.optionText];
        }
      }
      return {
        questionType: question.questionType,
        question: question.questionText.trim(),
        answer: answer,
        options: question.options.map((option) => option.optionText),
        createdBy: question.createdBy,
      };
    });

    try {
      let id = localStorage.getItem("trainingId");
      if (docid == undefined) {
        id = localStorage.getItem("trainingId");
      } else {
        id = docid;
      }
      console.log("Sending to backend question", formattedQuestions);
      const response = await post_question_answer(formattedQuestions, id);
      dispatch(counterSliceActions.storeTrainPrevData({})); //clear front state
      if (response.message) {
        handleSnackbarOpen("Successfully saved the questions!", "success");
        const responseforrefresh = await get_safetyTraining_CardData(
          categorytogetalltraindoc
        );
        console.log("Training data responseforrefresh:", responseforrefresh);
        dispatch(
          counterSliceActions.storeSafetyTrainingCardData(
            responseforrefresh?.doc
          )
        );
        const response = await get_safety_categories();
        console.log("safety cat response", response);

        const categoriesWithIds = response.categories.map(
          (category, index) => ({
            id: category?._id,
            name: category?.name,
            order: index + 1,
            isNew: false,
          })
        );
        // setTasks(categoriesWithIds);
        dispatch(
          counterSliceActions.storeAllSafetyCategories(categoriesWithIds)
        );
        setTimeout(() => {
          // handleCloseaddques()
          handleCloseQues();
          handleClose();
        }, 1000);
        dispatch(counterSliceActions.storeTrainingPreviewQuestionsFront({}));
      } else {
        handleSnackbarOpen(
          "Error saving questions. Please try again.",
          "error"
        );
      }
    } catch (error) {
      console.error("An error occurred while saving the questions", error);
      handleSnackbarOpen("please add questions", "error");
    }
  };

  return (
    <div className="createques">
      <div className="quesheading">
        <div className="doc-navbar">
          {/* Close Button (Left) */}
          <div className="close">
            <img
              className="close-img"
              src={arrowleft}
              alt="Close"
              onClick={handleCloseQues}
            />
          </div>

          {/* Navbar Title (Center) */}
          <div className="nav-title">
            <span>Create Questionnaire</span>
          </div>

          {/* Revision Icon + Text (Right) */}
          <div className="revision">
            {/* <img className="rv-img" src={rvimg} alt="Revision" /> */}
            <span className="revision-text">Step 2 of 2</span>
          </div>
        </div>
      </div>
      <div className="quesbody">
        <div className="quesleft">
          <div className="ques-left-heading">Add types of question</div>
          <div className="add-ques">
            <Addques
              label={"Multiple Answer Question"}
              onClick={handleAddQuestion}
            />
            <Addques
              label={"Single Answer Question"}
              onClick={handleAddQuestion}
            />
          </div>
        </div>
        <div className="createquesright">
          <span className="Your-questions">Your questions</span>
          <div className="quesright">
            {questions.map((question) => (
              <Multiquesans
                key={question.id}
                question={question}
                setQuestions={setQuestions}
                onDelete={() => handleDelete(question.id)}
                onAddOption={handleAddOption}
                onToggleCorrectOption={toggleCorrectOption}
                onDeleteOption={handleDeleteOption}
                onQuestionTypeChange={handleQuestionTypeChange} // Allow type change handling
              />
            ))}
          </div>
        </div>
      </div>
      <div className="quesfooter">
        <div className="visibility">
          <img src={visibility} alt="visibility" />
          <div className="preview" onClick={handleOpenquesPreview}>
            preview
          </div>
        </div>
        <div className="ques-btn">
          <SafetyFooter
            label="Skip Quiz"
            className="cancel-btn"
            style={{ backgroundColor: "#E8E8E8", color: "#808080" }}
            handleCloseQues={handleCloseQues}
          />
          <SafetyFooter
            label="Save & Next"
            className="save-btn"
            handleSaveAndNext={handleSaveAndNext}
            handleCloseQues={handleCloseQues}
          />
        </div>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000} // 3 seconds
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            sx={{
              width: "100%",
              zIndex: 40,
              backgroundColor: "#333333",
              display: "flex",
              alignItems: "center",
              color: "white", // Ensure text is visible
              "& .MuiAlert-icon": { color: "white" }, // Change icon color
            }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default CreateQues;
