import React from "react";
import IncidentCards from "../components/IncidentCards";
import useIncidentReportingData from "../Utils/IncidentReportingCardData.jsx";
import MuiTable from "../components/Table.jsx";
import "../maincss/incidentReporting.css";
import CustomSelect from "../components/Select.jsx";
import { useSelector } from "react-redux";
import { changeText } from "../Utils/Common.js";
import CircularIndeterminate from "../components/Loader.jsx";
import { Box } from "@mui/material";
import NewSelectBox from "../components/NewSelectBox.jsx";
import { useState } from "react";
import { filter } from "lodash";
import { useNavigate } from "react-router-dom";

const IncidentReporting = () => {
  const navigate = useNavigate();
  const data = useSelector((state) => state?.documents?.incidentReportingData);
  const IncidentReportingData = useIncidentReportingData();
  const loader = useSelector((state) => state.documents?.searchLoading);
  console.log({ loader });

  const [filters, setFilters] = useState({
    date: "Yearly",
    severity: "Severe",
    status: "In-Progress",
  });

  console.log(filters, "selected filters");

  const dateOptions = [
    { value: "Yearly", name: "Yearly" },
    { value: "Half-Yearly", name: "Half-Yearly" },
    { value: "Quarterly", name: "Quarterly" },
  ];

  const severityOptions = [
    { value: "Severe", name: "Severe" },
    { value: "High", name: "High" },
    { value: "Low", name: "Low" },
  ];

  const statusOptions = [
    { value: "In-Progress", name: "In-Progress" },
    { value: "Pending", name: "Pending" },
    { value: "Closed", name: "Closed" },
  ];

  // const filtersString = new URLSearchParams(filters).toString();

  const handleSelectChange = (key, value) => {
    console.log({ value });
    setFilters((prev) => {
      const updatedFilters = { ...prev, [key]: value };
      const filtersToString = new URLSearchParams(updatedFilters).toString();
      navigate(`/incident-reporting?${filtersToString}`);
      return updatedFilters;
    });
  };

  const headerData = data?.Incidents?.length
    ? [...new Set(data.Incidents.flatMap((item) => Object.keys(item)))]
    : [];

  const rowData = data?.Incidents || [];

  console.log({ IncidentReportingData });

  return loader ? (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: "90vh",
        justifyContent: "center",
      }}
    >
      <CircularIndeterminate />
    </Box>
  ) : (
    <div>
      <div className="incident-card">
        {IncidentReportingData?.map((item, index) => (
          <IncidentCards
            key={index}
            number={item.number}
            title={changeText(item.title)}
            color={item.color}
          />
        ))}
      </div>

      <div className="incident-reporting-table">
        <div
          style={{
            background: "white",
            padding: "16px",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
          }}
        >
          <div className="boxes">
            {/* //date */}
            <NewSelectBox
              data={dateOptions}
              keyProp="Date"
              selectedValue={filters.date}
              onSelect={(value) => handleSelectChange("date", value)}
            />
            <NewSelectBox
              data={severityOptions}
              keyProp="Severity"
              selectedValue={filters.severity}
              onSelect={(value) => handleSelectChange("severity", value)}
            />
            <NewSelectBox
              data={statusOptions}
              keyProp="Status"
              selectedValue={filters.status}
              onSelect={(value) => handleSelectChange("status", value)}
            />
          </div>
        </div>
        {Array.isArray(rowData) && rowData.length > 0 ? (
          <MuiTable
            pageName={"incident"}
            headerData={headerData}
            incidata={rowData}
          />
        ) : (
          <div style={{ paddingTop: "20px" }}>No Data Found</div>
        )}
      </div>
    </div>
  );
};

export default IncidentReporting;
