import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import { useForm } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const NewSelectBox = ({ data, keyProp, selectedValue, onSelect, title }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const userYear = search.get("users");
  const incidentYear = search.get("incident_reporting");
  return (
    <>
      <Box sx={{ borderRadius: "10px" }}>
        <Select
          value={selectedValue}
          onChange={(e) => onSelect(e.target.value)}
          sx={{
            borderRadius: "20px",
            fontSize: "14px",
            padding: 0,
            height: "34px",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#CED4DA",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#4F4F4F",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "1px solid #CED4DA !important",
            },
          }}
          // {...register("interim", { required: "Class is required" })}
          input={
            <OutlinedInput
              startAdornment={
                <InputAdornment position="start">
                  <span
                    style={{
                      padding: "8px 0px 8px 15px",
                      //   marginRight: "8px",
                      height: "34px",
                      boxSizing: "border-box",
                      display: "flex",
                      //   minWidth: "75px",
                      fontSize: "14px",
                      //   borderRight: "1px solid #CED4DA",
                      color: "#4F4F4F",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    {keyProp}:
                  </span>
                </InputAdornment>
              }
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            />
          }
          renderValue={(selected) => {
            if (typeof selectedValue === "object") {
              const value =
                title === "Incident Reporting"
                  ? incidentYear || "2025"
                  : userYear || "2025";
              return value;
            } else {
              return selected;
            }
          }}
          displayEmpty
        >
          {data?.map((item) => (
            <MenuItem
              key={item.value}
              value={item.value}
              style={{ fontSize: "14px" }}
            >
              {item.name}
            </MenuItem>
          ))}
        </Select>
        {errors?.interim && errorText(errors?.interim?.message)}
      </Box>
    </>
  );
};

export default NewSelectBox;
