import JoditEditor from "jodit-react";
import _ from "lodash";
import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  get_documentManagement_safetyPrototol_CardData,
  get_manage_categories,
  post_create_doc,
  search_data,
  update_document,
} from "../../api/api_calls/apiCalls";
import { counterSliceActions } from "../../redux/features/counter/CounterSlice";
import Docnavbar from "../Docnavbar/Docnavbar";
import Button from "../button/Button";
// import _ from "lodash";
import axios from "axios";
import "./CreateDoc.css";
import visibility from "/src/assets/images/icon-images/visibility.svg";
import { string } from "joi";
import Joi from "joi";
import { Snackbar, Alert } from "@mui/material";
import { useLocation } from "react-router-dom";
import btnImg from "/src/assets/images/icon-images/grey-plus.svg";
const CreateDoc = ({
  handleClose,
  handleClosePreview,
  handleOpenPreview,
  docdata,
  isedit,
  docid,
}) => {
  const dispatch = useDispatch();
  const [body, setContent] = useState(docdata?.body || "");
  const [selected, setSelected] = useState(docdata?.category?.name || "");
  const [image, setImage] = useState(docdata?.image || null);
  const [title, setTitle] = useState(docdata?.headingName || "");
  const [documentNo, setDocumentNo] = useState(docdata?.documentNo || "");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const isEditing = !!docdata; // Check if it's an edit mode
  const documentManagementData = useSelector(
    (state) => state?.documents?.documentManagementData || []
  );
  console.log("documentManagementData for refresh", documentManagementData);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categorytogetalldoc = searchParams.get("category");
  // safety protocol
  //validations
  const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
  const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8MB

  const schema = Joi.object({
    documentNo: Joi.string().min(2).required().messages({
      "string.empty": "Document Number is required",
    }),
    title: Joi.string().min(3).max(100).required().messages({
      "string.empty": "Title is required",
      "string.min": "Title must be at least 3 characters long",
      "string.max": "Title must be at most 100 characters long",
    }),
    category: Joi.string().required().messages({
      "string.empty": "Category selection is required",
    }),
    body: Joi.string().min(17).required().messages({
      "string.empty": "Body content is required",
      "string.min": "Body must be at least 10 characters long",
    }),
    imageUrl: Joi.alternatives()
      .try(
        Joi.string().uri().messages({
          "string.uri": "Cover image must be a valid URL",
        }), // Accepts URL
        Joi.object().custom((file, helpers) => {
          if (!(file instanceof File)) {
            return helpers.error("any.invalid");
          }
          if (file.size > MAX_IMAGE_SIZE) {
            return helpers.error("file.maxSize");
          }
          if (
            !["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
              file.type
            )
          ) {
            return helpers.error("file.invalidType");
          }
          return file;
        }, "Image File Validation")
      )
      .messages({
        "string.empty": "Cover image is required",
        "any.invalid": "Cover image must be a valid file or URL",
        "file.maxSize": `Image file size should not exceed ${
          MAX_IMAGE_SIZE / (1024 * 1024)
        }MB`,
        "file.invalidType":
          "Only JPEG, PNG, JPG, and WEBP image formats are allowed",
      }),

    file: Joi.object()
      .custom((file, helpers) => {
        if (!(file instanceof File)) {
          return helpers.error("any.invalid");
        }
        if (file.size > MAX_FILE_SIZE) {
          return helpers.error("file.maxSize");
        }
        return file;
      }, "File Validation")
      .messages({
        "any.invalid": "Uploaded document must be a valid file",
        "file.maxSize": "File size should not exceed 8MB",
      }),
  });

  console.log("selected cate initial in doc is", selected);
  console.log("this is doceditdata", docdata);
  const options =
    useSelector((state) => state?.documents?.allDocumentCategory) || [];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      if (file.size > MAX_IMAGE_SIZE) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          imageUrl: "Image size must not exceed 5MB",
        }));
        setSnackbarMessage("Image size must not exceed 5MB!");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }

      setImage(file);
      setImagePreview(URL.createObjectURL(file));

      setErrors((prevErrors) => ({
        ...prevErrors,
        imageUrl: "",
      }));
    }
  };

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typing...",
      minHeight: 470,
      // minHeight: 456,
      buttons:
        "font,|,fontsize,|,bold,underline,italic,|,link,|,file,|,align,|,ol,|,eraser,|",
      editorCssClass: "alic",
      enter: "P",
      toolbarAdaptive: false,
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
      spellcheck: true,
      events: {
        afterInit: (editor) => {
          editor.e.on("mousedown", (event) => {
            const target = event.target;
            if (target.tagName === "UL") {
              if (event.ctrlKey) {
                target.setAttribute("data-list", "circle");
              } else if (event.shiftKey) {
                target.setAttribute("data-list", "square");
              }
            }
            if (target.tagName === "OL") {
              if (event.ctrlKey) {
                target.setAttribute("data-list", "lower-roman");
              } else if (event.shiftKey) {
                target.setAttribute("data-list", "upper-roman");
              }
            }
          });
        },
      },
    }),
    []
  );
  const handleChange = (event) => {
    setSelected(event.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      category: "",
    }));
  };

  const handleRemoveImage = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setImage(null);
    setImagePreview(null);
    const fileInput = document.getElementById("imageUpload");
    if (fileInput) {
      fileInput.value = ""; // Reset input so the same file can be selected again
    }
  };

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      if (selectedFile.size > MAX_FILE_SIZE) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          file: "File size must not exceed 8MB",
        }));
        setSnackbarMessage("File size must not exceed 8MB!");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }

      setFile(selectedFile);

      setErrors((prevErrors) => ({
        ...prevErrors,
        file: "",
      }));
    }
  };

  const handleRemoveFile = () => {
    setFile(null); // Remove the file from state
    document.getElementById("fileUpload").value = ""; // Reset the file input
  };
  const fetchCategories = useCallback(async () => {
    try {
      const response = await get_manage_categories();
      dispatch(
        counterSliceActions.storeAllDocumentCategories(response?.categories)
      );
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, [dispatch]);
  //sending the data from frontend for preview only not saved till now
  const docpreviewfrontend = {
    title,
    body,
  };
  useEffect(() => {
    dispatch(counterSliceActions.storeDocPrevData(docpreviewfrontend));
  }, [title, body]);
  const handleSave = async () => {
    const latestBody = body.trim();
    const selectedCategory = options.find(
      (option) => option.name === selected
    )?._id;

    const data = {
      title,
      documentNo,
      category: selectedCategory || "",
      body: latestBody,
      imageUrl: image instanceof File ? image : image || "",
      file: file || undefined,
    };

    // Validate inputs
    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
      const formattedErrors = {};
      error.details.forEach((err) => {
        formattedErrors[err.path[0]] = err.message;
      });

      setErrors(formattedErrors);
      setSnackbarMessage("Please fix the validation errors!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    if (!selectedCategory) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        category: "Category selection is required",
      }));
      setSnackbarMessage("Please select a category!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    setErrors({});

    // Prepare FormData
    const formData = new FormData();
    if (!isedit) {
      formData.append("imageUrl", image);
    } else {
      if (typeof image === "string") {
        try {
          const file = undefined;
        } catch (err) {
          console.error("Error processing the image:", err);
          setSnackbarMessage("Error processing the image!");
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
          return;
        }
      } else {
        formData.append("imageUrl", image);
      }
    }

    formData.append("body", latestBody);
    formData.append("title", title);
    formData.append("documentNo", documentNo);
    formData.append("category", selectedCategory || "");
    if (file) formData.append("file", file);

    try {
      let response;
      setIsLoading(true);

      if (isedit) {
        if (!docid) {
          throw new Error("Document ID is missing for update.");
        }
        response = await update_document(docid, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setSnackbarMessage("Document updated successfully!");
      } else {
        response = await post_create_doc(formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        dispatch(
          counterSliceActions.storeDocumentPreviewData(response.document)
        );
        setSnackbarMessage("Document saved successfully!");
      }

      // Fetch updated documents
      const getalldoc = await get_documentManagement_safetyPrototol_CardData(
        categorytogetalldoc
      );
      dispatch(
        counterSliceActions.storeDocumentManagementData(
          getalldoc?.documents || []
        )
      );

      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      setTimeout(() => {
        handleOpenPreview();
        handleClose();
      }, 1500);
    } catch (error) {
      console.error("Error while saving document:", error);
      setSnackbarMessage(error.message || "An error occurred while saving.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);
  // console.log("imagePreview", imagePreview);
  // useEffect(() => {
  //   if (!isEditing && options.length > 0 && !selected) {
  //     setSelected(options[0].name); // ✅ Set the first category by default for new documents
  //   }
  // }, [options, isEditing, selected]);
  useEffect(() => {
    if (options.length > 0) {
      setSelected(options[0].name); // ✅ Set the first category by default for new documents
    }
  }, []);
  return (
    <div className="create-doc">
      <Docnavbar
        heading={isedit === true ? "Edit Document" : "Create New Document"}
        rightText={`Revision no. ${docdata?.revisionNo || "1"}`}
        handleClose={handleClose}
      />
      <div className="create-doc-container">
        <div className="doc-info">
          <div className="create-doc-info">
            <div className="left-info">
              <div className="create-doc-no">
                <label>Document No</label>
                <input
                  type="text"
                  value={documentNo}
                  onChange={(e) => {
                    setDocumentNo(e.target.value);
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      documentNo: "",
                    }));
                  }}
                />
                {errors.documentNo && (
                  <p className="error">{errors.documentNo}</p>
                )}
              </div>
              <div className="doc-select-category">
                <label>Select Category</label>
                <select
                  value={selected}
                  onChange={handleChange}
                  className="doc-select-category-input-text"
                >
                  {options.map((option, index) => (
                    <option key={index} value={option.name}>
                      {_.capitalize(option.name)}
                    </option>
                  ))}
                </select>
                {errors.category && <p className="error">{errors.category}</p>}
              </div>
            </div>
          </div>
          <div className="upload-img">
            <p className="upload-img-text">Cover Image</p>
            <div
              className="cover-img"
              onClick={() => document.getElementById("imageUpload").click()}
            >
              {imagePreview || typeof image === "string" ? (
                <>
                  <img
                    src={imagePreview || image} // ✅ Correct image source
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
        <div className="create-doc-title">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setErrors((prevErrors) => ({
                ...prevErrors,
                title: "",
              }));
            }}
          />
          {errors.title && <p className="error">{errors.title}</p>}
        </div>
        <div className="create-doc-body">
          <div className="create-doc-body-heading">
            <p>body</p>
            <div style={{ justifyContent: "flex-end" }}>
              <div
                className="add-file"
                onClick={() => document.getElementById("fileUpload").click()}
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
                // onBlur={(newContent) => setContent(newContent)}
                onBlur={(newContent) => {
                  setContent(newContent);

                  // Remove validation error when body length meets the condition
                  if (newContent.trim().length >= 17) {
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      body: "",
                    }));
                  }
                }}
              />
              {errors.body && <p className="error">{errors.body}</p>}
            </div>
          </div>
        </div>
        <div className="create-doc-footer">
          <div className="visibility">
            <img src={visibility}></img>
            <div className="preview" onClick={handleOpenPreview}>
              preview
            </div>
          </div>
          <div className="footer-btn-doc">
            <Button
              label="Cancel"
              className="cancel-btn"
              style={{ backgroundColor: "#E8E8E8", color: "#808080" }}
              handleClose={handleClose}
            />
            <Button
              label="Save"
              className="save-btn"
              handleSave={handleSave}
              handleOpenPreview={handleOpenPreview}
              loader={isLoading}
            />
          </div>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert
              onClose={handleSnackbarClose}
              severity={snackbarSeverity}
              sx={{
                width: "100%",
                zIndex: 40,
                backgroundColor:
                  snackbarSeverity === "error" ? "#D32F2F" : "#333333", // Red for errors
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
    </div>
  );
};
export default CreateDoc;
