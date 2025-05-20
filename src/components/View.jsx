import React, { useState, useEffect } from "react";
import Docnavbar from "./Docnavbar/Docnavbar";
import "../maincss/user_management_view.css";
import { changeText, changeDate } from "../Utils/Common";
import Joi from "joi";
import { user_management_edit } from "../api/api_calls/apiCalls";
import CircularIndeterminate from "../components/Loader";
import WhiteCircularIndeterminate from "../components/WhiteLoader";
import { Box, Select } from "@mui/material";
import pen_edit from "/src/assets/images/pen_edit.svg";
import NewSelectBox from "./NewSelectBox";
import { MenuItem } from "@mui/material";

export const UserManagementView = ({
  footerbtn,
  handleClose,
  viewUserData,
  editUserData,
  unique,
  getStaffData,
  editId,
  loader,
  setEditId,
  setEditedData,
  inputValues,
  setInputValues,
  edit,
  setEdit,
  view,
  setView,
  saveLoader,
  setSaveLoader,
  snackbar,
  setSnackBar,
  errors,
  setErrors,
  initialImage,
  formError,
  setFormError,
}) => {
  const screenWidth = window.innerWidth;
  const data = unique === "view" ? viewUserData : editUserData;
  const [image, setImage] = useState("");
  const [file, setFile] = useState();
  const [sendData, setsendData] = useState({});

  const [selectedValue, setSelectedValue] = useState("Engineer");

  const handleEditImage = (event) => {
    const file = event.target.files[0];
    const maxSize = 2 * 1024 * 1024; // 2MB limit

    if (file && file.size < maxSize) {
      setFile(file);
      setsendData({ ...sendData, imageUrl: file });

      const fileUrl = URL.createObjectURL(file);
      setImage(fileUrl);
    } else {
      setErrors({ imageUrl: "Image size should be less than 2MB" });
    }
  };

  useEffect(() => {
    setsendData(inputValues);
  }, [inputValues]);

  const handleSubmit = async () => {
    if (unique === "view") {
      setView("EDIT");
      return;
    }

    if (validateForm() && unique === "edit") {
      if (unique === "edit") {
        if (editId) {
          setSaveLoader(true);
          try {
            const formData = new FormData();
            if (file) {
              formData.append("imageUrl", file);
            }
            formData.append("firstName", sendData?.firstName);
            formData.append("lastName", sendData?.lastName);
            formData.append("designation", sendData?.designation);
            formData.append("email", sendData?.email);

            const data = await user_management_edit(formData, editId);

            setEditedData(data);
            getStaffData();
            setEdit(false);
            setView("");
            setSnackBar(true);
          } catch (error) {
            setFormError(true);
          } finally {
            setSaveLoader(false);
          }
        }
      }
    }
  };

  const schema = Joi.object({
    imageUrl: Joi.alternatives().try(
      // Option 1: If it's a file, check mimetype & size
      Joi.object()
        .instance(File)
        .custom((file, helpers) => {
          const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/jpg",
            "image/webp",
          ];
          if (!allowedTypes.includes(file.type)) {
            return helpers.message(
              "Only JPG, PNG, and WEBP files are allowed."
            );
          }
          if (file.size > 2 * 1024 * 1024) {
            return helpers.message("File size must be less than 2MB.");
          }
          return file;
        }),

      // Option 2: If it's a URL, validate URL format
      Joi.string().uri().allow("")
    ),

    firstName: Joi.string().min(2).max(30).required().messages({
      "string.empty": "First Name is required",
      "string.min": "First Name must be at least 2 characters",
      "string.max": "First Name must be at most 30 characters",
    }),

    lastName: Joi.string().min(2).max(30).required().messages({
      "string.empty": "Last Name is required",
      "string.min": "Last Name must be at least 2 characters",
    }),

    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.email": "Invalid email format",
        "string.empty": "Email is required",
      }),

    designation: Joi.string()
      .valid("Manager", "Engineer", "HR", "Admin", "Sales")
      .required()
      .messages({
        "any.only": "Invalid Designation",
        "string.empty": "Designation is required",
      }),
  });

  useEffect(() => {
    if (data) {
      const initialValues = Object.fromEntries(
        Object.entries(data).filter(
          ([key]) => !["_id", "isActive", "company"].includes(key)
        )
      );

      setInputValues(initialValues);
    }
  }, [data]);

  const handleInputChange = (key, value) => {
    let newValue = value;

    if (key === "designation") {
      newValue = value.trim();
    }

    setInputValues((prevValues) => ({
      ...prevValues,
      [key]: newValue,
    }));

    validateField(key, newValue);
  };

  const validateField = (key, value) => {
    const fieldSchema = schema.extract(key);
    if (!fieldSchema) return;

    const { error } = fieldSchema.validate(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [key]: error ? error.details[0].message : "",
    }));
  };

  const validateForm = () => {
    const filteredData = Object.fromEntries(
      Object.entries(sendData).filter(([key]) => key !== "createdAt")
    );

    const { error } = schema.validate(filteredData, {
      abortEarly: false,
    });

    if (!error) {
      setErrors({});
      return true;
    }

    const newErrors = {};
    error.details.forEach((detail) => {
      newErrors[detail.path[0]] = detail.message;
    });
    setErrors(newErrors);
    return false;
  };

  return loader ? (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <CircularIndeterminate />
    </div>
  ) : (
    <div className="main-view">
      <div>
        <Docnavbar
          heading={inputValues.firstName + " " + inputValues.lastName}
          handleClose={handleClose}
        />
        <div className="view-data">
          {data?.imageUrl && (
            <div className="view-key-values">
              {unique === "edit" ? (
                <div>
                  <img
                    onClick={() =>
                      document.getElementById("imageUpload").click()
                    }
                    style={{
                      position: "absolute",
                      zIndex: "1",
                      right: screenWidth <= 1300 ? "520px" : "420px",
                      top: screenWidth <= 1300 ? "200px" : "154px",
                    }}
                    src={pen_edit}
                    alt=""
                  />
                  <input
                    id="imageUpload"
                    onChange={(e) => handleEditImage(e)}
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    style={{
                      opacity: "0",
                      width: "0px",
                      position: "absolute",
                      zIndex: "1",
                      right: screenWidth <= 1300 ? "520px" : "400px",
                      top: screenWidth <= 1300 ? "200px" : "154px",
                    }}
                  />
                </div>
              ) : null}

              <div
                onClick={() => document.getElementById("imageUpload").click()}
                style={{
                  borderRadius: "50%",
                  backgroundImage: `url(${image || data?.imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  height: "100px",
                  width: "100px",
                  margin: "auto",
                  position: "relative",
                }}
              ></div>
            </div>
          )}
          {errors?.["imageUrl"] && (
            <span style={{ color: "red" }}>{errors?.["imageUrl"]}</span>
          )}
          {Object.entries(data || {})
            .filter(
              ([key]) =>
                !["_id", "isActive", "company", "imageUrl"].includes(key)
            )
            .map(([key, value], index) => (
              <div className="view-key-values" key={index}>
                <div
                  className={unique === "view" ? "view-key" : "view-edit-key"}
                >
                  {changeText(key)}
                </div>
                {unique === "view" ? (
                  <div className="view-value">
                    {key === "createdAt"
                      ? value
                        ? changeDate(value)
                        : "N/A"
                      : value || "N/A"}
                  </div>
                ) : (
                  <div>
                    {key === "designation" ? (
                      <Select
                        value={inputValues.designation || "Engineer"}
                        onChange={(event) =>
                          setInputValues((prevValues) => ({
                            ...prevValues,
                            designation: event.target.value,
                          }))
                        }
                        sx={{
                          width: "78%",
                          borderRadius: "8px",
                          border: "1px solid #e8e8e8",
                          color: "#333333",
                          fontFamily: "Inter",
                          fontSize: "14px",
                          background: "#ffffff",
                          fontWeight: "400",
                          textTransform: "capitalize",
                          "&:focus": {
                            outline: "none",
                          },
                        }}
                      >
                        <MenuItem value="Engineer">Engineer</MenuItem>
                        <MenuItem value="Manager">Manager</MenuItem>
                        <MenuItem value="HR">HR</MenuItem>
                        <MenuItem value="Admin">Admin</MenuItem>
                        <MenuItem value="Sales">Sales</MenuItem>
                      </Select>
                    ) : (
                      <input
                        style={{
                          borderRadius: "8px",
                          border: "1px solid #e8e8e8",
                          color: "#333333",
                          fontFamily: "Inter",
                          fontSize: "14px",
                          background: "#ffffff",
                          fontWeight: "400",
                          gap: "4px",
                          padding: "16px",
                          textTransform: "capitalize",
                        }}
                        value={
                          key === "createdAt" && inputValues[key]
                            ? changeDate(inputValues[key])
                            : inputValues[key] || ""
                        }
                        onChange={(e) => handleInputChange(key, e.target.value)}
                      />
                    )}

                    <div>
                      {errors[key] && (
                        <span style={{ color: "red" }}>{errors[key]}</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>

      <div className="view-footer">
        <button className="cancel-view" onClick={handleClose}>
          Cancel
        </button>

        <button onClick={handleSubmit}>
          {saveLoader ? (
            <Box>
              <WhiteCircularIndeterminate />
            </Box>
          ) : (
            footerbtn
          )}
        </button>
      </div>
    </div>
  );
};
