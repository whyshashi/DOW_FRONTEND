import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// Function to style selected item
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      name === personName
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
  };
}

export default function MultipleSelectPlaceholder({
  names = [],
  page,
  setPage,
}) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const searchPage = new URLSearchParams(location.search);
  const currPage = searchPage.get("page");
  console.log({ currPage });
  console.log(location?.search?.includes("page"));
  const handleChange = (event) => {
    const newPage = event.target.value;
    setPage(newPage);
    if (location.search) {
      if (location?.search?.includes("page")) {
        searchPage.set("page", newPage);
        navigate(`${location.pathname}?${searchPage.toString()}`);
      } else {
        navigate(`${location.pathname}${location?.search}&page=${newPage}`);
      }
    } else {
      navigate(`${location.pathname}?page=${newPage}`);
    }
  };

  return (
    <div>
      <FormControl
        sx={{
          m: 1,
          width: 80,
          mt: 1,
          p: 0,
        }}
      >
        <Select
          value={page}
          displayEmpty
          onChange={handleChange}
          input={
            <OutlinedInput
              sx={{
                color: "#5F5F61",
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: 14,
                border: "1px solid #E6E6E6",
                background: "#FFFFFF",
                borderRadius: "6px",
                height: "45px",
                // width: "75px",
              }}
            />
          }
          renderValue={() => <em>{currPage ? currPage : 1}</em>}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
        >
          {names?.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, page, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
