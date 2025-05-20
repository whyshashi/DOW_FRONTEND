import { Box } from "@mui/material";
import "./button.css";
import btnImg from "/src/assets/images/icon-images/plus.svg";
import WhiteCircularIndeterminate from "../WhiteLoader";

const Button = ({
  label,
  style,
  isIcon,
  onActionClick,
  handleClose,
  handleSave,
  handleOpenPreview,
  loader,
}) => {
  return (
    <button
      className="btn"
      style={{ ...style }}
      onClick={onActionClick || handleSave || handleOpenPreview || handleClose}
    >
      {isIcon && <img className="icon" src={btnImg} alt="img" />}
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

export default Button;
