import React, { useEffect } from "react";
import MultipleSelectPlaceholder from "../components/PaginationSelect";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const Pagination = ({ pages }) => {
  console.log(pages, "pages are here");
  const names = [];
  for (let i = 0; i < pages; i++) {
    names.push(i + 1);
  }

  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  function handlePrevious() {
    console.log("previous clicked");
    if (page > 1) {
      setPage((prev) => prev - 1); // Decrement the page

      // Update the URL
      const searchPage = new URLSearchParams(location.search);
      searchPage.set("page", page - 1); // Use current page - 1

      navigate(`${location.pathname}?${searchPage.toString()}`);
    } else {
      setPage(1); // Ensure page doesn't go below 1
    }
  }

  function handleNext() {
    console.log("next clicked");
    if (page < names.length) {
      // Assuming `names.length` is the last page
      setPage((prev) => prev + 1); // Increment the page

      // Update the URL
      const searchPage = new URLSearchParams(location.search);
      searchPage.set("page", page + 1); // Use current page + 1

      navigate(`${location.pathname}?${searchPage.toString()}`);
    }
  }

  useEffect(() => {
    setPage(1);
  }, [location.pathname]);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "right",
        float: "right",
        marginRight: "2vw",
      }}
    >
      <button
        style={
          page === 1
            ? {
                color: "#E6E6E6",
                cursor: "pointer",
                background: "#FFFFFF",
                border: "1px solid #E6E6E6",
                gap: "10px",
                padding: "8px",
                borderRadius: "6px",
              }
            : {
                color: "#5F5F61",
                background: "#FFFFFF",
                border: "1px solid #E6E6E6",
                gap: "10px",
                padding: "8px",
                borderRadius: "6px",
                cursor: "pointer",
              }
        }
        onClick={() => handlePrevious()}
      >
        <ArrowBackIcon />
      </button>
      <MultipleSelectPlaceholder names={names} page={page} setPage={setPage} />
      <button
        style={
          page === names.length
            ? {
                color: "#E6E6E6",
                cursor: "pointer",
                background: "#FFFFFF",
                border: "1px solid #E6E6E6",
                gap: "10px",
                padding: "8px",
                borderRadius: "6px",
              }
            : {
                color: "#5F5F61",
                background: "#FFFFFF",
                border: "1px solid #E6E6E6",
                gap: "10px",
                padding: "8px",
                borderRadius: "6px",
                cursor: "pointer",
              }
        }
        onClick={() => handleNext()}
      >
        <ArrowForwardIcon />
      </button>
    </div>
  );
};

export default Pagination;
