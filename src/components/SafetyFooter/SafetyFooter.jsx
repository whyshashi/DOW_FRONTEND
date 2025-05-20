import React from "react";
import "./SafetyFooter.css";
import visibility from "/src/assets/images/icon-images/visibility.svg";
import { Box } from "@mui/material";
import WhiteCircularIndeterminate from "../WhiteLoader";

const SafetyFooter = ({
  label,
  style,
  isIcon,
  onActionClick,
  handleClose,
  handleSave,
  handleOpenQues,
  handleCloseQues,
  handleCloseManage,
  handleSaveAndNext,
  handleCancel,
  loader,
}) => {
  {
    console.log("the save funtion", handleSaveAndNext);
  }
  return (
    <button
      className="btn"
      style={{ ...style }}
      onClick={
        onActionClick ||
        handleSave ||
        handleCloseManage ||
        handleClose ||
        handleSaveAndNext ||
        handleOpenQues ||
        handleCancel ||
        handleCloseQues
      }
    >
      {isIcon && <img className="icon" src={visibility} alt="img" />}
      {loader ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <WhiteCircularIndeterminate size={10} />
        </Box>
      ) : (
        label
      )}
    </button>
  );
};
export default SafetyFooter;
