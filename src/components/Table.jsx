import React, { Fragment, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../maincss/table.css";
import { changeText, changeDate } from "../Utils/Common";
import CircleIcon from "@mui/icons-material/Circle";
import { changeDesc } from "../Utils/Common";
import { changeRaisedBy } from "../Utils/Common";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Tooltip } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  colors,
} from "@mui/material";
import { useSelector } from "react-redux";
import { AirlineSeatReclineNormalTwoTone } from "@mui/icons-material";
import { size } from "lodash";
import { useEffect } from "react";

const MuiTable = ({
  pageName,
  headerData,
  handleView,
  handleEdit,
  incidata,
  DocTableUserData,
}) => {
  const [asc, setAsc] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [rowData, setRowData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, order: "asc" });
  console.log({ incidata });
  console.log(DocTableUserData);

  const userData = useSelector(
    (state) => state.documents?.userManagementSearchData || []
  );

  useEffect(() => {
    let updatedData = [];

    if (location.pathname === "/incident-reporting") {
      updatedData = Array.isArray(incidata) ? incidata : [];
    } else if (location.pathname === "/user-management") {
      updatedData = Array.isArray(userData) ? userData : [];
    } else if (location.pathname.includes("/document-management")) {
      updatedData = Array.isArray(DocTableUserData) ? DocTableUserData : [];
    }

    setRowData(updatedData);
  }, [location.pathname, incidata, userData, DocTableUserData]);

  console.log({ rowData });

  function handleSort(key) {
    let newOrder = "asc";

    // If clicking the same column, toggle order
    if (sortConfig.key === key && sortConfig.order === "asc") {
      newOrder = "desc";
    } else if (sortConfig.key === key && sortConfig.order === "desc") {
      newOrder = "asc";
    }

    setSortConfig({ key, order: newOrder });

    const sortedData = [...rowData].sort((a, b) => {
      if (key === "createdAt") {
        return newOrder === "asc"
          ? new Date(a[key]) - new Date(b[key])
          : new Date(b[key]) - new Date(a[key]);
      }

      if (typeof a[key] === "string" && key !== "riskLevel") {
        return newOrder === "asc"
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      }

      if (key === "riskLevel") {
        const priority = { severe: 3, high: 2, moderate: 1 };
        return newOrder === "asc"
          ? (priority[a.riskLevel] || 0) - (priority[b.riskLevel] || 0)
          : (priority[b.riskLevel] || 0) - (priority[a.riskLevel] || 0);
      }

      // if (key === "incidentStatus") {
      //   const priority = { closed: 3, "In-progress": 2, pending: 1 };
      //   return newOrder === "asc"
      //     ? (priority[a.incidentStatus] || 0) -
      //         (priority[b.incidentStatus] || 0)
      //     : (priority[b.incidentStatus] || 0) -
      //         (priority[a.incidentStatus] || 0);
      // }

      return newOrder === "asc" ? a[key] - b[key] : b[key] - a[key];
    });

    setRowData(sortedData);
  }

  const handleIncidentData = (id, number) => {
    navigate(`IncidentID?incidentID=${id}&number=${number}`);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        "&.MuiTableContainer-root": { borderRadius: "20px !important" },
      }}
    >
      <Table
        sx={{
          border: "1px solid #ececec",
        }}
      >
        <TableHead
          sx={{
            backgroundColor: "#f8f8f8",
            fontFamily: "Inter",
            fontSize: "1.03rem",
          }}
        >
          <TableRow>
            {headerData
              ?.filter(
                (key) =>
                  !["_id", "isActive", "company", "imageUrl"].includes(key)
              )
              ?.map((header, index) => (
                <TableCell key={index}>
                  {[
                    "riskLevel",
                    "createdAt",
                    "reportedBy",
                    "incidentStatus",
                    "firstName",
                    "lastName",
                    "updatedAt",
                  ]
                    .map((h) => h.toLowerCase().trim()) // Normalize the list
                    .includes(header.toLowerCase().trim()) ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {changeText(header)}
                      {console.log(header, "inside here")}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          gap: "0px",
                        }}
                      >
                        <ArrowDropUpIcon
                          onClick={() => handleSort(header)}
                          sx={{
                            cursor: "pointer",
                            marginBottom: "-11px",
                            color:
                              sortConfig.key === header &&
                              sortConfig.order === "asc"
                                ? "#f04141"
                                : "#5F5F61",
                            fontSize: "32px !important",
                          }}
                        />
                        <ArrowDropDownIcon
                          onClick={() => handleSort(header)}
                          sx={{
                            cursor: "pointer",
                            marginTop: "-11px",
                            color:
                              sortConfig.key === header &&
                              sortConfig.order === "desc"
                                ? "#f04141"
                                : "#5F5F61",
                            fontSize: "32px !important",
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      {console.log(header, "Deepanshu")}
                      <div
                        style={{
                          display: "flex !important",
                          alignItems: "center !important",
                          textTransform: "capitalize !important",
                          fontFamily: "Inter !important",
                          fontWeight: "500 !important",
                          fontSize: "14px !important",
                          lineHeight: "20px !important",
                        }}
                      >
                        {changeText(header)}
                      </div>
                    </>
                  )}
                </TableCell>
              ))}
            {location.pathname.includes("/user-management") && (
              <TableCell
                style={{
                  fontFamily: "Inter",
                  fontWeight: "500",
                  fontSize: "14px",
                  lineHeight: "20px",
                  color: "#333333",
                }}
              >
                Action
              </TableCell>
            )}
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {rowData?.map((row, rowIndex) => (
            <TableRow
              style={{ cursor: "pointer" }}
              key={rowIndex}
              onClick={() =>
                pageName === "incident" &&
                handleIncidentData(row?._id, row?.incidentId)
              }
            >
              {headerData
                ?.filter((item) => !["_id", "imageUrl"]?.includes(item))
                ?.map((key, cellIndex) => (
                  <TableCell key={cellIndex}>
                    {key === "createdAt" ? (
                      changeDate(row[key])
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        {key === "riskLevel" && (
                          <CircleIcon
                            sx={{
                              fontSize: "0.5rem",
                              color:
                                row[key] === "High"
                                  ? "#F69800"
                                  : row[key] === "Severe"
                                  ? "#E73F3F"
                                  : row[key] === "Moderate"
                                  ? "#00B473"
                                  : "inherit",
                            }}
                          />
                        )}

                        <span
                          style={{
                            color:
                              key === "riskLevel"
                                ? row[key] === "High"
                                  ? "#F69800"
                                  : row[key] === "Severe"
                                  ? "#E73F3F"
                                  : row[key] === "Moderate"
                                  ? "#00B473"
                                  : "inherit"
                                : "inherit",
                          }}
                        >
                          {key !== "incidentStatus" &&
                            key !== "description" &&
                            key !== "actionTaken" &&
                            key !== "reportedBy" &&
                            key !== "firstName" &&
                            (row[key] || "N/A")}
                        </span>

                        {(key === "description" || key === "actionTaken") && (
                          <Tooltip
                            sx={{
                              textTransform: "capitalize",
                              fontFamily: "Inter",
                            }}
                            title={row[key]}
                          >
                            {changeDesc(row[key])}
                          </Tooltip>
                        )}
                        {key === "reportedBy" &&
                          changeRaisedBy(row[key].firstName, row[key].lastName)}

                        {key === "incidentStatus" && (
                          <button
                            style={{
                              borderRadius: "39px",
                              border: "1px solid",
                              padding: "2px 12px",
                              gap: "4px",
                              fontFamily: "Inter",
                              fontWeight: "500",
                              fontSize: "14px",
                              lineHeight: "20px",
                              color:
                                row[key] === "Pending"
                                  ? "#E49614"
                                  : row[key] === "Closed"
                                  ? "#E73F3F"
                                  : "#00B473",
                              backgroundColor:
                                row[key] === "Pending"
                                  ? "#E496141A"
                                  : row[key] === "Closed"
                                  ? "#E73F3F1A"
                                  : "#00B4731A",
                            }}
                          >
                            {row[key] || "N/A"}
                          </button>
                        )}
                        {key === "firstName" && (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              gap: "8px",
                            }}
                          >
                            <div
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                backgroundImage: `url(${
                                  row?.imageUrl ? (
                                    row?.imageUrl
                                  ) : (
                                    <AccountCircleIcon />
                                  )
                                })`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                              }}
                            ></div>

                            <span>{row?.firstName}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </TableCell>
                ))}
              {location.pathname.includes("/user-management") && (
                <TableCell>
                  <Button
                    onClick={() => handleView(row._id)}
                    variant="outlined"
                    sx={{
                      borderColor: "#F04141",
                      color: "#F04141",
                      borderRadius: "20px",
                      textTransform: "capitalize",
                      transition: "0.5s ease all",
                      "&:hover": {
                        backgroundColor: "rgba(231, 63, 63, 0.1);",
                      },
                    }}
                  >
                    View
                  </Button>
                  <Button
                    onClick={() => handleEdit(row._id)}
                    variant="outlined"
                    sx={{
                      borderColor: "#F04141",
                      color: "#F04141",
                      borderRadius: "20px",
                      marginLeft: "6px",
                      textTransform: "capitalize",
                      transition: "0.5s ease all",
                      "&:hover": {
                        backgroundColor: "rgba(231, 63, 63, 0.1);",
                      },
                    }}
                  >
                    Edit
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MuiTable;
