import React from "react";
import "../maincss/chartcompo.css";
import "../maincss/dashboard.css";
import CustomSelect from "./Select";
import NewSelectBox from "./NewSelectBox";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { get_incident_data } from "../api/api_calls/apiCalls";
import { useDispatch } from "react-redux";
import storeLineChartData from "../redux/features/counter/CounterSlice";
import { useLocation } from "react-router-dom";

const DashboardSecondLayerChart = ({
  title,
  children,
  number,
  setFilters,
  filters,
}) => {
  const { year } = useParams();

  console.log(title);

  const navigate = useNavigate();
  // navigate(`/dashboard?year=${filters.date}`);
  // navigate(`/dashboard?date=${filters?.date}`);

  const handleSelectChange = (key, value) => {
    if (key === "users") {
      setFilters((prev) => ({ ...prev, users: value }));
      navigate(`/dashboard?users=${value}`, { replace: true });
    } else if (key === "incident_reporting") {
      setFilters((prev) => ({ ...prev, incident_reporting: value }));
      navigate(`/dashboard?incident_reporting=${value}`, { replace: true });
    }
  };
  const data = [
    { value: "2021", name: "2021" },
    { value: "2022", name: "2022" },
    { value: "2023", name: "2023" },
    { value: "2024", name: "2024" },
    { value: "2025", name: "2025" },
  ];

  // useEffect(() => {
  //   if (year && year !== filters.Userdate) {
  //     setFilters((prevFilters) => ({
  //       ...prevFilters,
  //       Userdate: year,
  //     }));
  //   }
  // }, [year]);

  const location = useLocation();
  const search = new URLSearchParams(location.search);
  // const userYear = search.get("userDate");
  // const incidentYear = search.get("incidentDate");

  // useEffect(() => {
  //   if (filters.date) {
  //     fetchdata(filters.date);
  //   }
  // }, [filters.date]);

  return (
    <div className="full-line-chart">
      <div className="full-header-section">
        <span className="chart-title">{title}</span>
        <NewSelectBox
          data={data}
          title={title}
          keyProp="Year"
          selectedValue={filters}
          onSelect={(value) =>
            handleSelectChange(
              title === "Incident Reporting" ? "incident_reporting" : "users",
              value
            )
          }
        />
      </div>
      <span className="number">{number}</span>
      {children}
    </div>
  );
};

export default DashboardSecondLayerChart;
