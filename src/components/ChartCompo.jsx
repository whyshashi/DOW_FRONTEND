import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../maincss/chartcompo.css";
import NewSelectBox from "./NewSelectBox";
import { useSearchParams } from "react-router-dom";
const ChartCompo = ({ unique, title, children, number }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialYear = searchParams.get(unique) || "2025"; // Get correct param from URL
  const [filters, setFilters] = useState({
    inciRepoDate: "2025",
    docDate: "2025",
    safetyDate: "2025",
  });
  // const [filters, setFilters] = useState({
  //   date: "2025",
  // });

  // const handleSelectChange = (key, value) => {
  //   setFilters((prevFilters) => ({
  //     ...prevFilters,
  //     [key]: value,
  //   }));
  // };
  const handleSelectChange = (key, value, unique) => {
    console.log(unique, "unique value");
    const updatedParams = new URLSearchParams(location.search);
    updatedParams.set(unique, value); // Ensure the query param is updated
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
    navigate(`${location.pathname}?${updatedParams.toString()}`, {
      replace: true,
    });
  };

  const data = [
    { value: "2021", name: "2021" },
    { value: "2022", name: "2022" },
    { value: "2023", name: "2023" },
    { value: "2024", name: "2024" },
    { value: "2025", name: "2025" },
  ];

  return (
    <div className="chart-compo-full-chart">
      <div className="chart-top-layer">
        <div className="chart-top-left-section">
          <span className="chart-title">{title}</span>
        </div>
        <NewSelectBox
          data={data}
          title={title}
          keyProp="Year"
          selectedValue={filters[unique] || initialYear}
          onSelect={(value) => handleSelectChange(unique, value, unique)}
        />
      </div>
      {children}
      {number}
    </div>
  );
};

export default ChartCompo;
