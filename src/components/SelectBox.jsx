import React from "react";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import { useForm } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";

const SelectBox = ({ status, setStatus }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const data = [
    { value: "0", name: "In-Progress" },
    { value: "1", name: "Pending" },
    { value: "2", name: "Closed" },
  ];

  function handleSelectedValue(value) {
    console.log({ value });
    if (value === "0") setStatus("In-Progress");
    else if (value === "1") setStatus("Pending");
    else setStatus("Closed");
    setValue("interim", value); // Update the selected value in react-hook-form
  }

  console.log({ status });

  return (
    <Box
      sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 1 }}
    >
      <Select
        sx={{
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
        value={watch("interim") || ""}
        displayEmpty
        {...register("interim")}
        renderValue={() => status}
      >
        {data.map((item) => (
          <MenuItem
            key={item.value}
            value={item.name}
            onClick={() => handleSelectedValue(item.value)}
            style={{ fontSize: "14px" }}
          >
            {item.name}
          </MenuItem>
        ))}
      </Select>
      {errors?.interim && (
        <p style={{ color: "red" }}>{errors?.interim?.message}</p>
      )}
    </Box>
  );
};

export default SelectBox;
