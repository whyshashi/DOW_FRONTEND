import Navbar from "../Docnavbar/Docnavbar";
import Button from "../button/Button";
import "./CreateTraining.css";
import JoditEditor from "jodit-react";
import visibility from "/src/assets/images/icon-images/visibility.svg";
import {
  get_safety_categories,
  get_safetyTraining_CardData,
  post_create_training,
} from "../../api/api_calls/apiCalls";
import _ from "lodash";
import { useState, useRef, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { get_manage_categories } from "../../api/api_calls/apiCalls";
import closeimg from "../../assets/images/icon-images/close.svg";
import { counterSliceActions } from "../../redux/features/counter/CounterSlice";
import Docnavbar from "../Docnavbar/Docnavbar";
import SafetyFooter from "../SafetyFooter/SafetyFooter";
import { displayName } from "react-quill";
import Joi from "joi";
import { Snackbar, Alert } from "@mui/material";
import { useLocation } from "react-router-dom";
import btnImg from "/src/assets/images/icon-images/grey-plus.svg";
const CreateTraining = ({
  handleClose,
  handleClosePreview,
  handleOpenPreview,
  handleOpenQues,
}) => {
  // const editor = useRef(null);
  const dispatch = useDispatch();
  const [body, setContent] = useState("");
  const [selected, setSelected] = useState("");
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // ✅ Snackbar state
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [file, setFile] = useState(null); 
  const [options, setOptions] = useState(
    useSelector((state) => state?.documents?.allSafetyCategory)
  );
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categorytogetalltraindoc = searchParams.get("category");
  const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
  const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8MB
  
  const trainingSchema = Joi.object({
    title: Joi.string().min(3).max(100).required().messages({
      "string.empty": "Title is required.",
      "string.min": "Title must be at least 3 characters long.",
      "string.max": "Title cannot exceed 100 characters.",
    }),
    category: Joi.string().required().messages({
      "string.empty": "Please select a category.",
    }),
    body: Joi.string().min(17).required().messages({
      "string.empty": "Body is required.",
      "string.min": "Body must be at least 10 characters long.",
    }),
    imageUrl: Joi.alternatives()
      .try(Joi.object(), Joi.string().uri())
      .required()
      .messages({
        "any.required": "Cover image is required",
        "alternatives.types": "Cover image is required",
      }),
    file: Joi.alternatives()
    .try(Joi.object(), Joi.string().uri(), Joi.allow(null, "")) 
      .optional()
      .messages({
        "alternatives.types": "Invalid file format",
      }),
  });
  
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typing...",
      minHeight: 436,
      // maxheight:581,
      buttons:
        "font,|,fontsize,|,bold,underline,italic,|,link,|,file,|,align,|,ol,|,eraser,|",
      editorCssClass: "alic",
      enter: "P",
      toolbarAdaptive: false,
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
      spellcheck: true,
      pastePlain: false, // ✅ Allows HTML content when pasting
      allowPasteFromWord: true, // ✅ Enables pasting formatted text from Word
      pasteFromWordRemoveFontStyles: false, // ✅ Keeps original font styles
      pasteFromWordKeepFormatting: true, // ✅ Maintains structure
      defaultActionOnPaste: "insert_clear_html",
      events: {
        afterInit: (editor) => {
          editor.e.on("mousedown", (event) => {
            const target = event.target;
            if (target.tagName === "UL") {
              if (event.ctrlKey) {
                target.setAttribute("data-list", "circle"); // CTRL + Click → Circle
              } else if (event.shiftKey) {
                target.setAttribute("data-list", "square"); // SHIFT + Click → Square
              }
            }
            if (target.tagName === "OL") {
              if (event.ctrlKey) {
                target.setAttribute("data-list", "lower-roman"); // CTRL + Click → Lower Roman
              } else if (event.shiftKey) {
                target.setAttribute("data-list", "upper-roman"); // SHIFT + Click → Upper Roman
              }
            }
          });
        },
      },
    }),
    []
  );
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > MAX_IMAGE_SIZE) {
        setSnackbarMessage("Image size exceeds 5MB limit");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }
  
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview); // Revoke previous object URL
      }
  
      const imageUrl = URL.createObjectURL(file);
      setImage(file);
      setImagePreview(imageUrl);
  
      // Remove validation error for image
      setErrors((prevErrors) => ({
        ...prevErrors,
        imageUrl: "",
      }));
    }
  };
  
 // Store the uploaded file
 const handleFileUpload = (event) => {
  const selectedFile = event.target.files[0];
  if (selectedFile) {
    if (selectedFile.size > MAX_FILE_SIZE) {
      setSnackbarMessage("File size exceeds 8MB limit");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    setFile(selectedFile);
  }
};

  const handleRemoveFile = () => {
    setFile(null); // Remove the file from state
    document.getElementById("fileUpload").value = ""; // Reset the file input
  };
  const fetchCategories = async () => {
    try {
      const response = await get_safety_categories();
      dispatch(
        counterSliceActions.storeAllDocumentCategories(response?.categories)
      );
      setOptions(response.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const handleRemoveImage = (event) => {
    event.stopPropagation();
    event.preventDefault(); // Prevent triggering input click event
    setImage(null);
    setImagePreview(null);

    // Reset the file input field
    const fileInput = document.getElementById("imageUpload");
    if (fileInput) {
      fileInput.value = ""; // Reset the input value
    }
  };

  const trainpreviewfrontend = {
    title,
    body,
  };
  dispatch(counterSliceActions.storeTrainPrevData(trainpreviewfrontend));
  const handleSave = async () => {
    setErrors({});
    const selectedCategory = options.find((option) => option.name === selected)?._id;
  
    // Check if files exceed size limits before submission
    if (image && image.size > MAX_IMAGE_SIZE) {
      setSnackbarMessage("Image size exceeds 5MB limit");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
  
    if (file && file.size > MAX_FILE_SIZE) {
      setSnackbarMessage("File size exceeds 8MB limit");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
  
    const formData = {
      title,
      category: selected || "",
      body,
      imageUrl: image,
      file: file || null, // ✅ Allow null value
    };
  
    const { error } = trainingSchema.validate(formData, { abortEarly: false });
  
    if (error) {
      const validationErrors = error.details.reduce((acc, curr) => {
        acc[curr.path[0]] = curr.message;
        return acc;
      }, {});
  
      setErrors(validationErrors);
      setSnackbarMessage("Validation Error: " + error.details[0].message);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
  
    try {
      setIsLoading(true);
      const requestData = new FormData();
      requestData.append("imageUrl", image);
      requestData.append("body", body);
      requestData.append("title", title);
      requestData.append("category", selectedCategory || "");
  
      if (file) requestData.append("file", file); // ✅ Only append if file is selected
  
      console.log("Sending to backend", requestData);
      const response = await post_create_training(requestData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      console.log("Training data response:", response);
      localStorage.setItem("trainingId", response.trainingId);
      const responseforrefresh = await get_safetyTraining_CardData(categorytogetalltraindoc);
      dispatch(counterSliceActions.storeSafetyTrainingCardData(responseforrefresh?.doc));
  
      setSnackbarMessage(response.message === "new training saved"
        ? "Document saved successfully!"
        : "Error saving document: " + response.message);
      
      setSnackbarSeverity(response.message === "new training saved" ? "success" : "error");
      setSnackbarOpen(true);
      setTimeout(() => {
        handleOpenQues();
      }, 1000);
      dispatch(counterSliceActions.storeTrainingPreviewQuestionsBackend({}));
    } catch (error) {
      setSnackbarMessage("Error saving data: " + error.message);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false);
    }
  };
  
  
  const handleChange = (event) => {
    const value = event.target.value;
    if (options.some((option) => option.name === value)) {
      // Check if value exists in options
      setSelected(value);
    } else {
      setSelected(""); // Reset if invalid
    }
  };

  const handleCancel = () => {
    // dispatch(counterSliceActions.storeTrainingPreviewData({}));
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  useEffect(() => {
    if (options.length > 0 && !selected) {
      setSelected(options[0].name); // ✅ Set the first category by default for new documents
    }
  }, [options, selected, dispatch]);
  useEffect(() => {
    if (options.length > 0) {
      setSelected(options[0].name); // ✅ Set the first category by default for new documents
    }
  }, []);
  console.log("selected cate in train initial", selected);
  return (
    <div className="create-training">
      <div>
        <div className="doc-navbar">
          {/* Close Button (Left) */}
          <div className="close" onClick={handleClose}>
            <img className="close-img" src={closeimg} alt="Close" />
          </div>
          {/* Navbar Title (Center) */}
          <div className="nav-title">
            <span>Create safety training</span>
          </div>
          {/* Revision Icon + Text (Right) */}
          <div
            style={{
              fontFamily: "Inter",
              fontWeight: "500",
              fontSize: "14px",
              lineHeight: "20px",
              color: "#808080",
              cursor: "pointer",
            }}
            // onClick={}
          >
            step-1 of 2
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div className="doc-navabr-border"></div>
          <div className="doc-navabr-border-grey"></div>
        </div>
        <div className="create-train-container">
          {/* Document Info */}
          <div className="create-train-info">
            <div className="select-category">
              <label>Select Category</label>
              <select value={selected} onChange={handleChange}>
                {/* <option value="" disabled>
                  {selected || "Select Category"}
                </option> */}
                {options.map((option, index) => (
                  <option key={index} value={option.name}>
                    {_.capitalize(option.name)}
                  </option>
                ))}
              </select>
              {errors.category && <p className="error">{errors.category}</p>}
            </div>
            <div className="upload-imgt">
              <p className="upload-imgt-text">Cover Image</p>
              <div
                className="cover-img"
                onClick={() => document.getElementById("imageUpload").click()}
              >
                {/* {image ? (
                  <>
                    <img
                      src={image}
                      alt="Cover Preview"
                      className="cover-preview"
                    />
                    <span className="remove-icon" onClick={handleRemoveImage}>
                      &times;
                    </span>
                  </>
                ) : (
                  <div className="add-cover-placeholder">
                    <div className="plus-i-train">+</div>
                    <div>Add Cover Image</div>
                  </div>
                )} */}
                {imagePreview ? (
                  <>
                    <img
                      src={imagePreview} // ✅ Use the preview URL
                      alt="Cover Preview"
                      className="cover-preview"
                    />
                    <span className="remove-icon" onClick={handleRemoveImage}>
                      &times;
                    </span>
                  </>
                ) : (
                  <div className="add-cover-placeholder">
                    <div className="plus-i-train">+</div>
                    <div>Add Cover Image</div>
                  </div>
                )}
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />
              </div>
              {errors.imageUrl && <p className="error">{errors.imageUrl}</p>}
            </div>
          </div>
          <div className="body">
            {/* Document Title */}
            <div className="create-train-title">
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && <p className="error">{errors.title}</p>}
            </div>
            {/* Document Body */}
            <div className="create-train-body">
              <div className="create-doc-body-heading">
                <p>body</p>
                <div style={{ justifyContent: "flex-end" }}>
                  <div
                    className="add-file"
                    onClick={() =>
                      document.getElementById("fileUpload").click()
                    }
                  >
                    <img
                      className="btnimg"
                      style={{ width: "15px", height: "19px" }}
                      src={btnImg}
                      alt="img"
                    />
                    <div>Add file</div>
                  </div>
                  {file && (
                    <div className="file-preview">
                      <p>Selected file: {file.name}</p>
                      <button
                        className="remove-file-btn"
                        onClick={handleRemoveFile}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  id="fileUpload"
                  style={{ display: "none" }}
                  onChange={handleFileUpload}
                />
              </div>

              <div className="create-doc-body-text">
                <div className="text-editor">
                  <JoditEditor
                    value={body}
                    config={config}
                    onBlur={(newContent) => setContent(newContent)}
                  />
                </div>
                {errors.body && <p className="error">{errors.body}</p>}
              </div>
            </div>
          </div>
          {/* Footer Buttons */}
        </div>
      </div>
      <div className="create-train-footer">
        <div className="visibility">
          <img src={visibility}></img>
          <div className="preview" onClick={handleOpenPreview}>
            preview
          </div>
        </div>
        <div className="safety-footer-btn">
          <SafetyFooter
            label="Cancel"
            className="cancel-btn"
            style={{ backgroundColor: "#E8E8E8", color: "#808080" }}
            handleClose={handleClose}
            handleCancel={handleCancel}
          />
          <SafetyFooter
            label="Save & Next"
            className="save-btn"
            handleOpenQues={handleOpenQues}
            handleSave={handleSave}
            handleClose={handleClose}
            loader={isLoading}
          />
        </div>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000} // Closes after 3 seconds
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }} // Positioning
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity={snackbarSeverity} // ✅ Dynamic severity (success/error)
            sx={{
              width: "100%",
              zIndex: 40,
              backgroundColor:
                snackbarSeverity === "error" ? "#D32F2F" : "#333333", // ✅ Red for errors, dark for success
              display: "flex",
              alignItems: "center",
              color: "white",
              "& .MuiAlert-icon": { color: "white" },
            }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};
export default CreateTraining;
