import { Select, MenuItem, OutlinedInput, InputAdornment } from "@mui/material";
import React from "react";

const CustomSelect = ({ label = [] }) => {
  console.log("label", label);

  return (
    <div>
      {Array.isArray(label) &&
        label.map((item, index) => (
          <Select
            key={index}
            style={{ marginRight: "5px" }}
            sx={{
              fontSize: "14px",
              padding: 0,
              height: "34px",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ECECEC",
                borderRadius: "200px",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#4F4F4F",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "1px solid #ECECEC !important",
              },
            }}
            displayEmpty
            renderValue={(selected) =>
              selected ? (
                selected
              ) : (
                <span style={{ color: "#999" }}>{item}:</span>
              )
            }
          >
            <MenuItem
              value=""
              disabled
              style={{ fontSize: "14px", color: "#999" }}
            >
              Select {item}
            </MenuItem>
            <MenuItem value="all" style={{ fontSize: "14px" }}>
              All
            </MenuItem>
            <MenuItem value="none" style={{ fontSize: "14px" }}>
              None
            </MenuItem>
          </Select>
        ))}
    </div>
  );
};

export default CustomSelect;
