import React, { useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom"; // Import useLocation hook
import "../maincss/card.css";
import { Navigate } from "react-router-dom";
import ellipse from "../assets/images/Ellipse 1.svg";
import imgBussiness from "../assets/images/apartment.svg";
import date from "../assets/images/date_range.svg";
import edit from "../assets/images/edit.svg";
import DropDown from "./DropDown";
import { changeHeadingName } from "../Utils/Common";
const Card = (props) => {
  const navigate = useNavigate();
  const {
    headingName,
    category,
    publishDate,
    viewedBy,
    documentNo,
    revisionNo,
    revisionDate,
    image,
    categoryId,
    fetchData,
    body,
    isquepresent,
  } = props;
  console.log("viewedBy", viewedBy);
  const location = useLocation(); // Get location object
  function handleNavigate(headingName, id) {
    if (location.pathname === "/document-management") {
      navigate({
        pathname: "/document-management/user",
        search: `?heading=${headingName}&id=${id}`,
      });
    } else {
      navigate({
        pathname: "/safety-training/user",
        search: `?heading=${headingName}&id=${id}`,
      });
    }
  }
  console.log();
  return (
    <div
      className={
        location.pathname.includes("/document-management")
          ? "full-card"
          : "full-card-safety"
      }
      style={{ width: "100%" }}
    >
      {/* Top Layer */}

      <img
        style={{ width: "100%", objectFit: "cover" }}
        src={image}
        alt="Background"
      />

      <div
        className={
          location.pathname.includes("/document-management")
            ? "doc-under-img"
            : "safety-under-img"
        }
      >
        <div className="top-most-layer">
          <div className="card-heading">
            <span style={{ textTransform: "capitalize" }}>
              {changeHeadingName(headingName)}
            </span>
          </div>
          {location.pathname === "/document-management" && (
            <DropDown id={categoryId} fetchData={fetchData} docdata={props} />
          )}
          {location.pathname === "/safety-training" && (
            <DropDown
              id={categoryId}
              fetchData={fetchData}
              isSafetyDocument={true}
              docdata={props}
              isquepresent={isquepresent}
              categoryidforalldata={category?._id}
            />
          )}
        </div>

        {/* Middle Layer */}
        <div className="middle-layer">
          {/* Category Section */}

          <div className="bussiness">
            {/* <img src={imgBussiness} alt="Business Icon" /> */}
            <span
              style={{
                color: "#333333",
                fontFamily: "Inter",
                fontWeight: "600",
                fontSize: "14px",
                lineHeight: "32px",
              }}
            >
              Category:
              <span
                style={{
                  textTransform: "capitalize",
                  color: "#808080",
                  font: "Inter",
                  fontWeight: "400",
                  fontSize: "14px",
                  lineHeight: "21px",
                }}
              >
                {" "}
                {category?.name}
              </span>
            </span>
          </div>

          {/* Publish Date Section */}

          <div className="publish-date">
            {/* <img src={date} alt="Date Icon" /> */}
            <span
              style={{
                color: "#333333",
                fontFamily: "Inter",
                fontWeight: "600",
                fontSize: "14px",
                lineHeight: "32px",
              }}
            >
              Publish Date:
              <span
                style={{
                  textTransform: "capitalize",
                  color: "#808080",
                  font: "Inter",
                  fontWeight: "400",
                  fontSize: "14px",
                  lineHeight: "21px",
                }}
              >
                {" "}
                {publishDate}
              </span>
            </span>
          </div>

          {/* Conditional Content for "/" */}
          {location.pathname === "/document-management" && (
            <>
              <div className="publish-date">
                <span
                  style={{
                    color: "#333333",
                    fontFamily: "Inter",
                    fontWeight: "600",
                    fontSize: "14px",
                    lineHeight: "32px",
                  }}
                >
                  Document No.:
                  <span
                    style={{
                      textTransform: "capitalize",
                      color: "#808080",
                      font: "Inter",
                      fontWeight: "400",
                      fontSize: "14px",
                      lineHeight: "21px",
                    }}
                  >
                    {" "}
                    {documentNo}{" "}
                  </span>
                </span>
              </div>
              <div className="publish-date">
                <span
                  style={{
                    color: "#333333",
                    fontFamily: "Inter",
                    fontWeight: "600",
                    fontSize: "14px",
                    lineHeight: "32px",
                  }}
                >
                  Revision No.:
                  <span
                    style={{
                      textTransform: "capitalize",
                      color: "#808080",
                      font: "Inter",
                      fontWeight: "400",
                      fontSize: "14px",
                      lineHeight: "21px",
                    }}
                  >
                    {" "}
                    {revisionNo}
                  </span>
                </span>
              </div>
              <div className="publish-date">
                <span
                  style={{
                    color: "#333333",
                    fontFamily: "Inter",
                    fontWeight: "600",
                    fontSize: "14px",
                    lineHeight: "32px",
                  }}
                >
                  Revision Date:{" "}
                  <span
                    style={{
                      textTransform: "capitalize",
                      color: "#808080",
                      font: "Inter",
                      fontWeight: "400",
                      fontSize: "14px",
                      lineHeight: "21px",
                    }}
                  >
                    {revisionDate}
                  </span>
                </span>
              </div>
            </>
          )}
        </div>

        {/* Lower Layer */}
        <div className="lower-most-layer">
          {/* Viewed or Completed By Section */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "20px",
                color: "#808080",
                marginRight: "4px",
              }}
            >
              {location.pathname === "/document-management"
                ? "Viewed by:"
                : "Completed by:"}
            </span>
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "20px",
                color: "#333333",
              }}
            >
              <div
                style={{
                  color: "#F04141",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={() => handleNavigate(headingName, categoryId)}
              >
                {viewedBy} Users
              </div>
            </span>
          </div>

          {/* Edit or View Section */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "20px",
                color: "#808080",
                marginLeft: "5px",
              }}
            ></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
